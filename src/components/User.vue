<template>
  <Card title="User">
    <pre>{{
      JSON.stringify(
        {
          data,
          dataUpdatedAt,
          isLoading,
          isPending,
          isError,
        },
        null,
        2
      )
    }}</pre>
  </Card>
</template>
<script setup lang="ts">
import Card from "./Card.vue";
import { useQuery } from "@tanstack/vue-query";
import { getUser } from "../../api/user";

const { data, dataUpdatedAt, isLoading, isPending, isError } = useQuery({
  queryKey: ["user"],
  queryFn: getUser,
});
</script>
