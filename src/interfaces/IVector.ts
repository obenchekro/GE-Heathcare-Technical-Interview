export interface IVector {
    x: number;
    y: number;
    computeAddition(vector: IVector): IVector;
    computeSubstraction(vector: IVector): IVector;
    computeMultiplication(scalar: number): IVector;
    computeDotProduct(vector: IVector): number;
}
