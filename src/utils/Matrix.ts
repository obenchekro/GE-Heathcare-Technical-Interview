import { Vector2D } from './Vector';
import { IMatrix } from '../interfaces/IMatrix';

export class Matrix3x3 implements IMatrix {
    constructor(public elements: number[][]) {}

    static identity(): IMatrix {
        return new Matrix3x3([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
    }

    static translationTransformation(tx: number, ty: number): IMatrix {
        return new Matrix3x3([
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]
        ]);
    }

    static rotationTransformation(angle: number): IMatrix {
        const cos: number = Math.cos(angle);
        const sin: number = Math.sin(angle);
        return new Matrix3x3([
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
        ]);
    }

    static scalingTransformation(sx: number, sy: number): IMatrix {
        return new Matrix3x3([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ]);
    }

    computeMultiply(matrix: IMatrix): IMatrix {
        const result: IMatrix = Matrix3x3.identity();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result.elements[i][j] = new Vector2D(this.elements[i][0], this.elements[i][1])
                    .computeDotProduct(new Vector2D(matrix.elements[0][j], matrix.elements[1][j]))
                    + this.elements[i][2] * matrix.elements[2][j];
            }
        }
        return result;
    }

    transformPoint(point: Vector2D): Vector2D {
        const x: number = point.computeDotProduct(new Vector2D(this.elements[0][0], this.elements[0][1])) + this.elements[0][2];
        const y: number = point.computeDotProduct(new Vector2D(this.elements[1][0], this.elements[1][1])) + this.elements[1][2];
        return new Vector2D(x, y);
    }

    computeDeterminant(): number {
        const m: number[][] = this.elements;
        return (
            m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
            m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
            m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
        );
    }

    isInvertible(): boolean {
        return this.computeDeterminant() !== 0;
    }

    computeCofactorMatrix(): IMatrix {
        const m: number[][] = this.elements;
        const cofactors: number[][] = [
            [
                m[1][1] * m[2][2] - m[1][2] * m[2][1],
                m[1][2] * m[2][0] - m[1][0] * m[2][2],
                m[1][0] * m[2][1] - m[1][1] * m[2][0]
            ],
            [
                m[0][2] * m[2][1] - m[0][1] * m[2][2],
                m[0][0] * m[2][2] - m[0][2] * m[2][0],
                m[0][1] * m[2][0] - m[0][0] * m[2][1]
            ],
            [
                m[0][1] * m[1][2] - m[0][2] * m[1][1],
                m[0][2] * m[1][0] - m[0][0] * m[1][2],
                m[0][0] * m[1][1] - m[0][1] * m[1][0]
            ]
        ];
        return new Matrix3x3(cofactors);
    }

    computeInverse(): IMatrix | null {
        if (!this.isInvertible()) {
            console.warn('Matrix is not invertible.');
            return null;
        }

        const det: number = this.computeDeterminant();
        const invDet: number = 1 / det ;
        const cofactors: number[][] = this.computeCofactorMatrix().elements;

        const inverse: IMatrix = new Matrix3x3([
            [cofactors[0][0] * invDet, cofactors[1][0] * invDet, cofactors[2][0] * invDet],
            [cofactors[0][1] * invDet, cofactors[1][1] * invDet, cofactors[2][1] * invDet],
            [cofactors[0][2] * invDet, cofactors[1][2] * invDet, cofactors[2][2] * invDet]
        ]);

        return inverse;
    }
}
