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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XECK66R%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjEm0VL7ac6%2FHpW2Erd%2Fqn221eHf3x8lgjYq2pKsuEFAIgCtZNZKg3ocprMhWQL6yDkkhX0ZRVaSw9Rk3IUPBucbcqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGwHdqD%2BxO%2BPA%2FB%2F5CrcA04a3yiWuvkKxa4SYiAYfnP8LVnMryn5aJuOdPp758%2BgHI0Dgvg5lRjyEEA85nOoWFItZ1YrKIFcW4ePN7xGyHIuHXOBdlDjDalwMstuHpP4m3B%2Fm8GZA8zGFYQTr0RrpMYD934iod9GhoQzOcMYlWkMZnRNBtmpAAXKE17biU%2B0kgjKmf7cnUMeHskE6vEBZjFw0whZ5%2Bj0YNsgcEgs3b%2Bsgm4Z33DkK%2Brua7HJWnLpvBewtEvUBrwbrjnHPQbIbywu6mJNKZcJrJ0E9XeTMDknGCbXIicAgyzCYMSlwSe6GFyITgZSYXK5fp9jC5Ug%2FsHDS03ooD5zws8iuVzVnGzgOxSafmzHZxKH1l1MKSCU4YN8ltVLh%2BZEgxw5i5OwuHCaDsoM868UkgNztHKzmKpsr2%2BkKzXGgk0LRWwRbHuTzNlE2BxSthir%2FjGhBgU79nDrZCmcgPz%2BkkfMe8unbA387I6e8H2U9gInTC5p2BEcIQg3OyO6KWh0YMvDWHQalK3VZKeyGoGdAq0pT7Cw8ODA8ZgbAbC%2BsymrV56MGfUMBIDxPPHYLajj3821ILF%2FapK%2F8tcz12CIqpN2Nd1HnFK5x3nbNmUCevhloBCyTVV3KhkW6DEgmv%2FLKvuEMMiNj84GOqUBwUKZrcQlKGXWwSFCFvkMTloOpdMyejkPKySfIgnSYqHAo2yBGs4Xl%2BIYly4YlcwGCo%2BVP99huP4IgwIHa4A6Z%2Bt2yDbDH28E9geqtP4W4rOBYqmfqgs%2B9QC%2F8UayOia%2BEZlJ1EaXpnt7DiVYlymOihxBXM8IOh8K7sKC%2BEvTQvWrYQh7V9x1dydA1vf2h8LC%2F1hMhdFcIK3lMAICVNkQIVUAmGjE&X-Amz-Signature=36815ee0e8b14e9da828e8652c65722969c5e7b3321070e79f6adbd29769caa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XECK66R%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjEm0VL7ac6%2FHpW2Erd%2Fqn221eHf3x8lgjYq2pKsuEFAIgCtZNZKg3ocprMhWQL6yDkkhX0ZRVaSw9Rk3IUPBucbcqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGwHdqD%2BxO%2BPA%2FB%2F5CrcA04a3yiWuvkKxa4SYiAYfnP8LVnMryn5aJuOdPp758%2BgHI0Dgvg5lRjyEEA85nOoWFItZ1YrKIFcW4ePN7xGyHIuHXOBdlDjDalwMstuHpP4m3B%2Fm8GZA8zGFYQTr0RrpMYD934iod9GhoQzOcMYlWkMZnRNBtmpAAXKE17biU%2B0kgjKmf7cnUMeHskE6vEBZjFw0whZ5%2Bj0YNsgcEgs3b%2Bsgm4Z33DkK%2Brua7HJWnLpvBewtEvUBrwbrjnHPQbIbywu6mJNKZcJrJ0E9XeTMDknGCbXIicAgyzCYMSlwSe6GFyITgZSYXK5fp9jC5Ug%2FsHDS03ooD5zws8iuVzVnGzgOxSafmzHZxKH1l1MKSCU4YN8ltVLh%2BZEgxw5i5OwuHCaDsoM868UkgNztHKzmKpsr2%2BkKzXGgk0LRWwRbHuTzNlE2BxSthir%2FjGhBgU79nDrZCmcgPz%2BkkfMe8unbA387I6e8H2U9gInTC5p2BEcIQg3OyO6KWh0YMvDWHQalK3VZKeyGoGdAq0pT7Cw8ODA8ZgbAbC%2BsymrV56MGfUMBIDxPPHYLajj3821ILF%2FapK%2F8tcz12CIqpN2Nd1HnFK5x3nbNmUCevhloBCyTVV3KhkW6DEgmv%2FLKvuEMMiNj84GOqUBwUKZrcQlKGXWwSFCFvkMTloOpdMyejkPKySfIgnSYqHAo2yBGs4Xl%2BIYly4YlcwGCo%2BVP99huP4IgwIHa4A6Z%2Bt2yDbDH28E9geqtP4W4rOBYqmfqgs%2B9QC%2F8UayOia%2BEZlJ1EaXpnt7DiVYlymOihxBXM8IOh8K7sKC%2BEvTQvWrYQh7V9x1dydA1vf2h8LC%2F1hMhdFcIK3lMAICVNkQIVUAmGjE&X-Amz-Signature=36815ee0e8b14e9da828e8652c65722969c5e7b3321070e79f6adbd29769caa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVMYMV3D%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCA7IjcHeIH%2FcvKkQcbkZSfcT5wz9nz3nt2QPNZcbOllAIhAJOGMVLHyUIgs6Wtlk6Lvl%2BBMQwYiazwMxJLBjuYn7K4KogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx3YKIRRLVcurlFkgsq3AN7abNVIwD4PmFKdFZ1OLdZORPDPDHlfRGrtcauwqNL30B9Tgr0%2FtMX5t46m1%2FZFaAwuGWhEgn31Lol24ZoA9gxAixg%2Fccz5lruMh8N%2BrwjjRiCCw%2FEsbM3CMwKw%2F%2Bn9hPoH7d4wVV7N%2Bqcj%2BgRzhAz1hvbACMnC%2B7aR3yaYOzO4s5rJXtDou%2BL%2BHfikEwGIAwAfEn78wV%2FyDzNKusucJytynhiPso9v3LV9D%2FlXr5dXP8zVjbqwof83AyUA3xyPKyLp69%2FZWGN1lk%2Fb4DcBiPfizxsVwh16zIxk6RJYFlaV%2BEou234tgc7uqcIrAcfogFo6ZMIwvoHvNAf3%2FlNaUJ1ieQF4sEweMaanLIVRVnsJa0ytVTdNz9ljFlrd7opmYDFlqakHNC%2B2m9GvMMSB2cvTjuP%2Fku3VGcnK3oMhnXzXhZtBtLjSqyVuuFcapoxUI8%2BABizq1qp7Y1lJcDDKuCfDfL4JPhQ37VyZ6mqGWDhlkLZW8jU2ufnC2C6Mmy1LH3C4Iej9SppaEo8O%2B2dsam%2FORk9GL6tZJYDF%2FpzzvRnrOVX9cNqn939Ki1td%2FmxmQUF8bbhvWMPhFMKaQAIgng7UOudsNKaK2urj82xT0tIaU85MxELCeGGjscmQTCOjo%2FOBjqkAUa2vvuL2wDmRABakG9gOqqJdYqSAKXAh6NgRtt%2BrTyzhRH5P3Kj8jxjWSrVD6Dow4TDmvU0RzCm6i0FnhzZAVu9CwUmYkOASFsBUKIHFjQiTKK8fF%2F1P%2BzY1%2F8Flxd9JiIr5XxKQTkNPeuFivtOijzjNi78NQCChzAZi%2FKmj%2FNrZZ2bu9RHa6SW93rL%2Fbf6ic0dBPYEWgbSfgBjM82kqcKZorvf&X-Amz-Signature=0dadb8e5582578a98c014be76b7f5b3a3ae2080cc7949ff7a4ddf8e2242c17ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6XH5727%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGl7qL%2FR9mNicHEpBhi3iqrtuBPfZOEMghm405txOKafAiA7JtWg2JqAl4jjlt9fxxP0Dw2Snhkg1jqzxv%2F%2FZugNPiqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtpA1J1QLaUxpBuvOKtwD9%2BY43Yy%2FJSAtaGSS1qRJckIttzidf2CqgjZspC%2Fztmbrd2cYmsvofp8ZM4pneHGWBvCQP3McYi1FC%2FsxeKXxtnWVkNM8rUFlgYvathcOxq0Yhi3TN4heLViTIDptG4e4GdVnwcKH5h3Pt%2B%2B3E%2FauMpNySxIX7okYr5QegUL8uFp0JFPYhDvanZQ2cdyi2rMGE1hR%2FeGkfQHf706scf0YggB5QEs%2B83sKJu%2FABMUXfYTEsmStE1sYwVgKZaOVVdrT7PUBA4lCSE7HhwmtUqKVkh1E8jLkBwG1tFuUj9XUOXRUjdL7O6g2brUJGpQGqWzuIHHGAWRV7EkdiIjJfp7uMLZKLTwTRMq0GXPf54j2nmA8efLeC9JDgvHJyNbhW02AEWUT0whuyQJN%2Bt9pu87DGQH%2BHIJarG4PTlkj3OQylli81YwvS4kH1Y7OQYN6F7bwF5xaCwpDGNvSSLKP7%2FUGgmX%2Bnp3Nz8HcY2JSuSEw30f3hp3vqjM8%2FEUXDMcmZZcQqGSa496eWiRfsJeWPXnI1VXs56%2FK3Fp2rNZRjTAIUrRNrfNb1OuyFZvj2hVDKU3PLaX3HPMC4bpimWj4tZycD4da%2BpccAtRUgsRJcRQW83B5wsm5Jjeip9c3SMMwho2PzgY6pgFA3RdFXYbZBNyA%2Bm8I4M7bAx5sCb2SEYBPd3BIxN79puuh7HSiPnew%2BhJfDyu%2Fu6fecGvPi3PEF0DMyT2EN%2BXe1ruvE6%2F6rkZVeWaNXv7ON1%2F96NXMk6HlnKcAYW%2FiBbEHRK%2BLqtwsa4zPOsk3SYCqp5QM3uqXG1QyLnL2CMdU7dE2vjTidbzmX6%2FMKQ%2BvCQFman4CC3QH7nEAmgnnRbnj3dTykenB&X-Amz-Signature=28bc57be97faf8ac38a384d19a80921154782eec93e1739f309628437897010d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6XH5727%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGl7qL%2FR9mNicHEpBhi3iqrtuBPfZOEMghm405txOKafAiA7JtWg2JqAl4jjlt9fxxP0Dw2Snhkg1jqzxv%2F%2FZugNPiqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtpA1J1QLaUxpBuvOKtwD9%2BY43Yy%2FJSAtaGSS1qRJckIttzidf2CqgjZspC%2Fztmbrd2cYmsvofp8ZM4pneHGWBvCQP3McYi1FC%2FsxeKXxtnWVkNM8rUFlgYvathcOxq0Yhi3TN4heLViTIDptG4e4GdVnwcKH5h3Pt%2B%2B3E%2FauMpNySxIX7okYr5QegUL8uFp0JFPYhDvanZQ2cdyi2rMGE1hR%2FeGkfQHf706scf0YggB5QEs%2B83sKJu%2FABMUXfYTEsmStE1sYwVgKZaOVVdrT7PUBA4lCSE7HhwmtUqKVkh1E8jLkBwG1tFuUj9XUOXRUjdL7O6g2brUJGpQGqWzuIHHGAWRV7EkdiIjJfp7uMLZKLTwTRMq0GXPf54j2nmA8efLeC9JDgvHJyNbhW02AEWUT0whuyQJN%2Bt9pu87DGQH%2BHIJarG4PTlkj3OQylli81YwvS4kH1Y7OQYN6F7bwF5xaCwpDGNvSSLKP7%2FUGgmX%2Bnp3Nz8HcY2JSuSEw30f3hp3vqjM8%2FEUXDMcmZZcQqGSa496eWiRfsJeWPXnI1VXs56%2FK3Fp2rNZRjTAIUrRNrfNb1OuyFZvj2hVDKU3PLaX3HPMC4bpimWj4tZycD4da%2BpccAtRUgsRJcRQW83B5wsm5Jjeip9c3SMMwho2PzgY6pgFA3RdFXYbZBNyA%2Bm8I4M7bAx5sCb2SEYBPd3BIxN79puuh7HSiPnew%2BhJfDyu%2Fu6fecGvPi3PEF0DMyT2EN%2BXe1ruvE6%2F6rkZVeWaNXv7ON1%2F96NXMk6HlnKcAYW%2FiBbEHRK%2BLqtwsa4zPOsk3SYCqp5QM3uqXG1QyLnL2CMdU7dE2vjTidbzmX6%2FMKQ%2BvCQFman4CC3QH7nEAmgnnRbnj3dTykenB&X-Amz-Signature=1b3743ba6106f5b2f708c732b3576dc43451e2af06e1aa787e58922aa10ea6ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2JCB5LB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDMZvcLvGPJX4o5dpti7B5%2BsoGQ0OLOvwq3ltznBkoG0QIhAOq2qkcF1X6PwLu8ctjfTJoSfEHh5bxYZRUnDToOl8r%2BKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKYWoLtx3PpWEfzX4q3AMtV0qs%2BcHP4SMfy3wUE8BrapO5k0PGyZTqGz7Y9yksLgEO1zA7qoWHePt8GHEC3n5Ic8yjc5Zj6cywQ4RVSPTjnbFOrpgwOfWXbsDJi6gGtQH2CbHKDxLQvP1euWQNDq3KeaIednO1fmM9jp5chfxoYLJ252vJVTJuddTK4TG0XqXFiaGeIJ2B8z0Ps4TTipgSTqjSF3ur58TWQ8dSrs0jYUVJiUa2FxXpsOsZfODAdtbnma3HBDreeS1rV3HYYQHB92h7MJUxGqEQx3kavMDd0XFrdBKXNSQRG2lxjimCXEcOKW1Spz1mF%2FShgDDSBUWBMttMZkLanIScSmFJu6HfJisSpQdFLYjPc4hoXT%2BBAb%2FKxGr2kFsEZ87eD5n%2FpI9f2Ol7W%2FxEm5dqqqnV%2BYsK7UZbxHJ7QWujMixxJFWkOunDdAx%2BpdZF37vNlD6DvN%2BZOixanUEV4iN0YAvvT4MavRFVeu7tJwic15KrZvBrXwVKe68oAklTeejyL70ScPN7Bf%2Ffp798cdAgHlMTkMlnPE5gwwE%2BQoe9n0DJdP2YtJ77ejq0xf7%2Bbx5hawtg4WBgzpSS%2Bw1K1nJdCgPfi4T5nD1USUuNFlWlyTAy3qkfH1vqeRKYPhCMLOSGaDCDjY%2FOBjqkAdfe3zn%2B18TWMQw%2Fnj%2BzQt0zrd33K%2FwUUMaBKySCmnbBWNfmee0b1QrfiaMk7NwLo%2F5yS9yEr8W3IwlsIswEtreUvKFE0Kb0yjfY2xHTqZz%2BGl17Gr8%2F3VM6Dqc6xvRvskeEfXDgVpEWlo13iCd7C3qgCNZtX0NKnkEt2vXnUvftz5EKtR2U3M%2BcGEbqm74Y6mxGcHJUuxT1dBkfJsFULgYmi5tG&X-Amz-Signature=1736ebd2d1629c8c9253d9dec0d07109190c13d7933c84bdcf836327f9729a12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMHU7C7R%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGdUrmvXmFVq92v9wE3PsWIbOVsy3vJcfGgVS0zdWexoAiEAxs3KESioEmMyUz3PTObnPygO40ovnpTOXNJnjGLEKlgqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLd565e%2BAMYBc%2BmAuCrcA4sQ6Kbh2NFu%2Ftw4wsFFvpSHzeyAlEO2oYXekr%2BnEqUKYi4Vj3bimj7JfvT%2BB5t67kq%2BxWKXLlTaH5dPXxjGxMT1O4avvOUwe6zYuoKBsnDUW%2F%2BL3SvESsC92wxNKkYRXTOvw6BKbLfz4ayoERMx0MOlomHMf3yOVmRPemAkkk0MH1gBg57XkuT3PaBGQL14adJTSx5OnRK6%2B94N7KCXpQ0DgJW9O%2FuOvgFEXTzdnPxerGuMgFr7y67fG3navHDkhoFaaWKh4SLCOu6urE4QRzsafSAg9yQHNS5cMkrTFAMhRMZ9b9HrIyKH%2FCExk2GNVATflGReFDzYwMvGxREe8ZxoS%2Bn044eoB0kqxLtYtry2l3FUDoaf5Z6UssPUsloUgQo6eVMg6E3c6w43vNiVB5GGomGpobjls%2BAl57kFj0K9kT%2Br2MXUc6TtyJ%2F8ajZWuqsSeJQcpf%2BTl1CE5RYmAZSp3FUZgYBReSiPbgGRYLsWEyMBAzKCS8KVVr4QZ9SNbMqiUVHnN%2FsXLT1C%2FRvFKzNraye0QMqHPapOfnAvzNSbcUciCCPpcoVVJQyivfd2Y0yM3c%2BamWQYYPe7xLliuCHrpQe0O%2FnML64E04UQ0GBcFM75rp1q5HCKHs%2B0MJaNj84GOqUBJS%2B0Jr%2BStnUQaeAq7IVLYDd96PYfitrMeFAHZLYNWBV1fD7l%2FBNFmRI1V8vTkFGxc1Ma13vxrVGZJvy1GJKbysFcEcOoD3eXt2z%2B8kS2AYWxGmFj%2FVPhR5Cv5rpHQddgnNSUH9vokQcJA53HUW4QNf4hu205V%2BUCybSBXUzrZuWUR9JSMlHLxJp7uThplHAEj4A6yChoWQuQGMC%2BXr0PulphbvQg&X-Amz-Signature=5422936aefcfc6b1a6c08035c0d1f3f0c0c6e02b4504d8883a28a1fb1ac813ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYJE4P3H%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBmX8ez7fRoMxZwf8Ux4v6kVe4RhWIIaa02sTvQDPbwdAiAacZfLjAs0m9sF2SAE2fG%2FeLPjU8PuTEfEMIFb%2FZSfJiqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMD9qVzfu0z2VKczwWKtwDc0roTxE7EXUZnYeEmxmpPYa0MeEZV61zcS9F%2FHyI4HAxBhmuWgmPmXb97dgkcCNiOKtmBaeShGwBbxd7GO1XAUH9Q%2FLAK7aZo5DTljA1meh%2FMnqpN2D3Y9fs3LGF%2FtYUKziFXUw2xhtm2SaS9PsHAiITig8u%2FnOtYyw79KHE6u5PlPYub6hKexvtMtXdkxVs%2B8GPdwOdmzZj23kBs9sWUTnehpehSndxCCOAQOibPDlQChqD0ridQmFsvkW9QIg5B35hMwRa%2Fgv8QeN08hf3m854EpkwhjWL0ThErCOf02h5ZGrLbclryuMSYp1HjOHFXjQ67LWAgSkCBv3rljErXwFZCbbWunBpjpb1wA7kk5F%2Be8cVX3w%2BvVWo%2BnViOG5xDXiKQO743FLjmRhaEXIJjhFoCqRblVn2vGy%2F4Exwpv%2BLi%2B7TYfhygB04W0eBYMgEKcA%2B0LXdunUWpqWosMq8fe3biDu%2B9zlpfcy8T6bPZNOHfSxMOPnu%2BtDB0tIe3PVnAbPHoz8LqaT32N4zhJI%2BXMWaQbAsKFYXdDGUsYoimRSqscxuAHNrVvYeUzZ4abp%2Bq7kWlvqVjgAH7GHEjMONyFMaD9afmQkxeRLCeksTn5hbdZCUv9icR8QDXaAwsY2PzgY6pgEC836wg6FK%2F%2FBre1RLYq807x%2FTzwo6T63jtsjbPExRdfM14sNVX8fMFvJcXf6nmx0pIAgcbp1Om%2FglnppDaAZ3hcTamcEmO%2BEMD9YnMT2JgKNVBZIgm6hpkC8LqY0lijVbgcTaPR5GdrVUTvsPlcAKjOAqDDlEQJEBiuEEQcHkUUtCAKxMdYSKXul4KxDg18CzJTtMCuhWxAiQIYaXNCUlEtL4btQ4&X-Amz-Signature=3784ea8a4c6c5f7d5b84c4d41b3993f4b9f7eef3e76b580a6ce022180e58cee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XX5DOQH%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLq6ztuTGiU6qTkFXxeLOhsuE2B5XunQE5zf77V5x%2F1AIhAOznLX2an6Md2AlNpnoq4gSm2j4h90rMLAy02oze0cSEKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzjOwVxWTGQ1On985Mq3AOFSLd5OnH3d%2Ff1cuMrBCO0tp1aW7b0gUSowMIGIsz%2B4R686y5K8MZrjjO5WW5bgdM0k3R2FTXeRnPna8hfN%2Bz5u8SY5mwr%2FuwFsJ4mzM2zPIjguY21%2FJ304Q5Rb4kGSKsZH%2BiG%2F%2BZqqFswynay7WnV3H66mvBthW1Za%2BfoN7hyST1XEu8eU7tdINDh3X3kc3Mlk1HumkFxMhY0t5Z%2FNt7OIpwIPYmGoCXwhLtXWqkWsa04h61Q3E2vw8StU4xCSvSNYYUD3WmlB21daC0%2FpzcJTNn6laYvxjiOd2eSWYm7Zyresd6WlnV3ixuRJipARFvJdYWuv3qysHgufD3pUdsyB4bgunhnY6R44BMjtN3VpGLSj09uSbtkg6F17qrD9T0wZ0QxVfp9y8B6sB%2FNwFbC15dKhaIg898Kw8KPpMpJqHdhkyctEwqXneZrnkOgqhF86vmUjRuBDI%2B8Kvm8h6TaKdoayqaaCEFVVboAuPWfVJ6ObmlA0ywLCj0uOyVIvnTZdwIv85iaihXlJIRUsj3bwiZUIr4M42YNfeALozZAPJZuu7DKpZnck%2Bb%2FQwmM5eHkvhnMuFwpHn8ibrEKo9x730SUhB3SmeMzVkeYyPczyjGoiFJP%2B%2B4eXpG8QDCOjo%2FOBjqkAQA2fxF6EuJl31L70sIgEAvU%2FmgesSVpn4bn30roSFejcRQvtrMEBmTL%2Frk9BQiFP1%2BTlXnUxzIa%2FH1DscrAB9W9tHQMNBnnUqbN88EhOp8mT7s4pw7bzZ3hoPUzDK7frIfZDVeKx57Xc8oVaMpNXT1vxyNzydRwARZjpUvsrBPpmpRgvcS431L3TKK7SKufHSe0qL5pAya9clLbVbSn9n2Vvf%2Fk&X-Amz-Signature=601034844baff1a21903b7b850c5f3ab7a52ac6353956b5c6df23e93e20d7793&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XX5DOQH%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLq6ztuTGiU6qTkFXxeLOhsuE2B5XunQE5zf77V5x%2F1AIhAOznLX2an6Md2AlNpnoq4gSm2j4h90rMLAy02oze0cSEKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzjOwVxWTGQ1On985Mq3AOFSLd5OnH3d%2Ff1cuMrBCO0tp1aW7b0gUSowMIGIsz%2B4R686y5K8MZrjjO5WW5bgdM0k3R2FTXeRnPna8hfN%2Bz5u8SY5mwr%2FuwFsJ4mzM2zPIjguY21%2FJ304Q5Rb4kGSKsZH%2BiG%2F%2BZqqFswynay7WnV3H66mvBthW1Za%2BfoN7hyST1XEu8eU7tdINDh3X3kc3Mlk1HumkFxMhY0t5Z%2FNt7OIpwIPYmGoCXwhLtXWqkWsa04h61Q3E2vw8StU4xCSvSNYYUD3WmlB21daC0%2FpzcJTNn6laYvxjiOd2eSWYm7Zyresd6WlnV3ixuRJipARFvJdYWuv3qysHgufD3pUdsyB4bgunhnY6R44BMjtN3VpGLSj09uSbtkg6F17qrD9T0wZ0QxVfp9y8B6sB%2FNwFbC15dKhaIg898Kw8KPpMpJqHdhkyctEwqXneZrnkOgqhF86vmUjRuBDI%2B8Kvm8h6TaKdoayqaaCEFVVboAuPWfVJ6ObmlA0ywLCj0uOyVIvnTZdwIv85iaihXlJIRUsj3bwiZUIr4M42YNfeALozZAPJZuu7DKpZnck%2Bb%2FQwmM5eHkvhnMuFwpHn8ibrEKo9x730SUhB3SmeMzVkeYyPczyjGoiFJP%2B%2B4eXpG8QDCOjo%2FOBjqkAQA2fxF6EuJl31L70sIgEAvU%2FmgesSVpn4bn30roSFejcRQvtrMEBmTL%2Frk9BQiFP1%2BTlXnUxzIa%2FH1DscrAB9W9tHQMNBnnUqbN88EhOp8mT7s4pw7bzZ3hoPUzDK7frIfZDVeKx57Xc8oVaMpNXT1vxyNzydRwARZjpUvsrBPpmpRgvcS431L3TKK7SKufHSe0qL5pAya9clLbVbSn9n2Vvf%2Fk&X-Amz-Signature=628eedc9a4f2d6db18e8961821b3d1b55a8dff10766b190d9768bf726b868462&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDWUCWAF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG524M73t0wEd3oI%2BA6UQe9KmgyRZ9C1ClsXl1SLIG55AiEAv8vW2iMqZl9qAMcnC9AjlrEOEoRoX8IY%2FpXMnbM0eYwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEsTaG9ShySM%2Fdb7zCrcAwGmHB0NglxjJel8rkEFDNZ6kxK6kXqKNG6s7ZGaf%2BRKF0rC%2FgB3O3VKvHgXhRuKkQZtN6wkC98BmhkmqJkp0jwikkWDKMxbNEQLG4DBfEieRTYxjzcnsN2ApZK2cQMaGiTKtpd9KshAQcGar8adv8PtVKecyS4UWi6MJSL2INH1zW99PuoLHRNwaK4EFWT14qPmeFJ81PDeyygFvXcID22JXtkWz6%2FcLPlyk%2B%2Bb5mDtO9o2osZqtjoeN%2B56KGfRUz1J13xaxrwMmJGPZGY8GxiR5nPAeL3t4SFy5Wz71uqiSTXBO99zKZq949HkkB4Gn7H%2FQKNiKeIz%2Fkp8NCWB7X2BfOsCYxnSrdL9jORmvdh9PiZgjGXEk1qqED9G4E5QBSJXUUJJS6%2F8yDCJYWRFn6%2FUwwNctqUT8Wrx97TuRNAiK4Jyj8xHQ0%2FxgPYPhQ9YeFmEKPtwfdXym7rzfuz8R1e4h78DIh4Uj4REarpOPvj5p02ZH9Dxx2K6xcUt2gkn%2FdPlFsnjzrBzIqd6LHWIf0qJu9H2vIwm05TbK9hD9lg9MpFoyNd8cYBNIyd3DVxJImrI5rFCiRlVjhkYMqVxXxVeUIPo6aQ5KOxxT1RJ4m0zbcsPu35Z%2BXrKm2HaMKafj84GOqUBrdi4B4yRXyd0ddrEoErJvjUk0XTD1B1%2BEz3dI1rxaV8MvLW%2Byh1vVtdLXOh6J4zchbomRW96XzFHPzUA6MkE7X5pw1yp5cH0pZxUfL0E3M%2FrPBH9%2BCN0p%2Bhk2Tv%2BQ1Lp1H8jQ4MMMfS4ahKStUnDOzi7x4u3%2B%2F%2Bqsua9JnLly7OQkXMkqKL5iFOYQYZF8A5vzSf0%2F2hW3zULBRRFMXvzX5JfkxT0&X-Amz-Signature=13b32f5f8d5aab56253dfc326e9ac83fb46623c0bdaa18427f47402b82ee1fa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNNJZQHY%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG2c1f5GpGFmYZ8Z6%2BSG482RAAwFNR7vLuFURASOMHyOAiBsog5McHe3CVBU8d%2BVEIShMbw9NrRkV7hf71hx3Al9kCqIBAis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAmhSpK%2Fd7XwMAcsoKtwDoaWnFUfUSrAlI6heDCz3EzPXomw86TRI5zewOK7ief9gEOSdqG1UpDwl4gzXehWOjVyK1OapNjl8cbRA6S9qTRe3v7aeDLOVqrX93cvL0QBoQ7%2FFLqINvXw5PUlo8o%2B2pWgcechyWTSpjKZNCnPflZ8vbkoNWIXXNCiwjYPQf1T9U8epIymJDaYot8lcj4DRgH3qhOpPD0sRemr350UjGE297ZtSCPQ3MHm%2FUChMEYme39jVO6ibvf7oNP0laVtE4MUbPazlG7txIlyxOyRrVqh%2BQmshpqsje40tfDy86uIQqUdsx3O0XWeTOYxsBNlE5WNL3q2%2BIuQw85RYYN3zxhPohjpAE%2Fhl93qPynm3hEg6XHb9Pf9kMneTawsipiwtr7keDIKm2gLeCIcAbZ0oxOQ8EkwT1rSAtoHwZ0zaEszOBVboxOIgfo%2FQRefPo1VU88j2UDMMXZbwSXe56ygQX8Z1I%2FsUiHNXmq8xe9q3cEsHvXAhtUjOYZn%2Bn13F2mPom%2B8DfKtYLKkZpbdX366%2Fdd3Nt6PIvJLlSgL6rLJ5Z8DbIIWMZcoJfd6LN6xwKmuZbomaqgtuB4g6wlp5TB1y0WuKQFJuG6jNvObwC5EEIuxCrvrzQgDYe9Uvwtgw1YyPzgY6pgHvgPqLI5OhxG2L0nc1rD9sYh5Rnxj3G%2F83GAwQm65VKEe6ejKl0B6mY6BlSACyecgt07iwDk16vleJ%2BL92B1qHfjx1INv%2BdJ9XVKSgQ9RCgrmUIRn%2Fg%2B5hYbh9W%2Bp6lhcWOx5Mkh8N73DnuO4V7H1AnB93ANJ34VEmhV1aJtfwHO8Uj33HXBg2M1adCwBd7CVTs0EEW4LlNZyH2WH%2FfnqwEOvBDfGo&X-Amz-Signature=90279952b20e42c4ea48bb043fc0af528d5e57a7035652fc1c8dddb704dc12c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNNJZQHY%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG2c1f5GpGFmYZ8Z6%2BSG482RAAwFNR7vLuFURASOMHyOAiBsog5McHe3CVBU8d%2BVEIShMbw9NrRkV7hf71hx3Al9kCqIBAis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAmhSpK%2Fd7XwMAcsoKtwDoaWnFUfUSrAlI6heDCz3EzPXomw86TRI5zewOK7ief9gEOSdqG1UpDwl4gzXehWOjVyK1OapNjl8cbRA6S9qTRe3v7aeDLOVqrX93cvL0QBoQ7%2FFLqINvXw5PUlo8o%2B2pWgcechyWTSpjKZNCnPflZ8vbkoNWIXXNCiwjYPQf1T9U8epIymJDaYot8lcj4DRgH3qhOpPD0sRemr350UjGE297ZtSCPQ3MHm%2FUChMEYme39jVO6ibvf7oNP0laVtE4MUbPazlG7txIlyxOyRrVqh%2BQmshpqsje40tfDy86uIQqUdsx3O0XWeTOYxsBNlE5WNL3q2%2BIuQw85RYYN3zxhPohjpAE%2Fhl93qPynm3hEg6XHb9Pf9kMneTawsipiwtr7keDIKm2gLeCIcAbZ0oxOQ8EkwT1rSAtoHwZ0zaEszOBVboxOIgfo%2FQRefPo1VU88j2UDMMXZbwSXe56ygQX8Z1I%2FsUiHNXmq8xe9q3cEsHvXAhtUjOYZn%2Bn13F2mPom%2B8DfKtYLKkZpbdX366%2Fdd3Nt6PIvJLlSgL6rLJ5Z8DbIIWMZcoJfd6LN6xwKmuZbomaqgtuB4g6wlp5TB1y0WuKQFJuG6jNvObwC5EEIuxCrvrzQgDYe9Uvwtgw1YyPzgY6pgHvgPqLI5OhxG2L0nc1rD9sYh5Rnxj3G%2F83GAwQm65VKEe6ejKl0B6mY6BlSACyecgt07iwDk16vleJ%2BL92B1qHfjx1INv%2BdJ9XVKSgQ9RCgrmUIRn%2Fg%2B5hYbh9W%2Bp6lhcWOx5Mkh8N73DnuO4V7H1AnB93ANJ34VEmhV1aJtfwHO8Uj33HXBg2M1adCwBd7CVTs0EEW4LlNZyH2WH%2FfnqwEOvBDfGo&X-Amz-Signature=90279952b20e42c4ea48bb043fc0af528d5e57a7035652fc1c8dddb704dc12c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ELFXV2N%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T123519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDpJ%2FChiecV9NmvcIt6NodKyGHYzwY0mfsYpAdF858M7wIgasGxrBGs2MYsQ5BW1utpMAu2St4qpXlvD40XYg5lxHEqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNvzIT6uzci6MAfTQSrcA1VVf8p0x5SzGbuGwCylvZTUB44%2BYVEn%2FwMCQK8RbI%2F0da32fUws9wrc0lyee326otfKiIDI8GHUytpq9lpFvP7qE9kZ%2B37oG5%2Fwx0S8ZI1zPzwDnDTZPrq1DOr1QzXjkqMOloellmic2FWze2ZjwT8FJCcsQOi9PzUOO7DDgbTdGbC%2Fa%2BivJM%2Fi1tTMQkUF37Y%2BcnkKbyiH%2BISBLTu5KhBSsbEt%2Fh5QxFYkacB%2Fb4Fkxi6GM4YWV50hTw7Cnawu0MDvnllyGVpRw9%2FvRtYnqkwGLqt3u%2FRE74EzevKXzXjGmTKa%2BQErnxVJ49P79e%2F3itePt20YC86TYs6AhOZhGZzsKAo%2FFmFiEg3i3YRErN1IvgIrBWXYIy%2F9WL42mkLMBNN%2BYYZYvPNiH9rZa5EuP9C5bTYBy08KbjmMwYnt7QZrRh6VJuYQ%2BlAsgxjaKgUluGjzyI0tCyypcLz%2BWm8iKBvpL%2FuElrb1I3yuJ7T2txioO3IUe0UO7o1yYvoS6JF5mXTogHRpG5TtAvW8FclwOT3XUl%2FKlRAqB3MrnUTkfEy51PhysuprW8YA4HxiLsN%2B1jJqx8qy1vP4Ip47OPSjoz%2FGdfkpBdjZjrutSQj2dcq%2FCcDeo65OqbNe60jaMLaMj84GOqUBpQXjSyojNFQkHWEW9dB1Kq0YWBCpQVzyipwcVoLqCuxHKnOovR5UqWZDIrClg8yEzqF6ZkGG0EI3V8v7ErYaXsJwvMaJ9CDAiGdslUtAcumupX3bh6AdN3OKjsxhJrcF22m4p5WsEZG298FBzCetUcF5G%2FXr8XlrMF%2FAJdg71GnXnyxH6QbJLGkNehBOWXqo674WLNHC1k6Jx0Beon%2FEF%2BIPKuZ6&X-Amz-Signature=1db21b95e9519e1fc623fac015b8fc27bb3101828926a35ac661d25f37a162c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

