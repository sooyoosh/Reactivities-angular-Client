export interface IActivities{
  id: string
  title: string
  date: Date
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
  //new 
  attendees:IProfile[]
  isGoing:boolean
  isHost:boolean
  hostId:string
  hostDisplayName:string 
}


export interface IProfile{
    id:string,
    displayName:string,
    bio?:string,
    imageUrl?:string
}