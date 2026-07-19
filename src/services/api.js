const API_BASE_URL = 'https://next-p7z6.onrender.com';

const getToken = () => localStorage.getItem('token');

const getHeaders = (includeAuth = true) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	if (includeAuth) {
		const token = getToken();
		if (token) {
			headers['Authorization'] = token;
		}
	}
	return headers;
};

export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'accept': '*/*'
       },
       body: JSON.stringify({
           name: "",
           email: email,
           password: password
       }),
    });
    if (!response.ok) {
       throw new Error('Login failed');
    }
    return response.json();
};


export const register = async (name, email, password) => {
	const response = await fetch(`${API_BASE_URL}/register`, {
		method: 'POST',
		headers: getHeaders(false),
		body: JSON.stringify({ name, email, password }),
	});
	if (!response.ok) {
		throw new Error('Registration failed');
	}
	return response.json();
};

export const logout = async () => {
	const response = await fetch(`${API_BASE_URL}/logout`, {
		method: 'DELETE',
		headers: getHeaders(),
	});
	localStorage.removeItem('token');
	if (!response.ok) {
		throw new Error('Logout failed');
	}
	return response.json();
};

// Courses endpoints
export const getCourses = async () => {
	const response = await fetch(`${API_BASE_URL}/courses/all`, {
		method: 'GET',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch courses');
	}
	return response.json();
};

export const getCourseById = async (id) => {
	const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
		method: 'GET',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch course');
	}
	return response.json();
};

export const createCourse = async (course) => {
	const response = await fetch(`${API_BASE_URL}/courses/add`, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(course),
	});
	if (!response.ok) {
		throw new Error('Failed to create course');
	}
	return response.json();
};

export const updateCourse = async (id, course) => {
	const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
		method: 'PUT',
		headers: getHeaders(),
		body: JSON.stringify(course),
	});
	if (!response.ok) {
		throw new Error('Failed to update course');
	}
	return response.json();
};

export const deleteCourse = async (id) => {
	const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
		method: 'DELETE',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to delete course');
	}
	return response.json();
};

export const getAuthors = async () => {
	const response = await fetch(`${API_BASE_URL}/authors/all`, {
		method: 'GET',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch authors');
	}
	return response.json();
};

export const getAuthorById = async (id) => {
	const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
		method: 'GET',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch author');
	}
	return response.json();
};

export const createAuthor = async (author) => {
	const response = await fetch(`${API_BASE_URL}/authors/add`, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(author),
	});
	if (!response.ok) {
		throw new Error('Failed to create author');
	}
	return response.json();
};

export const getCurrentUser = async () => {
	const response = await fetch(`${API_BASE_URL}/users/me`, {
		method: 'GET',
		headers: getHeaders(),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch user');
	}
	return response.json();
};
