<template>
  <Card title="User Form">
    <form @submit="onSubmit">
      <input type="number" name="id" placeholder="id" />
      <input type="text" name="name" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  </Card>
</template>
<script setup lang="ts">
import Card from "./Card.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateUser } from "../../api/user";

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationKey: ["user"],
  mutationFn: updateUser,
  onMutate: async (updatedUser) => {
    await queryClient.cancelQueries({
      queryKey: ["user"],
    });
    const previousUser = queryClient.getQueryData(["user"]);
    queryClient.setQueryData(["user"], {
      ...updatedUser,
      optimistic: true,
    });
    return { previousUser };
  },
  onError: (_error, _variables, context) => {
    queryClient.setQueryData(["user"], context?.previousUser);
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
  },
});

function onSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  // @ts-expect-error - Let's use form state in lesson 2
  mutate(values);
}
</script>
