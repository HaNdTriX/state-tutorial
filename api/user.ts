let user = {
  id: 1,
  name: "John Doe",
};

type User = typeof user;

export async function getUser() {
  await sleep(1_000);
  return user;
}

export async function updateUser(updatedUser: User) {
  user = updatedUser;
  await sleep(1_000);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
