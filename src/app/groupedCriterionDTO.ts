import { Critere } from "./critere"

export interface groupedCriterionDTO {
    normeId: string
    normename: string
    criterionDTOs: Critere[]
}