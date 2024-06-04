import { IVector } from './IVector';

export interface IMatrix {
    elements: number[][];
    computeMultiply(matrix: IMatrix): IMatrix;
    transformPoint(point: IVector): IVector;
    computeDeterminant(): number;
    isInvertible(): boolean;
    computeCofactorMatrix(): IMatrix;
    computeInverse(): IMatrix | null;
}
