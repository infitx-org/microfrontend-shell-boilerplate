export interface LoggedUser {
  id: string;
  active: boolean;
  expires_at: string;
  authenticated_at: string;
  issued_at: string;
  identity: {
    id: string;
    schema_id: string;
    schema_url: string;
    traits: {
      name: string;
      role: string;
      email: string;
    };
    recovery_addresses: [
      {
        id: string;
        value: string;
        via: string;
      },
    ];
  };
}

export interface AuthState {
  isAuthPending: boolean;
  isLoggedIn: boolean;
  authError: null | string;
  user?: LoggedUser;
}

export interface AuthAppProps {
  onLogoutClick: () => void;
  userEmail?: string;
}
