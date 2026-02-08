import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
	standalone: true,
	template: `
		<section>
			<h2>Stack</h2>
			<p>Next: add Active task + paused stack list.</p>
		</section>
	`
})
class StackPage {}

@Component({
	standalone: true,
	template: `
		<section>
			<h2>Archive</h2>
			<p>Next: show completed tasks here.</p>
		</section>
	`
})
class ArchivePage {}

export const routes: Routes = [
	{ path: '', component: StackPage, pathMatch: 'full' },
	{ path: 'archive', component: ArchivePage },
	{ path: '**', redirectTo: '' },
];
