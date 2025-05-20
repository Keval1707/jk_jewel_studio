import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated,logout, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log("Error loading user metadata", e);
      }
    };

    if (isAuthenticated && user) {
      getUserMetadata();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="not-logged-in">Please log in to view your profile.</div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.picture} alt={user.name} className="profile-picture" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profile-metadata">
        <h3>User Metadata</h3>
        {userMetadata ? (
          <ul>
            {Object.entries(userMetadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No metadata available.</p>
        )}
      </div>

      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
        className="login-button"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
