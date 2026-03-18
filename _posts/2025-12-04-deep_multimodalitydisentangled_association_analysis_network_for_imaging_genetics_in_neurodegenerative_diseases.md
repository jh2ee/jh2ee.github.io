---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643NB37BI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQC1%2FhXPI2MosWkCjSFQd4lgbOd50nKuKX%2BzpXKrayaVTwIhANvXp%2BgDbByUY8NuV%2BSllxKMOsF8%2BQpMx6DyrJ57y65zKv8DCAoQABoMNjM3NDIzMTgzODA1IgyKb8mpyOkr5RSWiHEq3ANo4VcB2oFPl3Gnv25uDc9kL1jRMyOQKelh8CucandBCmnKg4hP8M9nxqdxY5h76aK5IU2fdmIjDCczyAF99NajCFTBczwkV8ivEcHK4Kivk108RruCInL7Nw8VzULT32NhYjIbTONi8A%2BtAUkacwrqTDIt4M3L1kv85tLQYe0XteKtQE7mc1m85ljn9YYaJytRWH8ktM00lVBnB3ccPFbS5al08pvOPKh%2BwzKNhUXtgtaoGkfNzrgsq0G7vYyBhq6SwvJli%2FtuAoWRLXDzN%2FNScb%2BWa81MD4rcM6d3V%2BelSeRxKGGP5nlXjHadb%2FslVXYb6dd14akhcgn4HyAXCK9X%2BWG0Mse5pW5zU%2FD%2FuQjWIh21iMVwdO%2FeJbQsuYBnVfV0Lu2LHdMUkOB94bOnXSjzmn6th2c1oVrO1OnnbMPmA6ip1H44dU2u7ZDEJh8x51X%2BF2ls12YZuB5O%2FCnWa8xK1r7pOmjpK7oImA8ElhMuLh%2FFk95rVbv46h0ydI6nr04qgbLM2WXg5eqw%2Fp5zeb6oECuLGd%2BJJ6RHwAC1xbzo8rDeJBaxuvwZguRmtykX3fRei7QkfXdpa1NXV8Lghq%2FyjOWyKX1zjb5en7sS%2Bud%2FeHz6vcfQeS0Xxuxj2zCUpevNBjqkAQIbHdRXW0IW%2BTdVs0ZUIayBqrD9E9fFDEWKi3PbnsOfsTZx8tDU7AjOMrJ%2FWYuqsC9wDdO7mXW43mnhL1LLmZZ%2Fzs0qRvx2%2B0Z7QsCfRkhhUfuT3KzadPWpOnlAFO2KmYz5IYYuSyO5A4JYDqQmE6NhDULK7hAfU9kzEsF3%2BDVyxbdK97B6ruUVbW2NximQkEJeoE0NqLlETMetsx%2BpUqVsHp7o&X-Amz-Signature=4c499e9cab6f53be34688369bd7da68c8e58d8f297d9366889a61edfa87155f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643NB37BI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQC1%2FhXPI2MosWkCjSFQd4lgbOd50nKuKX%2BzpXKrayaVTwIhANvXp%2BgDbByUY8NuV%2BSllxKMOsF8%2BQpMx6DyrJ57y65zKv8DCAoQABoMNjM3NDIzMTgzODA1IgyKb8mpyOkr5RSWiHEq3ANo4VcB2oFPl3Gnv25uDc9kL1jRMyOQKelh8CucandBCmnKg4hP8M9nxqdxY5h76aK5IU2fdmIjDCczyAF99NajCFTBczwkV8ivEcHK4Kivk108RruCInL7Nw8VzULT32NhYjIbTONi8A%2BtAUkacwrqTDIt4M3L1kv85tLQYe0XteKtQE7mc1m85ljn9YYaJytRWH8ktM00lVBnB3ccPFbS5al08pvOPKh%2BwzKNhUXtgtaoGkfNzrgsq0G7vYyBhq6SwvJli%2FtuAoWRLXDzN%2FNScb%2BWa81MD4rcM6d3V%2BelSeRxKGGP5nlXjHadb%2FslVXYb6dd14akhcgn4HyAXCK9X%2BWG0Mse5pW5zU%2FD%2FuQjWIh21iMVwdO%2FeJbQsuYBnVfV0Lu2LHdMUkOB94bOnXSjzmn6th2c1oVrO1OnnbMPmA6ip1H44dU2u7ZDEJh8x51X%2BF2ls12YZuB5O%2FCnWa8xK1r7pOmjpK7oImA8ElhMuLh%2FFk95rVbv46h0ydI6nr04qgbLM2WXg5eqw%2Fp5zeb6oECuLGd%2BJJ6RHwAC1xbzo8rDeJBaxuvwZguRmtykX3fRei7QkfXdpa1NXV8Lghq%2FyjOWyKX1zjb5en7sS%2Bud%2FeHz6vcfQeS0Xxuxj2zCUpevNBjqkAQIbHdRXW0IW%2BTdVs0ZUIayBqrD9E9fFDEWKi3PbnsOfsTZx8tDU7AjOMrJ%2FWYuqsC9wDdO7mXW43mnhL1LLmZZ%2Fzs0qRvx2%2B0Z7QsCfRkhhUfuT3KzadPWpOnlAFO2KmYz5IYYuSyO5A4JYDqQmE6NhDULK7hAfU9kzEsF3%2BDVyxbdK97B6ruUVbW2NximQkEJeoE0NqLlETMetsx%2BpUqVsHp7o&X-Amz-Signature=4c499e9cab6f53be34688369bd7da68c8e58d8f297d9366889a61edfa87155f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664O3QRHVL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQD%2FDpEUM87C5Z9i2jo6PbyChIaSqsYPVPRpP18OEFZJaQIhAN3WAq5Hp7EDv8f4jIMNmDWZn8DO%2F8NiwJV%2Fxj7rPzfBKv8DCAoQABoMNjM3NDIzMTgzODA1Igw%2B6TDTiChZx76hdgMq3ANSz7o1wSixR5RpGLRNHJBuoJhLXNakxKSqyWkHPRAp395t8%2Bt%2Bis2QoYGD8xeP2XcfAAmGRDRIGWYGApZ6Ec%2Bx%2FhESMe0GKi6qGJzVaeSs621Hq0k3n0wO0ampDgJZZ0KqgJpi1IfcyrmRCvvfnPmD5hGQ8QYZG7M93oFhAYze5iisQjgbGFPuKqRS4ZGWtXYipEbJuJ2aQ7UFWVwMODgYEyulGZBYqSx5mLCplbZw%2BXT9mN0lWnNFPydJzUT%2B6wP4HlSUV4uMEO65Kc7530uWLiKF5AOJn%2Buccbq8UfdFEGTRvxCQWXfxWVEYm1SBkEoeRTg7T8Y22z6d%2F%2FOX5WEbc2cvlG4RHSHAs86VFT390tcbwEvEceOkSLJlfHQTI7n7nuH4hZzYZADPmur1THbihv7mk8AwYtsJc3V%2BIwZI5IWMqoosdj88g7K7LnuTyKdFMryDVFugTuLrQst75ihioasPaqAXkQTUqCQcpq9wKJZHFLJ8iQjgSeARI95ZqMESgrgEEvlA3G7HDTQ4NrrX4mCl7M7UebUghn3OMN2rxG8r4ysKk4pLxgzpyPv2meMdr24ZkaFzvjkAt11OXgsYx1HKpMSLxpNKA8UkGoa1mN5KhDu2F8mQHgvzEzC%2FpevNBjqkAUEiSyP7F4MKDasptzDLBHkJ9iqN1W2hEXKBm7eILVvY%2BiPFpaB%2Fnhe7ociP%2BhiO507j%2FzQ59qCIV%2FcKu69QMiZ3as6xW9d33jHG0Zg%2FqDRgtCmFCYuntGE%2FDFwNpZVUzZbqrSTt%2BI5pAVDJQA6ITpf5nnh2grv1eJRC0UiAM1pqQCGbRHqMFRtYZsUya87UX70corKCA8WxAkYcpntlBUEaGHCF&X-Amz-Signature=0270b783a7affd9a36ae567faf7a1710125366e320dc479dd2dd99ada9d6f6e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUG2W362%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICbV%2FJYSgkoXl977mI6JvYV0%2BcroUOiG%2FwqC8BvIx2PBAiBsuN9qtQIRjaulmfbV7J0njKpA744NGJ%2F87sFHjwrkiSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMJsnw5XRnvP3XkQPfKtwDzc2f8o6EEEWrlpiW5Pm9FmwgutWneJF%2Bv9uQCcaLx4b6shPRlC%2FOH%2FTa3aruNZ2rgN9CTdCWgkxM9jZl1j8KQX7GXYdNH2lyqU%2F8T1%2FuRHv%2FFukNrNCnjmll%2FIYaNjBZ1YeglyGQUvM6ZaNi7XOzeW2Znds39rfZKPfk%2BOHHfY4H5IEXgYmm5h5kYcQ3g8TqUlZhB1OWkYqHMpAZxswF%2BbjoTdLy%2FY3TZwVK42R2nGCwt2rndX9oxkxtwhbQGsW%2B6nq3lKEDlY2cnWmWNYrjh7eNDfxjGTXfL8t8pJyNaEUR8kWeS9QU%2BSLI9yW0jFcYSGdaTLoFKUdyIjM9E8abBHGTID6JRGIX0hgLYgPUf4pMCY3GgtI8AuYTvYFI%2B%2BmpCeXrAeeP6%2FdGXUACDYrPKFRwKS%2BZlekqAQRHFyCxk3XXmESaZkOGn3qNgAourDygd7Y6dPcyDXe3MTlZnfZVoXGBHmjcEeBDeV%2BWgfLBfIfsmJdpcpv7s%2Fm9XGyujzvcDbeZyVpIxn%2FqRvDTRJl92Nnq0SU0ECvUQ%2BhEfgSWagXi3TtoHCoOO%2F8UWyqh7dgkhae%2FKymwOvjrZaIxNVduki9rw8QYDrlz4MUqEL8w2LZSp8KGR%2BIHxVKhywEw2KXrzQY6pgGgRfn2pVs7GE%2FEsKbpIB9j%2FhOwnCl2sAylaTnHeT3OCuK3q8WxahmlMA941TfYkF36Z9wI6S%2Bi0bCNAqBD%2BkwpbnpqTxlzyS%2BlbloGCFTRI9wvApI1ztePJrqAyh2bz4SKza%2Fd2MpKXVdu4Aims%2BIc6NAi5N5XX5GSEsaocdGZsJQcr%2BHfKy6x4Xivn8Pso6u8fMVIqTWPoQzCPhWx82Ua3mmQPEYg&X-Amz-Signature=b6bff79b0a58bbfebe2c571dd725039fc7af3e7ea080882c3aae24ceca44a051&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUG2W362%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICbV%2FJYSgkoXl977mI6JvYV0%2BcroUOiG%2FwqC8BvIx2PBAiBsuN9qtQIRjaulmfbV7J0njKpA744NGJ%2F87sFHjwrkiSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMJsnw5XRnvP3XkQPfKtwDzc2f8o6EEEWrlpiW5Pm9FmwgutWneJF%2Bv9uQCcaLx4b6shPRlC%2FOH%2FTa3aruNZ2rgN9CTdCWgkxM9jZl1j8KQX7GXYdNH2lyqU%2F8T1%2FuRHv%2FFukNrNCnjmll%2FIYaNjBZ1YeglyGQUvM6ZaNi7XOzeW2Znds39rfZKPfk%2BOHHfY4H5IEXgYmm5h5kYcQ3g8TqUlZhB1OWkYqHMpAZxswF%2BbjoTdLy%2FY3TZwVK42R2nGCwt2rndX9oxkxtwhbQGsW%2B6nq3lKEDlY2cnWmWNYrjh7eNDfxjGTXfL8t8pJyNaEUR8kWeS9QU%2BSLI9yW0jFcYSGdaTLoFKUdyIjM9E8abBHGTID6JRGIX0hgLYgPUf4pMCY3GgtI8AuYTvYFI%2B%2BmpCeXrAeeP6%2FdGXUACDYrPKFRwKS%2BZlekqAQRHFyCxk3XXmESaZkOGn3qNgAourDygd7Y6dPcyDXe3MTlZnfZVoXGBHmjcEeBDeV%2BWgfLBfIfsmJdpcpv7s%2Fm9XGyujzvcDbeZyVpIxn%2FqRvDTRJl92Nnq0SU0ECvUQ%2BhEfgSWagXi3TtoHCoOO%2F8UWyqh7dgkhae%2FKymwOvjrZaIxNVduki9rw8QYDrlz4MUqEL8w2LZSp8KGR%2BIHxVKhywEw2KXrzQY6pgGgRfn2pVs7GE%2FEsKbpIB9j%2FhOwnCl2sAylaTnHeT3OCuK3q8WxahmlMA941TfYkF36Z9wI6S%2Bi0bCNAqBD%2BkwpbnpqTxlzyS%2BlbloGCFTRI9wvApI1ztePJrqAyh2bz4SKza%2Fd2MpKXVdu4Aims%2BIc6NAi5N5XX5GSEsaocdGZsJQcr%2BHfKy6x4Xivn8Pso6u8fMVIqTWPoQzCPhWx82Ua3mmQPEYg&X-Amz-Signature=6d5c2ceddbc318113f6543c8c455c11f5b1f2c496cb7bb6256771f1da954fc1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUILGV7D%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDo2k4PeUrda0mvr4mLyb08w1SaUHqzTPRtZ0mYj%2FzcxgIgJ6DfxVQ4EagSj5UCrjcIeyOmfGezcP9UQ8A6HmZG4HIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDHSI9spTlEUYg7PN0SrcAxWlePwXe2Q2rXy6659SCmzxwqPpUtTmYklTOSZ6%2BzzpOrR6I6bfJBEx9OQtYrc3583cKPHnvQOgP6WP9F2JaTYnMaBLAAXk6mkp0bsGrVkbBn0h%2FrHsXn2xobXJs%2FwS2vyPVzS97WXyEkWT4nkYt66D02KZWB0F%2FgkWcnjxLxyFHiW4QiyevZnXGdaRrUnC%2Bh%2FEjh%2BD1PVutKubfOxrycQhfAFNxYCVeRN45bKnm%2F2poLtNwyMKz6zzIPI17g7eBsZcIK6mQrBHZosTKNVyhWt5%2BoVKM4kDvgqZ%2F03VfDTqdmX1MgPBM3oGlgeUcOiJEVT2eBWN1rVvs%2F9M0RUppdhD9e7lsfveiFgeWWyVifBnddQjuSPf7AMwiP%2F%2FvK8kN8uHMk5andfgb3KKamuGYOqIAmqjQ%2BQzr%2BB6UaP1pg9MSt0cBvXyKJsA4NovXGOfMrzSWPrdS3FIeh%2Bwws2QROIkS0KMi7wbFDXz%2Fr00cJSRpnKUknfa%2B%2Bmx3KHtQpHJ4vQsKuHUTICpVhFvjaTay5av1aTCkzeu%2FGgksmW%2B2YAHVilQdndXx%2BIVCbvxYTSeO6TdrBCBQVJ5xAkoTenXtvJHj1ykq8gxMxFuDnSSRK1yJxQsmA0fE4tQ7jlIMLml680GOqUBCr8YM4jWtfPHGKrRP4PX8cTptPF%2BhKP9WRkoXp8S4My77GzyNtzlAuqhcDUhE98NLvHYlWVZz%2Bt5P6Y7QNniuSEiDxzmB88Mj3QfWxWd6PkalxWO%2FSox%2FzZiUIAjE6k%2BLcaiugtcXGuKZBKbPv5COMAI2ENfMX2pmXA5EMnm%2FiVkIMf%2BCabpK4v2KyQ5F%2FKRbjCXwNdrZRXodVNmTi3Geb%2BqdiK2&X-Amz-Signature=ea7406495f85910366a7c8aad07fb1ec8db809981e80de8353c9d38a9539535c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGCRF5HA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIBhhk%2B3PS3bygj7EaJ4puj8QqMeDKXVEExLomC%2FEoYnYAiAhWq4yyJxN9PQwxCXQcsim2HNMnz%2BIFkTro6znGTxtQSr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIM2GocZa14b3Pm7qv1KtwDajCCurA%2B9VaRHyYnEFdoXwDFCuQstI2gsROLTf3sE5e%2FnjbEO91DeYJu2%2BuUtU6E37igQoTtjS4SgzvW%2FOnNU0kqzxuVtSwstUgeU299ZsBugw06UhUiwNGVyeK%2FT4%2Bm6yBADwyy2wyMCrpcecJQvBRQF39%2BKK8xBcFwCJRKF45opIu5GHRpxT%2BgV8j9L4nmfN9Ty%2BOWSgcmdzP7f9365DNtURV67RNkHhBDeYfdYdt8YRrZohVhDPV0eRuhMpdwH7hUJuMolGLOKt%2FnBQfGksZfiEmpypjVuBMsaa2VEfPLfd1V6TFaIFMzT97AlxTArKqlgS02j85r7AGzsSYL6qXY1BAc%2FDmabFEgIKFRYnZ2QbnLumVHOkt5PYCrWTxnxdleyjcUEo54rSA9XGs397vCy0pR9308CtOtACL43uxSA%2FlQoe1AmD9mMDnO3mJxIID3zKOvlOOXL99kcoHXijV2jSEoq1U7zCPyCK1bge%2FZauGK4RUjHn%2BsJ9QEX6i9CS3%2FFCLTq%2F0qwg%2FYh0OoJ9nxcRQnhIIrbqVxjLqcCN7MED8O56TMt5BTaObk9SDLQwJR6JxP96G%2BOgbdqqhIyLplehEWbvkSxLwIrZd5Tc%2FvaIdFU8ESJr7u%2F6ow%2BKXrzQY6pgEuK2Xue3HsJN7JbfTuKXu0O%2Fd%2BdT2qnRdeTSKGRu8LLmtK%2FnFlYFzGmWFNywrAXp%2FQ2nKmpS4DyQBjh79BAqxxFSCaNSorQnim9wfG1hZ21xPdO5agvwP8QglXwzAT53PKDFcBc8ffw7svhZsS4AKN8od2bQ%2B86OZ9hmYIF%2FHT%2F74cAjOcucHCkJWoXMx0ktXoY6wNGmN7%2FNUUG7Vo9ngAhESL8nOx&X-Amz-Signature=023c2a41bd39104c75d1d8d00a99df8b1725f7b83d109e819761c23b65f054f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOE3VKRW%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCIAlPa3RULUFZs08ZvfqadrREcgzv9eWvJY9ZLrmXNawIgPbKf%2FsqdObnxsSDTQnU%2Fs1Ts%2FVcMgU3TGuikKaX%2F4Icq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDETjRI31hWeqrn04dircA8SuFTqNRqiuZgMJIlEpuXnNOLatwvzz%2B6iuaFi4N5VcFK3YiWFN3r59HMFNmMHUvhS35417dheTbFDlmA9j3uPnK90VYUUD32%2Ba%2FXmfxjbicEP4rL9shjcM8kFkvu39s8nfqRki712b0v8j6jGrZCzBj62voC%2BfhTL93PQbulpofMqfD37TAR4xwXiZ54C6YMeMWFL4mUOekEBlYoHODM9xJnVgya7VT9xewn9APGdNn4lyT79V0YEDNp%2FTw1lwMJ7pZxemyI5c%2BcD6Iq9ux9oGFW3iVmKklERmWOzVz%2F3Hu1ctqMIi%2B0HeuMdeVD3Gy7TRhAqbzCHTIIIU0luLdn31wKxLgSX0ydyeYJDu6UmIUGVOPO5Rao1xIBhZgCJIbi9U5Ov%2BYebHWStZcfxxlHLIF4keQwYVRotJxuEgKOfgWo%2B9i1SqiO6AV4aI1p6mW3v%2FlQ7Aozj0LTe5VJQK5uC0QF0VSWSVCbNm8jV0z9kqdaX%2BfCL1ENu07T%2FuOso1u%2FPNY7dzwISFmDqxlZgQNPgLDz2mif%2BTXUNwbZS6Tvv%2FaoIC6E%2F96kOhPY4%2B2l6R4C7IYEJ%2BDDUNp8AtLaPxQjy73kyj6ASnFl%2BiV3cUtwuTgBvJsfY0RXYjkFu7MNil680GOqUB6KEQ4kQKLgs25YTdYeI5rBgLGCUjjNWxzealbB9Adtt0X9I%2FzA5TT%2BqrmYCKHVimV94e2cwU%2BSGSiHhM4k2ytA%2BzQf2sUhqoVguVFEErZUTrt2UYj1wl1tsVYdg0O3qP2Hi6uL%2FFpggppTvF%2B2k1WWCahU1ULwJqG%2FXAv7ZJ60oKUxWfbTin6B04U52Ssd1MP9gcXS7VkFSzwZrCQFk5GCcqYx99&X-Amz-Signature=33eef9f6f5c67cdcf91d2296dc4f59603388e3f413371b8363baa643339f386a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFN5JP3T%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQD9BOPKne2ne%2B%2BynzDPOIVAf49mJXOwE8bBjSKLzR%2F9ggIhAIK0dSHmmo6WSdHc%2BHDkz%2FghhJuYX%2FT2aSCEtomWCmyKKv8DCAkQABoMNjM3NDIzMTgzODA1IgzzSnMGEc80WOEn2Foq3AMRm3mpUyQTiLnLzHR4r%2BdVhWPledruYRE7jRmNoXZqvTL8b%2FH2DQTXVyiEvdDsgVlyPa2UvNYigKl4mAO2n0N0yr6%2FYQD6B4y2mtD7cG2i83g7ufFMIZOPbRwcsSSL%2FSqmkGG%2B67E5al%2FlCwvCvqYpqE3YVApGQkk%2BIiGQIQSEapr0yYCcfWu34AKCgfzyEmbiXnyaNhiKhAgYFApHku8cfEKm1K4vQXHTqDekf109mqNIEQaK2BFVidGWi8gxd3Oftbf9M6sYVoZc%2FlpQRCNJOSZK9rzdzOQDqu81E9iT7x1BgNzPHTseFPQYD3taAw6FhNfZuvoCcsmBH14UDA9PrgL3azpPNmY0KNgtr51%2By7BBVWCtYuAN2%2ByXR2y1QQz6AtATGiIqpphwP1u8j8NF6%2FzZ37O26cc%2B%2F6o6UrxIeci9%2FTAcQUEbf0DgLH4kzCShL1dhXSbexsSGeU0Rf71%2B6pLUGNFhMntqnCFgqVfX4yoW9sTId5Nb5kN%2BCctFc0xLJorlHC9UtLS%2FmJz%2FQxCf94zO8sr6iV4JDi7qxi9HtqxVE3C5%2F0THPlnT3x%2F0b9mpA6uAiydY6DPqO693EKNY%2FOKwKjHMVqotInqMYpUcBqgdoG5mns0d5dPTzTCPpevNBjqkAbAp0vTGT5MJ%2FzTfXxlGwbweLaIYFDJwKAQjt4ST1byWk4RWGsmICJ8tCUY9xzR%2FTEoixnasb9UjxwrAlD5%2FIor7Mx9Gme1GP3JbIjZYaS%2FKBgljrbRSIn0OB7az0B0LKnX1lgeBARMIQORtKdmw1Ra626IxyD0MVa1WzPAe4l6kbyqungSu4mSXvfbRs3hxxBWHp0cyTasbLhzL6KU0s9Ly2MEL&X-Amz-Signature=8443e3cd7fe12f4d8ec236be34f1037c5b6ea049391471eeaf444c690a62b86a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFN5JP3T%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQD9BOPKne2ne%2B%2BynzDPOIVAf49mJXOwE8bBjSKLzR%2F9ggIhAIK0dSHmmo6WSdHc%2BHDkz%2FghhJuYX%2FT2aSCEtomWCmyKKv8DCAkQABoMNjM3NDIzMTgzODA1IgzzSnMGEc80WOEn2Foq3AMRm3mpUyQTiLnLzHR4r%2BdVhWPledruYRE7jRmNoXZqvTL8b%2FH2DQTXVyiEvdDsgVlyPa2UvNYigKl4mAO2n0N0yr6%2FYQD6B4y2mtD7cG2i83g7ufFMIZOPbRwcsSSL%2FSqmkGG%2B67E5al%2FlCwvCvqYpqE3YVApGQkk%2BIiGQIQSEapr0yYCcfWu34AKCgfzyEmbiXnyaNhiKhAgYFApHku8cfEKm1K4vQXHTqDekf109mqNIEQaK2BFVidGWi8gxd3Oftbf9M6sYVoZc%2FlpQRCNJOSZK9rzdzOQDqu81E9iT7x1BgNzPHTseFPQYD3taAw6FhNfZuvoCcsmBH14UDA9PrgL3azpPNmY0KNgtr51%2By7BBVWCtYuAN2%2ByXR2y1QQz6AtATGiIqpphwP1u8j8NF6%2FzZ37O26cc%2B%2F6o6UrxIeci9%2FTAcQUEbf0DgLH4kzCShL1dhXSbexsSGeU0Rf71%2B6pLUGNFhMntqnCFgqVfX4yoW9sTId5Nb5kN%2BCctFc0xLJorlHC9UtLS%2FmJz%2FQxCf94zO8sr6iV4JDi7qxi9HtqxVE3C5%2F0THPlnT3x%2F0b9mpA6uAiydY6DPqO693EKNY%2FOKwKjHMVqotInqMYpUcBqgdoG5mns0d5dPTzTCPpevNBjqkAbAp0vTGT5MJ%2FzTfXxlGwbweLaIYFDJwKAQjt4ST1byWk4RWGsmICJ8tCUY9xzR%2FTEoixnasb9UjxwrAlD5%2FIor7Mx9Gme1GP3JbIjZYaS%2FKBgljrbRSIn0OB7az0B0LKnX1lgeBARMIQORtKdmw1Ra626IxyD0MVa1WzPAe4l6kbyqungSu4mSXvfbRs3hxxBWHp0cyTasbLhzL6KU0s9Ly2MEL&X-Amz-Signature=fe3255f4e246faeabcef2f092e47fede0a5101be18411f170afcf14d8f5057a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNO5CPOB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEMlO5GlKU2LatuW7Ndb7TKgJ2SECI758E7sZXuL%2FK7CAiB7iGkdaNW3NZI4Y%2BbK4jgKFO2bLrjbw%2FRPO1eSNbHNkyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMrnASXJx3lqQDYHR0KtwDvGgqcVzZibg%2BlnZZ0Tjw3BIkYYLHZ9es3czGfXkPZCCx9xwFA9%2B4ceBn6grEMK8SPhDWAU%2FPEXFbzVvCJ6vlqoJEcgxktUVMjwnLhKKJRLFmV3yqJ7AM5ORsTXRAz4iHaEaqyX6LqiehANOMN%2FZMiF7WYW7IbPLWl8c%2BG3gPafOdY0QoRZdhtz5njDlvpWPo0k8D0jDVxCV05fTzZ8GB5D3q9jqujCKirrFPngSuYMcWvKSBdXlf4XKZ18o1SXl52VfB2N%2BjrWvc40Rj3MvpFzMYt22dNH%2FZOSdODtPBNVrWe8H15GU%2B%2BHYTT2rAdm4Qdd1IWaWjDSzYIK2I%2B5H%2B%2F%2BqTzjwwoHiF5fcTgYlZYb98ASbHYzXVe0S%2BpminOIdr8La4S%2FAYFN1fL6NMy4ec2U9IyokDIpZ80mI6F%2BxaR2qNlVJU9OHe1untZfvuhUJ3NHi0CKhJVkaEF9687kx57aSZtBKNs4yT4Ale0c07ESvUhGDGmVkrZawG7RP8vY3FDIyaDsCy%2BCxbYEGF7BP5Pjeuu16ByprN0HvsaOPGBA73%2FhENt5URPY7t3VooPLdBqnIwWPph%2FWncGoIMd93BPpBNU1Ct0YxMeNfaxLxfgka1XM0b133tcYGnpm8wnaXrzQY6pgGMVqeKTrBhi1o7mGFZwahPPqDv%2BTXzprYLweAmffDdZzFKZDxHHT67%2FGtUiXMVfHNq2Ok62qVX8Qr0ck33SJi%2FwWjX8VTstRB8RoM1fVk%2BNMiup0dG%2F3NzgjGxD29Uht6LjQmbomrpUO%2BVKRMlDXX%2BXoBb500bljhkWYfOcZG2ks77mUHBc4dKFdfQEOd6arWEUSOHKHao8bCG8O99yBeHW2km95DH&X-Amz-Signature=f3ce9e93f6c775c0968ea4521540d8a1476808b7fe856ab1722fc9beb2efd48b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466556WXTPE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEFn6l%2BqicvhFy5UFF9mlu3WVBjsazAD3p%2FsrRmj3CtwAiBKQOCfzx9dIXOBrTxe6NcMU71NsC0wOvcSTHYaGUKL3yr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMMDfaEANopbwnQ0GHKtwDY1WAtRjGSFUxD1VmnL%2FUAWAkeqdwJEEc4y%2Fphyuf%2B1UcVhwuCEuoUUvbyv4NJi982X8rkt7W2ljll93c0UWlMarC%2B%2FEBakQ9udWnAH9Jf8i4KXrRQ56Bt1hlXGWzN19QqNobuaDjFof1CvPtXOwISn7Ek0TnIpEc7MCLOzwwbgRxYPLce7PKEZ8%2FPuuvFyAMdS8cvLur3nk%2B9MMlC%2FleBTQ3tKHdiILYVTZJJgh6U%2BHJsyq5NP%2BB3kLTLGXfzw61Z2QeI%2BChkY3%2BO8CFqoNXagI54gIxyYDmlOa1QhMQIuPJRwl61c%2BjvEl2uGLBw6ZTsrnpghm8JfpTQ93YwuzWbH%2FzleJJwwg7nOsBtwzqZ99SHp9pyDiNMHFk7HM9JhURXQZwp28XTpG3F%2FLRXE2jHXqMkvxE%2FtfkW82F4iWF%2F3l7zeaWf1fkW1Tw5K3rF%2BR5BtPMe%2F8IIVvnTKgj08QMVQknwMYUAOmgX5Cm4VMlQwNRKWmVgEtKBohWE4ulTbwNOhFV%2BSMsaWkKaAa5ihEL1g8rZhMD77F7qjUZoHowBHocF6Yr5MNlokn9lJoQI%2BhZNroRcHcE2eqSWeWPWCAlpn8%2FOV3Yjhbgx3BBnLT1tiYGjA6WLD8CWWg7vdEwpqbrzQY6pgGVKHedBIdlge6fWVUtxZFoIRrdGKFtQ1E0tOHwLkZICZrI0AoBTXTRTIqxQckxBcvhN1fm6Je%2FCrqTbrzYH43fw1RVFY%2BnyJaFEGGaJw5blIt3PRvOCkdn1Ql39aGXwy%2BsOniVVUkvqUgKDaxgj5Kre7tORV59SSc74bz1mv9NdqUsh1HC6nXZbfN4FL5K36z0BqOA7rD53G38VJtOYjGySy%2B0mbTo&X-Amz-Signature=7f6a3685718d51f2c498de921121d17c9523b59a6af8eee2038f9b11f03d7cd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466556WXTPE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEFn6l%2BqicvhFy5UFF9mlu3WVBjsazAD3p%2FsrRmj3CtwAiBKQOCfzx9dIXOBrTxe6NcMU71NsC0wOvcSTHYaGUKL3yr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMMDfaEANopbwnQ0GHKtwDY1WAtRjGSFUxD1VmnL%2FUAWAkeqdwJEEc4y%2Fphyuf%2B1UcVhwuCEuoUUvbyv4NJi982X8rkt7W2ljll93c0UWlMarC%2B%2FEBakQ9udWnAH9Jf8i4KXrRQ56Bt1hlXGWzN19QqNobuaDjFof1CvPtXOwISn7Ek0TnIpEc7MCLOzwwbgRxYPLce7PKEZ8%2FPuuvFyAMdS8cvLur3nk%2B9MMlC%2FleBTQ3tKHdiILYVTZJJgh6U%2BHJsyq5NP%2BB3kLTLGXfzw61Z2QeI%2BChkY3%2BO8CFqoNXagI54gIxyYDmlOa1QhMQIuPJRwl61c%2BjvEl2uGLBw6ZTsrnpghm8JfpTQ93YwuzWbH%2FzleJJwwg7nOsBtwzqZ99SHp9pyDiNMHFk7HM9JhURXQZwp28XTpG3F%2FLRXE2jHXqMkvxE%2FtfkW82F4iWF%2F3l7zeaWf1fkW1Tw5K3rF%2BR5BtPMe%2F8IIVvnTKgj08QMVQknwMYUAOmgX5Cm4VMlQwNRKWmVgEtKBohWE4ulTbwNOhFV%2BSMsaWkKaAa5ihEL1g8rZhMD77F7qjUZoHowBHocF6Yr5MNlokn9lJoQI%2BhZNroRcHcE2eqSWeWPWCAlpn8%2FOV3Yjhbgx3BBnLT1tiYGjA6WLD8CWWg7vdEwpqbrzQY6pgGVKHedBIdlge6fWVUtxZFoIRrdGKFtQ1E0tOHwLkZICZrI0AoBTXTRTIqxQckxBcvhN1fm6Je%2FCrqTbrzYH43fw1RVFY%2BnyJaFEGGaJw5blIt3PRvOCkdn1Ql39aGXwy%2BsOniVVUkvqUgKDaxgj5Kre7tORV59SSc74bz1mv9NdqUsh1HC6nXZbfN4FL5K36z0BqOA7rD53G38VJtOYjGySy%2B0mbTo&X-Amz-Signature=7f6a3685718d51f2c498de921121d17c9523b59a6af8eee2038f9b11f03d7cd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665USKKUZC%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T165020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDXRLiCR1moLxLHJiMXpr5JZ5I1magVKBgjYlkvj4OkMgIhAJnOiI6CmEjVNMmraxzi%2FWMsPXS8XcmfIrbvd%2FCzGzQ9Kv8DCAoQABoMNjM3NDIzMTgzODA1IgxTNv8NMRAJH1Z6Tj8q3AMuDLnKaGeyfBRgPvm%2BpXtwAK%2BmMZMlkSqSs7IYa6sQq0hOlSE6ITf5KlvRt%2BEiSPoywfDjjI1XH8m0Y6K7IIny1%2BAPprLCU%2BJ%2BE%2BLoRqtBoy%2F%2FwRZU1fR6MI1IbADe59%2B4jLxXEul79UCPN5aYffFH2OY1A%2B21m0Ru6Ngev3lzOaaEVO0JNlWhVBh8AxI%2FNuTi5uQVCL%2BnuV6VFPK10m%2BCzUpmqmELN8BNbtELdzYZoJNH%2F6e%2Fm8lEBOrPRyuMuGdtjCo0vYmY4wF6TJQ3D5TcvMNxav75XV1JnN7pTO94fIlNWLV8m4RnjE5ce9pjwcNPy3bRBhfA0WHGi17jnny0W0Lv%2FdXw0XwG%2BhsBM2uHOhaMWQ14Bl%2B%2B2xslweuhz%2Bue%2B5CQQG%2Fv4I0dZx%2BSxiQkGNB6ze6qFmWjsMoH1szEIX4JWYiv6%2BDQuAVz49z5gOKcDAG9P7MF6gm5DJc2Rg8O7t%2FNNXBpyQdu5eg%2F4dJu6DkI4Xpo8tnBUJjS4wUATbBxfaWilo8%2FjT35FhmfmgJL1LP7kQdxpB3beQoZtEvnEV0%2FMhtmGZRXNCWmjWbVSjohNb%2BZkl344PvX%2BdVcHma%2FloGstqP6GuuwH0Hk5Xx4F%2Bpv3IkGjUiwXoFblTC9pevNBjqkAfn7i%2B%2F%2FF8q%2B%2BmmlXsq61y%2B61T2hpluh5Eoozkfjw3tVerAisjYM%2FVkojIrGtvEkgruNyW6R39PdyF6NvJUKlHiWL25Ku3KSfw9rmFoSgJbouqlG7%2BMtRLaUWgm2AFiTZOc62j7OmATzHTN7o5astO0HmX1q7hvXDbUosa%2BE8RAzHGVhJFMPBVDgSEuF1trgjEL8lH4NS25yuA%2FuNpWcryZLtz1A&X-Amz-Signature=916b5c12b6f3f1c500756a45b8ebc717050e227f1e43686d9d11f3adf224c278&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

