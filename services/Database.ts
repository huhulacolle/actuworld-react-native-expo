import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';
import INews from '../interfaces/INews';
import nSQL from '../interfaces/nSQL';

function openDatabase(): WebSQLDatabase {
	return SQLite.openDatabase("actuworld.db")
}

export function createDB(): void {
	const db = openDatabase();
	db.transaction(q => {
		q.executeSql(`
		CREATE TABLE IF NOT EXISTS favoris (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			url varchar(50),
			urlToImage varchar(50),
			source varchar(50),
			title varchar(50),
			description varchar(999),
			content varchar(999)
		)
		`);
	})
}

export function ExecuteQuery(sql: string, params = []): Promise<any> {
	return new Promise((resolve, reject) => {
		const db = openDatabase();
		db.transaction((trans) => {
			trans.executeSql(sql, params, (trans, results) => {
					resolve(results);
			},
			(error): any => {
				reject(error);
			});
	});
	})
}

export async function favorisVerification(url: string): Promise<boolean> {
	const rows = await ExecuteQuery(`SELECT url FROM favoris where url = '${url}'`, [])
	if (rows.rows.length > 0) {
		return true;
	}
	return false;
}

export function setFavoris(n: INews): void {
	const db = openDatabase();
	db.transaction(q => {
		q.executeSql(`INSERT INTO favoris (url, urlToImage, source, title, description, content) 
									VALUES (?, ?, ?, ?, ?, ?)`, [n.url, n.urlToImage as string | number | null, n.source.name, n.title, n.description, n.content]
		);
	})
}

export function deleteFavoris(url: string): void {
	const db = openDatabase();
	db.transaction(q => {
		q.executeSql(`DELETE FROM favoris WHERE url = ?`, [url]
		);
	})
}

export function deleteAllFavoris(): void {
	const db = openDatabase();
	db.transaction(q => {
		q.executeSql(`DELETE FROM favoris`, []
		);
	})
}

