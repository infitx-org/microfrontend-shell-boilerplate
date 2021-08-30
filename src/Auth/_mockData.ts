const whoami = {
  id: 'd2e2f15f-aa79-42fd-a4c2-e35c33fbcad4',
  active: true,
  expires_at: '2021-06-04T09:20:28.165863Z',
  authenticated_at: '2021-06-03T09:20:28.165863Z',
  issued_at: '2021-06-03T09:20:28.165885Z',
  identity: {
    id: 'dab6bf5c-572d-4290-9498-0dde2878f5a9',
    schema_id: 'default',
    schema_url: '/kratos/schemas/default',
    traits: {
      name: 'gavin',
      role: 'SA',
      email: 'demo@example.org',
    },
    recovery_addresses: [
      {
        id: '2500b67d-b814-4d6b-9507-e21ede118753',
        value: 'demo@example.org',
        via: 'email',
      },
    ],
  },
};

export default {
  read: {
    delay: 2000,
    call: () => ({
      status: 200,
      data: whoami,
    }),
  },
};
