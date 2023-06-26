import { Supervisor } from "../../user/models/supervisor.model";

export interface SupervisorAvailability {
    supervisor: Supervisor,
    assigned: number,
    max: number,
}