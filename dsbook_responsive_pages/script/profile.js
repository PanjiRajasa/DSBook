import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { auth } from "../firebase-config.js";

//display the user's data
document.addEventListener("DOMContentLoaded", () => {

  //check status login
  const storage = getStorage();
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("User not authenticated. Please log in.");
    window.location = "../../../dsbook-pages/dsbook_responsive_pages/login.html";
    return;
  }

  async function fetchUserData() {
    try {
      const response = await fetch(`http://localhost:3000/users/${uid}`);
      const userData = await response.json();
      console.log(userData)

      if (!response.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }

      // Isi form dengan data dari backend
      document.getElementById("fnInput").value = userData.firstname || "";
      document.getElementById("lnInput").value = userData.lastname || "";
      document.getElementById("emlInput").value = userData.email || "";
      document.getElementById("cntInput").value = userData.contactNumber || "";
      // Don't set password from backend - use placeholder
      document.getElementById("pwInput").value = ""; // Keep it empty
      document.getElementById("pwInput").placeholder = "Leave empty to keep current password";

      if (userData.image) {
        document.getElementById("profile-picture").src = userData.image;
        document.getElementById("imageInput").value = userData.image;
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      alert("Could not load profile data.");
    }
  }

  fetchUserData();
});

document.addEventListener("DOMContentLoaded", () => {
  // Cek autentikasi user
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("User not authenticated. Please log in.");
    window.location = "../../../dsbook-pages/dsbook_responsive_pages/login.html";
    return;
  }

  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ambil nilai dari form
    const firstname = document.getElementById("fnInput").value.trim();
    const lastname = document.getElementById("lnInput").value.trim();
    const email = document.getElementById("emlInput").value.trim();
    const contactNumber = document.getElementById("cntInput").value.trim();
    const password = document.getElementById("pwInput").value.trim();
    const imageURL = document.getElementById("imageInput").value.trim();

    // Basic validation
    if (!firstname || !lastname || !email) {
      alert("First name, last name, and email are required.");
      return;
    }

    // Buat username dari firstname + lastname
    const username = `${firstname}.${lastname}`.toLowerCase();

    // Data yang akan dikirim ke backend
    const updatedData = {
      username,
      firstname,
      lastname,
      email,
    };

    // Only add optional fields if they have values
    if (contactNumber) updatedData.contactNumber = contactNumber;
    if (imageURL) updatedData.image = imageURL;
    if (password) updatedData.password = password; // Only include if user entered a new password

    console.log("Sending data:", updatedData); // Debug log

    try {
      const response = await fetch(`http://localhost:3000/users/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      console.log("Response:", result); // Debug log

      if (response.ok) {
        alert("Profile updated successfully!");
        window.location.href = "../../../dsbook-pages/dsbook_responsive_pages/profile.html";
      } else {
        console.error("Update failed:", result);
        alert("Failed to update profile: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("An error occurred while updating your profile.");
    }
  });
});