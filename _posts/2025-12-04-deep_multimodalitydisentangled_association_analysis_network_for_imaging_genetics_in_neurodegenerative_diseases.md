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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Z4IVSF3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDDyIt8vgY65FLAxtmOjM3DhnzrN%2Fgt%2F7xEvsClNvNNdQIhAP4o2pSKdG6fKuEHpOfsUqMBsSpDk8LD%2Fsgdbh0EoXW9KogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwfXhXdnCMO0hq4bkgq3AMWagPOdznDUC4PqGte4m42RV1D4fX2uQtVaj8W%2B%2BNcnqK%2FYA6z7fY8jHtWwSiKUEd8cQk5ugMK9AvFRtfXbgxF1wwFQBe86UUMiP9jTZ%2Bq0aPbNFn3dZuB6swxAaM7LhYYRbPg%2BV%2Bqe%2Foju67XhUCQclqIcx0vprK4nj6vBt5PpyayRGiwyjT7Ns%2FflTt05LEllk%2BCfOYGI3zARaXb%2FM2pIAHd%2Fg9%2B6GAUumUK7pfsJEg%2FCscyx3YsSvDl3fSu5K0I6yqjtu5biIhOur8JBCB3foBUK0CF0ys%2Bc2rrSPy2icfl3VMmAe%2Bew2LT7UzvUwHiWORmt5IqToZ0i%2FNIUq5GJjQ1O0uwMSJgetvM2HwM7vWK34tsgZSGx8hUNY7oUTmcpJeVsNSgdpcK8Nuk8PtBneOXOh4nK9Lx7GPHCC4eprv5yFAnraPSmURdU9akYwpY1oRuLrFhCi8cbZFdP9irZS0SaVHUKQARMJoI9pZ8fOPoZnKzAzS%2Bn1%2B4sjlNqFaGzeFZSEmReRXw59riZcrGHdMcpwFGBj74OI52ur1MImKsiz5kVhdIRY%2BgQ48bg0BqyndCkDiyUO5WhY4iK9PDINpaZSvqsatSXftHYqQ%2ByWEqtn00H%2FbwtuxTtjCetdbOBjqkAZsSMdzB8aEd0wKpo0r7q4HYnefzxWNJHWuGQsmVgVQPa9TNIXJmB5shbG7OB7R1asvqVpIwmgEGWZm%2FieHLZvoZMZJm089PW%2FB3nr6YtvcHtDyqYhyuOSmlyreYz9iukJz0zSp%2BLTErW5lA1TU1eaFAWGUjEbA1L7xkEO37Ko9P%2FHtomhDm%2B7YRdMtdRJgVGVQdxJgfIYnj7LnjxE3FdHQMKMR5&X-Amz-Signature=7f5152b9d9fc4c3b884814c0e09508e4a03629106aee1a53adbf61b3df9628bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Z4IVSF3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDDyIt8vgY65FLAxtmOjM3DhnzrN%2Fgt%2F7xEvsClNvNNdQIhAP4o2pSKdG6fKuEHpOfsUqMBsSpDk8LD%2Fsgdbh0EoXW9KogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwfXhXdnCMO0hq4bkgq3AMWagPOdznDUC4PqGte4m42RV1D4fX2uQtVaj8W%2B%2BNcnqK%2FYA6z7fY8jHtWwSiKUEd8cQk5ugMK9AvFRtfXbgxF1wwFQBe86UUMiP9jTZ%2Bq0aPbNFn3dZuB6swxAaM7LhYYRbPg%2BV%2Bqe%2Foju67XhUCQclqIcx0vprK4nj6vBt5PpyayRGiwyjT7Ns%2FflTt05LEllk%2BCfOYGI3zARaXb%2FM2pIAHd%2Fg9%2B6GAUumUK7pfsJEg%2FCscyx3YsSvDl3fSu5K0I6yqjtu5biIhOur8JBCB3foBUK0CF0ys%2Bc2rrSPy2icfl3VMmAe%2Bew2LT7UzvUwHiWORmt5IqToZ0i%2FNIUq5GJjQ1O0uwMSJgetvM2HwM7vWK34tsgZSGx8hUNY7oUTmcpJeVsNSgdpcK8Nuk8PtBneOXOh4nK9Lx7GPHCC4eprv5yFAnraPSmURdU9akYwpY1oRuLrFhCi8cbZFdP9irZS0SaVHUKQARMJoI9pZ8fOPoZnKzAzS%2Bn1%2B4sjlNqFaGzeFZSEmReRXw59riZcrGHdMcpwFGBj74OI52ur1MImKsiz5kVhdIRY%2BgQ48bg0BqyndCkDiyUO5WhY4iK9PDINpaZSvqsatSXftHYqQ%2ByWEqtn00H%2FbwtuxTtjCetdbOBjqkAZsSMdzB8aEd0wKpo0r7q4HYnefzxWNJHWuGQsmVgVQPa9TNIXJmB5shbG7OB7R1asvqVpIwmgEGWZm%2FieHLZvoZMZJm089PW%2FB3nr6YtvcHtDyqYhyuOSmlyreYz9iukJz0zSp%2BLTErW5lA1TU1eaFAWGUjEbA1L7xkEO37Ko9P%2FHtomhDm%2B7YRdMtdRJgVGVQdxJgfIYnj7LnjxE3FdHQMKMR5&X-Amz-Signature=7f5152b9d9fc4c3b884814c0e09508e4a03629106aee1a53adbf61b3df9628bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NXWXALL%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIDMBHm3mvrxpbayDzz4tGUmJ%2F22qwSHjHLC0tqAqv8SvAiBV%2B3clPLh8g8YtjBLdH73NCSm2LidGrAYFBb%2BZAb4pPyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYIOpIha0zS3ZZu2OKtwDiYKXG4apg51OY%2BBPLFY5T6hMb8YMNz3rsx6NnaK2jy74WDY4m4JBw%2Bxc0TqHihhD6HFkOuXYiGNHt8LczHvih7WBaBAJU7%2BZpdTQsUupPdJwsExp%2Fhu8QrKuHThQnEKrUuhKQ5MmSzZvsqAFo4PixDBMifAoUkSczCbCdmspvnZdcwBDty2ZQzIwLXdEAjrqoxKgPlIpt7tyZcNCNLEh15382WkmkbWVnBRGLChzFJYVW4fjmdAqr11ckkEFEQXzWCJ9DfyBRuMLDyr0RI2Zxo1H83wYzWI71T9NplYw2zIV6r4t75qRPdYfx%2Bf92AlK88LJqMvTWYKMvSCo5YpEdfJcsW91MMKtEFUFMIiOj6wwoVt2oeJmpd6PBHqdbZYMcjUDICoyIMu4f9XC6iA7WCnm%2BYkPI8DU0jgIdoYnCGPJHrXjdSua7C8G16MmvODxyS%2FskAf%2BIdiD2u32yuHXBCihZBkcnR2SuWa7odB4V9XgBTnrYU4BeKkHd1E5efmzQ%2FoK8SSDKGoqS6uhHSgGt49H8AC7CqDs2zq%2BwzqzIwCkp9TJmj4HV%2Fj8AUWMae%2Br5fCrc3Kgz9A0V27pKhb0jRnXM6jIDeE53DTH7cGeqUsLpTMv2X9oZSihcJwwsbfWzgY6pgF5CKLyBGZpEBu7mB%2BhjWtAwqij7E1%2BKBdHHboFXzMX7sd8%2BSGxoW6N5HxURg%2FpjrsQkWaMNFb3ietodnaCf9D1D7fgSoyhYsc8qDupcc9MxEYaYy2VRKmCf7Ym2WPQQccEGFVQGmYQntBLFI%2Fa5VjdIZhzyoktCG10Yq83QORuiXAO6k3emKoMv%2FK2Z4LQuP3cQcjuuOTjjk2j1YWydfoO9CyRFnZV&X-Amz-Signature=3c963b19cd36ba7390b7571cfd0685dcf3cae1fa4cc835373339cb038ca090ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUS2O4MV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIEndKjZinjXuXevUcUwfhJ66TFVUj7sZk5NZfoUh2FoAAiAv%2BIaSvAdX5Gid9z2CuxpjS6oepnX6ZIcH%2F0J1s%2FCMCyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhnNQEWibDb9q6KpKtwD13221JorRNvcPIHF1Tt4TLAPtaxHTcRCY5otyEYWPsX%2F7waWqP26Q0b0wL3HPGkFmJASdQgXc5jeYlasFX2rQM5igwkdD1cAEtEpu8mDdxNiv8cj0S65dl78FCshpuGdy%2F1SYkJ5%2BGj%2BeHoy6dMeoYkaRfKtn6hYSjTpqnIiPOAE2XoNqoeusLd3Tdo5MgivvP4GRD6qJY3nhBntqM07exzvmybduARinw07i9%2BMcHUOTZ6s4ggvDqIBNlKuJxoxxJ5ILoNSdKNAdTPrND11v8je6Bc%2FSK24txQHhJTeILIPEUzLtAl4rSG57foXRxL6CHrQaLHI6I%2B%2BE3Eu0w3TfZfag64rAWyv7nRsiT%2BOu8VsgxDc8OWTRimK5KddzsL5FzZS9aUb6QPqOcOhQ9KLAbfgZjO8oyg16vlPa0HHkwTfdFN9gwSGxQWg5h2zQ6a8M0CT85qWn3taDDB9PG4EhPFqPUR89On67YcVZpGODyi6KdO8lM8q%2FNWCnFTiZ62wwbTvkMU7Bk9S%2F86qHpuA5p8Ut6P5CX%2BpSFy5xCYLHicSc%2FYchA%2FNXx2ERCI3mV1lA1%2FGvXy19KSplqDdHABJJClWz%2FLV5y9yIGGpROIHcGDm8gWhuL26h%2B%2BG6e4wzrXWzgY6pgEftVZ7ryr0kb9nnEuVvqBQqNwLy443W761RQXLlROEqWqLp6uiDlz%2Fd53xMIs8JpNyDW0ta0rBbjDjGIsdKHtYbWzmJ2kKOnw7LSNkGi6NoeBUkGO%2B%2BPwC6P0zA4TD69g%2BrhIMyFgSuW7PIV5HUNYFRivAk7yuYzomKejDzZm4BP99wSRaUgXSDJxeHn6wAFHxt9po8HE7HP9YsEnj8WT7C%2B3%2FJiT5&X-Amz-Signature=bec2522d8b354625e3b0c8012dc2692c444e25c3d274b960c1f7d6ad4f43f4b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUS2O4MV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIEndKjZinjXuXevUcUwfhJ66TFVUj7sZk5NZfoUh2FoAAiAv%2BIaSvAdX5Gid9z2CuxpjS6oepnX6ZIcH%2F0J1s%2FCMCyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhnNQEWibDb9q6KpKtwD13221JorRNvcPIHF1Tt4TLAPtaxHTcRCY5otyEYWPsX%2F7waWqP26Q0b0wL3HPGkFmJASdQgXc5jeYlasFX2rQM5igwkdD1cAEtEpu8mDdxNiv8cj0S65dl78FCshpuGdy%2F1SYkJ5%2BGj%2BeHoy6dMeoYkaRfKtn6hYSjTpqnIiPOAE2XoNqoeusLd3Tdo5MgivvP4GRD6qJY3nhBntqM07exzvmybduARinw07i9%2BMcHUOTZ6s4ggvDqIBNlKuJxoxxJ5ILoNSdKNAdTPrND11v8je6Bc%2FSK24txQHhJTeILIPEUzLtAl4rSG57foXRxL6CHrQaLHI6I%2B%2BE3Eu0w3TfZfag64rAWyv7nRsiT%2BOu8VsgxDc8OWTRimK5KddzsL5FzZS9aUb6QPqOcOhQ9KLAbfgZjO8oyg16vlPa0HHkwTfdFN9gwSGxQWg5h2zQ6a8M0CT85qWn3taDDB9PG4EhPFqPUR89On67YcVZpGODyi6KdO8lM8q%2FNWCnFTiZ62wwbTvkMU7Bk9S%2F86qHpuA5p8Ut6P5CX%2BpSFy5xCYLHicSc%2FYchA%2FNXx2ERCI3mV1lA1%2FGvXy19KSplqDdHABJJClWz%2FLV5y9yIGGpROIHcGDm8gWhuL26h%2B%2BG6e4wzrXWzgY6pgEftVZ7ryr0kb9nnEuVvqBQqNwLy443W761RQXLlROEqWqLp6uiDlz%2Fd53xMIs8JpNyDW0ta0rBbjDjGIsdKHtYbWzmJ2kKOnw7LSNkGi6NoeBUkGO%2B%2BPwC6P0zA4TD69g%2BrhIMyFgSuW7PIV5HUNYFRivAk7yuYzomKejDzZm4BP99wSRaUgXSDJxeHn6wAFHxt9po8HE7HP9YsEnj8WT7C%2B3%2FJiT5&X-Amz-Signature=89e6582df418922984270dca58c3507761a9d813259e0719569875576560884f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CY7O775%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDAT52jB9fl7lTGS2QYWJ2vyMPPS4dM%2FMi%2F2t99%2BbjlcwIhAJ%2BUFkIYIhlijFM9pVrfeOu1W0b%2FJziBD71qYKkwoEgjKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzh%2Flzp8OtS%2BZGtkkcq3AM3hNznmNBRzFF%2B%2FBYZpCmEJLeTwzS1B3%2BFAuLJT3e8rxD81GAowFG9ZXhGdzUrjt%2BCCnlEubsdKVEZA81fTMOOfkNxdCm%2B1OQ3ZGLfMfarmRvKnPy0m4%2FoB3uVst59oBvBorh0LFKUInPWaEVt6kX2WxchoddedERAwVPlyiWE4hGQc%2FEC4b8WF8%2FGjLy04WHC2mosvk5uV9HJBlpT%2FgYI%2BvtnlRUEYo7sv92pmrEqAiY6mIfIJAi0v5h4VXOrigPw5IxPxlXjnxBSUfY73LJ0MFoYyzs6i4X0O4CT4p5%2FdLowu8TZFnurOrJrfMsOmTQZ08DxC4b%2BGd9dHx4VWlb%2F6doxXddhLNpTN%2Fcw5UpIXIjPmFnplI5VJ5kqOU3ZBllKXkoBjH7UB%2FUOixtJG7BlNaNK7DMGAh1%2FBWev58CHCiX8L6n9AqNm4tjnhHss%2BYZghb8NidbeEyW97NVlTyTQ8fWlxh0WEvhaSOLNdZX90Oor1v%2FOU2uDrYS2KQcClCYE%2BAvqGVD7uiTTSrk4kIY2rkRIG5nIoJwL4ryQCPcbT2Fw4hchsyAKiHQaV9tHRdepWXdHuzFDyP11Z5D5rrWgnsXAYRrOaUZ4%2B6Y4e01fEj6AnlsU8vNiv6T%2BLDDRttbOBjqkAY5WqcTwtFG9BlnzqYm%2BNfQBBO7YFNEtltmEJ%2FUSA1jUTh2SG7L9SLUcsM%2BnUzQjcRauILMlO4Eo3d6xUU11MIHTzImIBRbfp8ldRViy%2BH7L1JbK60oBaQhTFkdMfr%2FMjbq%2FjT%2Bt1I%2BIcISHLmLauUcs0H%2BRk%2BJosK1zTWpf5dcwH3JMP0TUSoSIg19MdcYMrJC0aovhWUILwUF0NyAGkybKKGUB&X-Amz-Signature=ff00dfcb9190eb2998e0ab5e81675b1c93c222a85a7adc45f519314acadfd253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WACNPII%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIDr%2BdIdPg2TSs84HuWbGaktRo01DdqUnfPZ6OChSzh3CAiEArsdLUz%2FnonxdGwq%2FZX8h2p0hgMOyQUeb3AVTLqPFlJQqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNI49oq2qRyKAMHrgyrcA%2FpjJCX0Aa1VASToNb8cnbGoZySU1FQl0MFjKbGe6oi9YB98eZGqvMO68zD1x%2F9GlxuLoiLJ3trEM4POQShzmNWWcJGazCsxeuPlzS8g1USoM3JlkA%2BtQOj6p7u07%2FUGH0zxi7bHZV7WpnFcGiAzv0ne9SPIV3U5kUpNY69iQCQfYsNKqZHbD6rWWIdGJgbJr2raLB8aby6W3cGbxhy4GT55W0DhOjpIbmAMNHfBIsBQDadAo7k3G%2B2ULhBK%2F0nQG6NlmmRQj%2B%2B6gRgwUSU761kRa07Si3ziC%2FXawY2M0NLnHaiw19aXqQ7GZYq8gqgiN7tIWj5B7i%2FaOTlWUJ9uoGaJhErJ32NUeNffxHJNEg9kqS9Xb4yVYBkQllLAgMHROzEd9zdSyX59XjG2IKmkShvq7abz6YyJqAV5AxvNqLqrzqkgXvOMxl7UnxUy6tU5wm79mFF199zM47LBpFaE3ilX1UMW1PIBEEN2RWCwTcTYJ0sWpLayUe8QNU2CCVrKBRQNScySLCBqKiEHByddBesRtaXHaLmfE1Ru0YjLRJ2xgyNmF2sFalADksNmNMr73yIc3Knm4G5otH7SL6TbD0jlZ8ZTCTJH8QZbo3mQbfMwoeRFpwGF9W2p1xZQMJ%2B31s4GOqUBucW0Kav8oo%2FHD5npszgQ0Se2fRz5A%2FixDDo1OX3avTCDafYceoxL%2FpPdympWoLtwvS8JYlngmvPOdoFAzle7ghSt6FfvQWsW%2Bozoh690pHF%2Fy7bCXFhvwavLfITd12itZQOqxXNO%2FtPc%2Bcaq3UIqB39At8vyC9mw7GtiFGGRbrSn1D5tReCXSQ7wa%2B3MmMSdPadO2DNpQNnFFxXdK83d0q7hpquU&X-Amz-Signature=f805fc57a453a783ad25336aa8772c74849e82ab716508b55860646a98936921&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YK5FJP5J%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIQDcf7JHPfqQgk2xPuqfQdSCWs9IifRXM2Yfioo%2BGD20AQIgP%2BKUICMEdFGKF16GHp4AuBPMmmzh5fcxfdKdMH19220qiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLxKkYMJkS2l62lfHircA5M3JVrauCmCVgJCPX%2BxOa5RprZD4VFOKovV2PZf2SLDSvN2dKaX01E2BnnOQoPrvirqtt5Z%2FPWTVTv4KN%2FNARkamoOoQuX0jQfLu9UOZB4ZFEGSXQxkc2xhgbuW0UIsJ0yw5CPtYsm9jCknst5xGPwgj6323bEGEFKS0YhFwJwRJrTDG%2FuC9Odmv3WOpeA6FwHX1PBP94Xa4qvPiupKbOlI3MVCcdFqrqokXbmzDrZRgaNqGghD2TJyAJh2f5m0sQmCX5DZifP0t6Gol1fTfRsSKyg2IkbhTjqSeoCOFMixOC6CkuwBySdC8Ei5%2Bm88%2FHEo%2FsXXbN7yOHE7ew0dnPOEMHFqbOObjQUSfpnl6H8VOLgGoDWtYcRkjn26rbttQWH1RiniDeQ6KJiJ0EoO1FtwYy867JGvaaVtma5YmsJCtIVywomC4lBhTJ79noqcv6N3lwe1S6eK53XPR5rmNbIWtaIub6di9IQUCc7vyrDiBuxcnEr2XWTVKg%2BYdzVXfmB2gNjemUtAIgz8Vt%2FUKn91fnjTn3PI4CBFb7C64wlP4wucf5%2FAbn2hRLZcP3FWnmfmNIhLO2w5FslSMKAb4lRs4%2BQQ%2BzOiYJuQw9R0i8V%2B6i%2BRHQygovlygDCtMMy31s4GOqUB%2BU4djln4PIMyXyO3RFxlIibwiWlgg0rhuJWT%2FZ%2F2l8%2BtlvIQSFJkAMY0RlZfZU2hVWT1sl7r5%2FU95KGKpNUictIWXU5s3qfFxph3LV%2BeTs18XSmSCYpLvfQdRcAua8Sf4wQYdkkSUVqCzsS5lLHTCHO7FddkvbQ9Lkur8TRCutkRVG49G7uGRCyyHW9XBjW3j6RJXt%2B3T%2FtFgiRbE%2B%2Bkn3tUMxSl&X-Amz-Signature=a13f98054dde980a20d40536d63d9984588c51ffcf048cd33e7209f4ed472509&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHFTY5UX%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIHe3K8L%2FOzfC1WpZaXMdkO2rLMPYW8a2pLyvP9KsPgjTAiEAhV7k934GWMbT9J79hsQZiblURJnUR2RoWTxZ%2BChLgvsqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQIRRppbODO22fjVyrcA8iqS%2B7wlsI%2Bq0sjKrzy2pZoS9Vd4bmTT3A4biUKa6UN21BO1o6iiI3UFzDye%2F66yd7r3Ykn%2BX9LfXZwHD3kxpTgeXpjLkqO%2FuTGKuMZIgA9WfVHwPTC%2FmCcJyC7N2zf0VN5i6EYjJP%2FO%2BsxDtB6eAaj3OKa%2Bgpwb2%2BEiNsy8ih7j8zKKKgwDRIUqT4%2FWpRPnKX0r3dbyDyVr25UZPdzyRvJj1N0URZ%2BWgFr2g5PCX7QJisz3og5KKBtQ1%2BnBwTBzKWeBSWr2UQ1Zf06ZH1UPdjgiwb4U%2FRfU3uTsB4KUWbgTZweeJzo9oPS41Enux%2BP6Xsv8Pt3hQvH6idageC2pgLgP%2F9dP5o6m1YdYIEWLvMVDQQnfyBQyYICzjTe%2F%2FgaQLnln3R%2B8n1hNa%2BNJEp%2FFBdaICWnFZYBGn5sQdASAQtaNHhuhVLJxQdwItD6S5H62UTXPbs%2FwVY%2FHiLpa5XV3OZlAmJ9l3hkqMF7kARae%2FuWYchDRcTQXw4wgtvk6zT93HEHeoa9qou60%2B%2BpRQIigzbhPnT%2BBU3A%2BDVNxDQCu2aa3104lMK0oPHSLnycAdY8x0ij%2B8rOuU05MDPjsQcDgheslacPHorSmGNqeoiGKiT8KONEyzO%2Bhr9FEd9VMIi11s4GOqUBlKq3PvTvjQ38c5uYF9AwmlJkD%2Ff1gZM7S3w%2BiG0Z%2FOLFh9b6bB%2Bdqt5%2BaDlC1nN%2BfYj3GBx69u4snmkwNCN5wBCheODiMRNkbcY0w%2BWsuE3uAqBFGTZrB06SedhLfrFq4yRbM2jw4BXa8IW1EJ9JDJJKMSRjEmO8Qe6gd8ENKXCnrWU7XnsQDVJdWYKzMnES6NkZCdA1whm%2Ft52IfAxz1VFcdMk2&X-Amz-Signature=3b9433f5017aae41ece5f981ffd342a1219459448865f264284160cdd8d86ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHFTY5UX%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIHe3K8L%2FOzfC1WpZaXMdkO2rLMPYW8a2pLyvP9KsPgjTAiEAhV7k934GWMbT9J79hsQZiblURJnUR2RoWTxZ%2BChLgvsqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQIRRppbODO22fjVyrcA8iqS%2B7wlsI%2Bq0sjKrzy2pZoS9Vd4bmTT3A4biUKa6UN21BO1o6iiI3UFzDye%2F66yd7r3Ykn%2BX9LfXZwHD3kxpTgeXpjLkqO%2FuTGKuMZIgA9WfVHwPTC%2FmCcJyC7N2zf0VN5i6EYjJP%2FO%2BsxDtB6eAaj3OKa%2Bgpwb2%2BEiNsy8ih7j8zKKKgwDRIUqT4%2FWpRPnKX0r3dbyDyVr25UZPdzyRvJj1N0URZ%2BWgFr2g5PCX7QJisz3og5KKBtQ1%2BnBwTBzKWeBSWr2UQ1Zf06ZH1UPdjgiwb4U%2FRfU3uTsB4KUWbgTZweeJzo9oPS41Enux%2BP6Xsv8Pt3hQvH6idageC2pgLgP%2F9dP5o6m1YdYIEWLvMVDQQnfyBQyYICzjTe%2F%2FgaQLnln3R%2B8n1hNa%2BNJEp%2FFBdaICWnFZYBGn5sQdASAQtaNHhuhVLJxQdwItD6S5H62UTXPbs%2FwVY%2FHiLpa5XV3OZlAmJ9l3hkqMF7kARae%2FuWYchDRcTQXw4wgtvk6zT93HEHeoa9qou60%2B%2BpRQIigzbhPnT%2BBU3A%2BDVNxDQCu2aa3104lMK0oPHSLnycAdY8x0ij%2B8rOuU05MDPjsQcDgheslacPHorSmGNqeoiGKiT8KONEyzO%2Bhr9FEd9VMIi11s4GOqUBlKq3PvTvjQ38c5uYF9AwmlJkD%2Ff1gZM7S3w%2BiG0Z%2FOLFh9b6bB%2Bdqt5%2BaDlC1nN%2BfYj3GBx69u4snmkwNCN5wBCheODiMRNkbcY0w%2BWsuE3uAqBFGTZrB06SedhLfrFq4yRbM2jw4BXa8IW1EJ9JDJJKMSRjEmO8Qe6gd8ENKXCnrWU7XnsQDVJdWYKzMnES6NkZCdA1whm%2Ft52IfAxz1VFcdMk2&X-Amz-Signature=c4ae45caa32e8bfa0d9eb25e512a58c74cef7b6aeb4e687378b23015f2106db0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672SXP76C%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIG%2BUoie4VxclbAndVdWb%2BnY90qUd22Isz8OXdLv7%2BPNlAiEAhfe1Xr3GUp0ntU8RiLxAx1FizPZDR%2ByU6AQlrN5bBe0qiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH5y524b62eZczBUQSrcA0li4VtdRLick6ohsufM6GAeu0ToliaaOyrKXiei%2BhW%2BGPURk8vqpYY242s7mORJYkhrfxV1408dOsmZSPELTxUOZYfstYMUJ2e4MrlG5jdZnyalfAiHYr3uabkBSXJpF6C%2BJWsxSbTSn9TVLFbDb%2F7apjvOmUntcX%2Bo3zRCdupzrm1jUQFkZ0sl9tDhIit2dosBEyBebrXRUdUbhhkCLbYE0vcrIWnB473PAn62XQSieVnNSg8C0kbt1nl3XaNcEhlClgBpabBagbOCV7%2BNvc%2FuNncRWI2KqNSxRvJg8fGPqoU%2F1HzTuNtUZ0pPTYOEK0Uxa4D8sZ3nwhYdCVaCma%2BfqaNSWdRVPzvcfPwkafUlq2k%2BPIBdTQP6%2BJBCxD8WDI63awZ827vUyfmyF8VQfMmLY5FQDZ75Iz7Mmk9JZwRu6Mqseb%2BuTqaEHMcZUcyeH3T%2FTKbaKLEv6PqIoz5ddzqUQ3D4EWZBUfneW9uU3TXGT9l9k5LCDHFVEjPcJmbiR6xX8ZB9vBLPpUpdOgWYGtjlrEY6Iq8z8WW5zq1f%2BofVYPBI2fBP4Aj8laCt2SmJd3B%2FBkSE3UdZnR7NVa4XUL0D066EpIEiyzc9YvDBFmA95f1V6qyiHFAwjq7bMNW01s4GOqUB%2B3e0wAsUQMMchn4ikX%2BhtGMnSE0MArM4jNCZPKJOgfe0%2BLEz9tz09u5LLnN46uk2%2FRA6%2BjIoQgHSf3MnON6T1t%2F3HqqhyxHtdJmdUa6OIaQ95tZ3Nu8ROJbCHJdwPcZKSamF6wf9u71iL2fPL0KYkZygvMdc7ecL%2BMd2q931mVTlSG3H3LPGDS0vIQacV3RGksVQgeYmYlcqQt6kL6OHO6UUWoWC&X-Amz-Signature=fd4a3851b086f620644c27b9c67582577065e7288759b5086a47841f455c85e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPN6RDPE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDhHGtL5RG2rCjp7zd%2BenCyEOpfpXC1fXoa1USOJPkcLwIhAPWRwQcj5aJin%2F8%2F1W7Kye%2FzYNWctsUkifHFSUjtlAzpKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwAMpLvH4HnUXIFavQq3AM6uMgN8DQQN4WcN92thg5wuQvOorla0K7DusohbsBb0WJeFrVa%2Bo7u%2FU1ly8jBdfQNbNrqGS3PAVC7%2B3sb4%2Bh1qY7IOW8jrMA7jHQB6Kaa4wW77FKGLCR%2FQTnoXh30Ex225mAQHtzCcNLKKDlDK09bcKSCgklVYFem9gxVPGGFxCSV1c6w20R7M0Ltkrgzq9yQUAWs3AlJVuBGTUludIq%2FPABGh4kGROjeTuxUBI11fh6tiL0QJoh02e0fTWNRiV6hmxJOVSLi1Eo%2BkJZVyDLIDY13utIggsT%2Fk854sRRxkNcTXAk%2BHJnijzE2inpvfZfWptnsRm6grfUb7ZwzPQNbtyR1cGpJtj51U0sc0g08uIDO%2Bmyf3zwCN9mp8Ir0HwSp120Opj3Q0EzP6MReldBaHOWzpdSzP5htGtS6tN%2FB16gBoCgonWSTcx8Av76W8F9c9dih4cdDzKcyJUGYj2CvHmWhX2D21FnYm2qOlABij1LTHkwhPsbgo4sDahI8dYTyDi%2BgQtFfxZoAEZLJf16lTKxxzoaqRET4AuRcXBJAa%2Fc4LAtrYX%2FJs91IsMfKIuotbPLu1KiYvXV2k5yvcjJyCyTcdNwkgJQ8cviQ16qvmFh2062cNjv8uPk2VDD9tdbOBjqkAU7xQOlGRRtwv5K%2BkAMANlCQJtoyT69LXaLaPMET9XlJGOJNXfMSj%2BaOKi6aEhAHIipacLu5G0TI2ChUy8YeAdDjXwmvagef0oFBpQGs0B6%2FGQVva4eyFW7lPYcNX71N%2Bsg38u%2FAyW7rAh9C84kMsBYKDc2VNHpAwaTkP7T6Kj%2FJ8hDiJdoNh2jx4vPOXSWULxOuI6XBdPDuWuVEHk3CblkB1rgD&X-Amz-Signature=5780c0f853fe70d97f6b413647e4caf29cd83fcbb7bc030391f98c6a2af8c7e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPN6RDPE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDhHGtL5RG2rCjp7zd%2BenCyEOpfpXC1fXoa1USOJPkcLwIhAPWRwQcj5aJin%2F8%2F1W7Kye%2FzYNWctsUkifHFSUjtlAzpKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwAMpLvH4HnUXIFavQq3AM6uMgN8DQQN4WcN92thg5wuQvOorla0K7DusohbsBb0WJeFrVa%2Bo7u%2FU1ly8jBdfQNbNrqGS3PAVC7%2B3sb4%2Bh1qY7IOW8jrMA7jHQB6Kaa4wW77FKGLCR%2FQTnoXh30Ex225mAQHtzCcNLKKDlDK09bcKSCgklVYFem9gxVPGGFxCSV1c6w20R7M0Ltkrgzq9yQUAWs3AlJVuBGTUludIq%2FPABGh4kGROjeTuxUBI11fh6tiL0QJoh02e0fTWNRiV6hmxJOVSLi1Eo%2BkJZVyDLIDY13utIggsT%2Fk854sRRxkNcTXAk%2BHJnijzE2inpvfZfWptnsRm6grfUb7ZwzPQNbtyR1cGpJtj51U0sc0g08uIDO%2Bmyf3zwCN9mp8Ir0HwSp120Opj3Q0EzP6MReldBaHOWzpdSzP5htGtS6tN%2FB16gBoCgonWSTcx8Av76W8F9c9dih4cdDzKcyJUGYj2CvHmWhX2D21FnYm2qOlABij1LTHkwhPsbgo4sDahI8dYTyDi%2BgQtFfxZoAEZLJf16lTKxxzoaqRET4AuRcXBJAa%2Fc4LAtrYX%2FJs91IsMfKIuotbPLu1KiYvXV2k5yvcjJyCyTcdNwkgJQ8cviQ16qvmFh2062cNjv8uPk2VDD9tdbOBjqkAU7xQOlGRRtwv5K%2BkAMANlCQJtoyT69LXaLaPMET9XlJGOJNXfMSj%2BaOKi6aEhAHIipacLu5G0TI2ChUy8YeAdDjXwmvagef0oFBpQGs0B6%2FGQVva4eyFW7lPYcNX71N%2Bsg38u%2FAyW7rAh9C84kMsBYKDc2VNHpAwaTkP7T6Kj%2FJ8hDiJdoNh2jx4vPOXSWULxOuI6XBdPDuWuVEHk3CblkB1rgD&X-Amz-Signature=5780c0f853fe70d97f6b413647e4caf29cd83fcbb7bc030391f98c6a2af8c7e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WACNPII%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIDr%2BdIdPg2TSs84HuWbGaktRo01DdqUnfPZ6OChSzh3CAiEArsdLUz%2FnonxdGwq%2FZX8h2p0hgMOyQUeb3AVTLqPFlJQqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNI49oq2qRyKAMHrgyrcA%2FpjJCX0Aa1VASToNb8cnbGoZySU1FQl0MFjKbGe6oi9YB98eZGqvMO68zD1x%2F9GlxuLoiLJ3trEM4POQShzmNWWcJGazCsxeuPlzS8g1USoM3JlkA%2BtQOj6p7u07%2FUGH0zxi7bHZV7WpnFcGiAzv0ne9SPIV3U5kUpNY69iQCQfYsNKqZHbD6rWWIdGJgbJr2raLB8aby6W3cGbxhy4GT55W0DhOjpIbmAMNHfBIsBQDadAo7k3G%2B2ULhBK%2F0nQG6NlmmRQj%2B%2B6gRgwUSU761kRa07Si3ziC%2FXawY2M0NLnHaiw19aXqQ7GZYq8gqgiN7tIWj5B7i%2FaOTlWUJ9uoGaJhErJ32NUeNffxHJNEg9kqS9Xb4yVYBkQllLAgMHROzEd9zdSyX59XjG2IKmkShvq7abz6YyJqAV5AxvNqLqrzqkgXvOMxl7UnxUy6tU5wm79mFF199zM47LBpFaE3ilX1UMW1PIBEEN2RWCwTcTYJ0sWpLayUe8QNU2CCVrKBRQNScySLCBqKiEHByddBesRtaXHaLmfE1Ru0YjLRJ2xgyNmF2sFalADksNmNMr73yIc3Knm4G5otH7SL6TbD0jlZ8ZTCTJH8QZbo3mQbfMwoeRFpwGF9W2p1xZQMJ%2B31s4GOqUBucW0Kav8oo%2FHD5npszgQ0Se2fRz5A%2FixDDo1OX3avTCDafYceoxL%2FpPdympWoLtwvS8JYlngmvPOdoFAzle7ghSt6FfvQWsW%2Bozoh690pHF%2Fy7bCXFhvwavLfITd12itZQOqxXNO%2FtPc%2Bcaq3UIqB39At8vyC9mw7GtiFGGRbrSn1D5tReCXSQ7wa%2B3MmMSdPadO2DNpQNnFFxXdK83d0q7hpquU&X-Amz-Signature=f0bb149a0b517536e608f1f6a7cb79ac12b041a0d4341a4110ff9d07d6b711de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

