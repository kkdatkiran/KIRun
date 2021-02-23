package io.kirun.engine.repository;

public class HybridRepository<T> implements Repository<T> {

	private Repository<T>[] repos;

	@SafeVarargs
	public HybridRepository(Repository<T>... repositories) {

		this.repos = repositories;
	}

	@Override
	public T findSchema(String name) {

		for (Repository<T> repo : this.repos) {
			T s = repo.findSchema(name);
			if (s != null)
				return s;
		}

		return null;
	}

}
