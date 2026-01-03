import { useState } from "react";

function Rejestracja() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const resposne = await fetch('http://193.111.249.75:8001/users/')
  }
}
};