export default interface ISession {
  id: number;
  duration: number;
  date: string;
  comment?: string;
  activityId: number;
  activity_name: string;
  activity_met: number;
}
