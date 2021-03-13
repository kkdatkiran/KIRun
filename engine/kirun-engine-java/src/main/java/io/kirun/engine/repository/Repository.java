package io.kirun.engine.repository;

public interface Repository<T> {

	public T find(String name);
}
