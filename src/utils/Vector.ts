export class Vector2D {
    constructor(public x: number, public y: number) {}

    computeAddition(vector: Vector2D): Vector2D {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    computeSubstraction(vector: Vector2D): Vector2D {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    computeMultiplication(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    computeDotProduct(vector: Vector2D): number {
        return this.x * vector.x + this.y * vector.y;
    }
}