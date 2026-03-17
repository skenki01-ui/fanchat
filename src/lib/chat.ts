import { supabase } from "./supabase"

export async function saveMessage(userId, characterId, role, content){

  const { error } = await supabase
  .from("messages")
  .insert([
    {
      user_id: userId,
      character_id: characterId,
      role: role,
      content: content
    }
  ])

  if(error){
    console.error(error)
  }

}