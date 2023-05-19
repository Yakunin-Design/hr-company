type worker_data = {
    full_name: string
}

export default async function get_data(): Promise<worker_data[]> { 
	const res = await fetch('https://api.hr-company.org/find-workers');
 
  	if (!res.ok) {
  		throw new Error('Failed to fetch data');
  	}
 
  	return res.json();
}