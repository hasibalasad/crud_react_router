import { redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";

export async function contactAction() {
  const contact = await createContact();
  return { contact };
}

export async function editContactAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData.entries());
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export async function destroyContactAction({ params }) {
  try {
    await deleteContact(params.contactId);
  } catch (error) {
    throw new Error("Failed to delete", error);
  }
  return redirect("/");
}

export async function updateFavoriteContactAction({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}
