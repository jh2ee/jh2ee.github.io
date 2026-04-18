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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQB7QIKF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDD7j%2BNRTAGmuklufjpAXIYrAwn2lSR8oYu%2BVVmis4g8AIgRxUowy5%2BPgXHrViC4TXvI2L8U%2BUJ4Z9HfbLo6SkpU6AqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPg20R4FMJbsUdOzWSrcA1qW8QbX4qDWcn%2BeBq1faWIMNsmVN0sjDdPoGgzGk0toMaBjy60AwWnhtD9xIyhplh%2FJ2XOOLmMHQkaQ8AIYWQo%2FHqeGfinV2PvqTX2Zdgjw94e5UtC70W8LdMY0bidAoFKvLEoDV03nySJDx2rj%2Bs6AEyU688ocPF9%2BZBR8ls%2F6UqSrrnN8LMZKRQzevvTfvHT09TKq0astkOy26JnBKktA%2BJWXJLjoRj5pWNlA85xttMkxIPVPk3SP6X8CqWW8FUDDNYa0jCF0bJsSKmCThrIZH190RpraxB1MH44jC5lM9tsa7Lun6Y1Gp8%2BjKNtzD%2BMWg%2BhShxBvTj90VgpGxUnOlb3w12xusyS9AzGqGDGMMA79ciq8GnDAQS%2FxMgBkhwNwHZuUueKtjJoPEYF4i%2BJuce56jZDsZAp7fZq01iZokHqp1cqRsLix3z4539R%2FuL5dynUqLmQLV7LOhTDeeLo4hrGq9tph9CgSxpbx%2FGuZ0vMVuB6dUY6nBNIt%2BjLTM6gKrbeSE%2Fria2Gs%2BF3c%2BQve1qwrwc3w0AY7xlsabtFAd1ZEKmEwVjKuFPRkanz4O9E9WzkXGitFtoAPRPeqyCWNY9yjuVow47MXJ8jpF9WRlaFjg8iwRZre7fWJMNrhjM8GOqUBU9D5n3LOeqsmQ%2Bl8IvHw6P5uEOTIuc2yPqrrKSmwkbEQRN9gCZ2xAVSh8MFFJavc6cTon7WUBThC%2BI%2FgmpLwIOk5nm3bJJk3p%2B%2FcSnxRYbOg8krjAjfYfnRwg7CDCIOB7KyeyxX9UWBFamfVkUR3S2C1S4FC60mUNisTeZTEHeylwNWKYsO2p%2FIiqg%2BQqMj28GVqvf9WQOOB0dhBxK%2Fe%2FQhcB5MV&X-Amz-Signature=56dd1193084701f3d1cb4ed7d193fac5cba75415333bfd8067caa4253ad28534&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQB7QIKF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDD7j%2BNRTAGmuklufjpAXIYrAwn2lSR8oYu%2BVVmis4g8AIgRxUowy5%2BPgXHrViC4TXvI2L8U%2BUJ4Z9HfbLo6SkpU6AqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPg20R4FMJbsUdOzWSrcA1qW8QbX4qDWcn%2BeBq1faWIMNsmVN0sjDdPoGgzGk0toMaBjy60AwWnhtD9xIyhplh%2FJ2XOOLmMHQkaQ8AIYWQo%2FHqeGfinV2PvqTX2Zdgjw94e5UtC70W8LdMY0bidAoFKvLEoDV03nySJDx2rj%2Bs6AEyU688ocPF9%2BZBR8ls%2F6UqSrrnN8LMZKRQzevvTfvHT09TKq0astkOy26JnBKktA%2BJWXJLjoRj5pWNlA85xttMkxIPVPk3SP6X8CqWW8FUDDNYa0jCF0bJsSKmCThrIZH190RpraxB1MH44jC5lM9tsa7Lun6Y1Gp8%2BjKNtzD%2BMWg%2BhShxBvTj90VgpGxUnOlb3w12xusyS9AzGqGDGMMA79ciq8GnDAQS%2FxMgBkhwNwHZuUueKtjJoPEYF4i%2BJuce56jZDsZAp7fZq01iZokHqp1cqRsLix3z4539R%2FuL5dynUqLmQLV7LOhTDeeLo4hrGq9tph9CgSxpbx%2FGuZ0vMVuB6dUY6nBNIt%2BjLTM6gKrbeSE%2Fria2Gs%2BF3c%2BQve1qwrwc3w0AY7xlsabtFAd1ZEKmEwVjKuFPRkanz4O9E9WzkXGitFtoAPRPeqyCWNY9yjuVow47MXJ8jpF9WRlaFjg8iwRZre7fWJMNrhjM8GOqUBU9D5n3LOeqsmQ%2Bl8IvHw6P5uEOTIuc2yPqrrKSmwkbEQRN9gCZ2xAVSh8MFFJavc6cTon7WUBThC%2BI%2FgmpLwIOk5nm3bJJk3p%2B%2FcSnxRYbOg8krjAjfYfnRwg7CDCIOB7KyeyxX9UWBFamfVkUR3S2C1S4FC60mUNisTeZTEHeylwNWKYsO2p%2FIiqg%2BQqMj28GVqvf9WQOOB0dhBxK%2Fe%2FQhcB5MV&X-Amz-Signature=56dd1193084701f3d1cb4ed7d193fac5cba75415333bfd8067caa4253ad28534&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PN5OL22%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIGsUEgdGtt%2BFyLann1GBV%2B8M%2FvXU2EKyOq4LIdKdbd5yAiEA%2FVn1KiAmUg%2FSqCSME3ZakVMoYvCX5i8SpYPkILfkPBUqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2BR5CYdr6Qro75FWSrcA4m3pey2DPn9T6dAdpyZ%2FVa9n2YIWw66M3PwxxiQZdYjQDtfz55v5HGeaeCLzO7sIBDZKZt3ZJp4AMSAmgVLppnaGvy35NAeP5ayftNh0b%2Bt93AVKMGD7Z%2F5g88C7d2a9LAJEzv3IVl0%2BEAi9z4ui7t1BWXhQTCxWI0dxxA7O8c4EXWY4ehHYk1kN3pyrQQY9kH4IGHjJy6gpK8rjATfFelg5NZo992MzEoXfLq27o%2FTUX%2FGm6HmJboBKszfsfUzDQwplnde9dyQKES9dMGgCDegeO%2BNZo1kVMdxP77J3PgfbCsfY9gQ0L7E12aHgDv9hONlyiw1bsagRFAKmOOYRNC408WtX7SP19efcWWv9ipdN3xtxurfLrM1oJwjo4OlTsm0XqnhDNkx8wmQqptlJVMmOjAOhQomC6WWUbQOF%2FHIuKNl1sB28dlf1304z7op1IdY%2FPkqT%2FE%2FyAR0N7652Cv47W1eMV%2Bb6iFNPs2j1rMTmNMwZpujucMme2BqztjPvYTvywlBNeYkpVdjP0O2Kmebz2VBzuKaWx1M7%2FM3uG4qhNd4Ffhgs%2FuV2N3v1BCvjC%2BXlIcC6tqNxUSthnEBL5XpOTsj%2B8pMDh%2B47DF%2BoZW43AJD2sqcXcKIXdAiMPTgjM8GOqUB4Ew%2BF4ebA4ylYBcgHUJZoyp2nidIj6JpyizekS7OjKtUD%2F%2FzCdVkdOeyEhYsUmVbln9j4rX4yYAEOGH2Wz88cH6Hlt4%2BXp8gd5FYSv70kUrRs%2BoE1vMA30sm%2FftkvCIQZELLtrJ8FSsoHOAv8eO45K9pLRj6m7f90n3Qdn0u8E4Cv2reig4vEi5MgZYq%2FeyUS%2FLByJ4pWp3XknHB8xcwP6YUIhrr&X-Amz-Signature=ae1e2fe3b99644ac3047365c251b37b23a58e22cdd07bb866fa85e4ba0557aee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPY7CMAP%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQD3idB4eJX54nnqvlAsOhQliQr8nxmt7ULZX77uOYAECgIgSVzKkWOjzHQN1fXAcXoLwDRKMkFY8g8v4lx%2FxCZe8kgqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhNe31y4Aet4IezGyrcA6DjYg%2FhvhNdCGx9TDn4FBT728zle5fNcRa6adPmdZx8PUSRvvngmcqtxc7ZIQLexCeomaUG%2BxnQ9yjvySzTxGg2itlzxWeIzxG37fPKOoCGJj85QpIjDsffLmnnsXgnHKzTpku%2Bs4nSZBGl27%2Fp9hfeJWy2jo71opIc63w1n3MsCOq3HyMgVzKufai25VPgu2%2BhdhleVkwvwh9T0FIKR%2FfdYCXe2nnOs83vC7v74QYlhnQzV%2BMRGZnRI9Qt0E2kCSrhcXtJf%2BE9v8Hzg6CvoKphMGehIIfaE1O6ckcWeuclIMp6VFvB%2FOw2dY37fPQFL9yF%2BQgenXo46iEk4VyoNYefwx7VBZgUp%2FfszMCBuSRrr9DhFgAacmNR0HcnuxQzdpts3KqTRNwdqxlgRx5Q6WBI9BQ6ypt3j9UpePENf%2BA4NI%2FcmcrQjn5yY6TRpLbJtFhiRJNJj4HzugrwVoBBe5DcGUNEnx%2BzXcQR6AG30vxdbDnNjFci42x8kQ%2FfnmSXyDxcokX1xfuP5n7uEEVgglpCUNes0O0NVztT6b2bGFjDyQ1pXimWkp3aPlSHMsMu2IqzdGjDwpHqIdNYsYnbaPCL1zPcpZiQ3Y%2BzsvOw3wRHqFWOVT%2FrxmKiooOTMIjjjM8GOqUBY%2FVovgt79KELgfj2jvbEiAiAdlCIjvF9LLuhnFYscgnKvoPXLB6MhimlFOVSRvfjiqtG5P%2BoWsUP9t98wfYugfmvifpxaK10Ma0nW%2FLAKn0p0PmcFvDHbrIvgpd8D0NFx32hSVaaufQy%2FlCrcMuzjTt%2B6by%2Bd8%2FU0B2YyYN6ivBZZj8Qi94crRLmqVzcKSuHFmhHUglZJFoJVONx478F9KEiZNHf&X-Amz-Signature=2f2579b56f872ceb3d52d1b20c84f8758f01c4380221a4f6c9e2af7a36014ec3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPY7CMAP%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQD3idB4eJX54nnqvlAsOhQliQr8nxmt7ULZX77uOYAECgIgSVzKkWOjzHQN1fXAcXoLwDRKMkFY8g8v4lx%2FxCZe8kgqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhNe31y4Aet4IezGyrcA6DjYg%2FhvhNdCGx9TDn4FBT728zle5fNcRa6adPmdZx8PUSRvvngmcqtxc7ZIQLexCeomaUG%2BxnQ9yjvySzTxGg2itlzxWeIzxG37fPKOoCGJj85QpIjDsffLmnnsXgnHKzTpku%2Bs4nSZBGl27%2Fp9hfeJWy2jo71opIc63w1n3MsCOq3HyMgVzKufai25VPgu2%2BhdhleVkwvwh9T0FIKR%2FfdYCXe2nnOs83vC7v74QYlhnQzV%2BMRGZnRI9Qt0E2kCSrhcXtJf%2BE9v8Hzg6CvoKphMGehIIfaE1O6ckcWeuclIMp6VFvB%2FOw2dY37fPQFL9yF%2BQgenXo46iEk4VyoNYefwx7VBZgUp%2FfszMCBuSRrr9DhFgAacmNR0HcnuxQzdpts3KqTRNwdqxlgRx5Q6WBI9BQ6ypt3j9UpePENf%2BA4NI%2FcmcrQjn5yY6TRpLbJtFhiRJNJj4HzugrwVoBBe5DcGUNEnx%2BzXcQR6AG30vxdbDnNjFci42x8kQ%2FfnmSXyDxcokX1xfuP5n7uEEVgglpCUNes0O0NVztT6b2bGFjDyQ1pXimWkp3aPlSHMsMu2IqzdGjDwpHqIdNYsYnbaPCL1zPcpZiQ3Y%2BzsvOw3wRHqFWOVT%2FrxmKiooOTMIjjjM8GOqUBY%2FVovgt79KELgfj2jvbEiAiAdlCIjvF9LLuhnFYscgnKvoPXLB6MhimlFOVSRvfjiqtG5P%2BoWsUP9t98wfYugfmvifpxaK10Ma0nW%2FLAKn0p0PmcFvDHbrIvgpd8D0NFx32hSVaaufQy%2FlCrcMuzjTt%2B6by%2Bd8%2FU0B2YyYN6ivBZZj8Qi94crRLmqVzcKSuHFmhHUglZJFoJVONx478F9KEiZNHf&X-Amz-Signature=29843fbc50478343ca8e019571a2fc50d2f79262e14f87526182bcb88910299b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HU5HANC%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIBZQa4xdLzftrYhZZpJQSHs02D3tCNxxOXUPtdPWx9DgAiBaKRIMcYaHcujr%2BJoMEJmLbYlysUW5dm%2FJvOGt0fgg1SqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyYerM6gW8d11DbZFKtwDYvAdWjALjYHpjKCw427RNSBQolJzBB%2Fic0KvZfVQqQnwACy2GTQ90UQS79ubOhd3Vp4OBv04qtfy%2Bm2tPfkbJiTvsNgM3I2G8Z7H8EgNukP%2B5ubSG6KKnRB9MLg%2F7uuHVUO4YiAmMTY86B2iFLSA3UnQayen1UvZpB09LZ2s2%2B0bM4E%2Bu9ZwEVr3wJxokTHbABrQKzQ7Sk4xZXWxeyHX%2BKxtDf40%2B39lPlIPIz9ZX93MUosPlixrRp%2B2NzBrkNOu6O4dB0zbIlIIQf40mUu4Szi0Tw0SE%2BOhrs7YWO%2BYvfSGl6c3yta1ivCjqFjUUR4lkgfStiS1CjDYzOvGxoS6TkL4cvoEqad7bGFuKD8Zm9lTSIUSfPOf%2Bo1xpTgEd6wqiUln0YQdPXUvGAUJyyJ77Kx8qP0v7qf2wiMXkEeD2oAtVSQpO5xbbhAkfgw%2BuKKShj7uo41qWU2G1IRKux4ahYT3h9jXSJGO81UV7H5pX4AhKL5LYrZHfp%2BT%2FCKcNSw7cNJ6Fjnlc9zzhiTzS9isuoPhwksz9B4b9pQMYcNPvPkLBD4Uvwb%2B8bSbt%2F3silNzWrsMNP7lGetTh5F26e3HhxNdMpCXGcyL1Dty%2Bqnhzr7Bh3zRp3lYs709Vhww8%2BCMzwY6pgGuRe%2Bz8iloVPcu38h8n34LwRN8%2BYp%2BJffwhV3vZATDvxK7ttvBFsz2ALJ3ZyiFUQ6uPDpo2nQ7SqVYUL3ZvwAjb1VkbO612AFfej4A9wp8m%2BJqfShp9E7aNnDTz1Ysfx2XbfBJJLXZQZOosc6%2BJtfJ03jpmL8PwJFyFlx0xjwPC2hqsGKHbA0NxXSbkAJXwilPdvl4kfe%2F1uyprRzhmhwmPeFjqflT&X-Amz-Signature=12349e73d3bd124410f7a37d71013f6aed82ba351db547828a0d95aede919321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSOY32JZ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCICTnMfh5isKeaqXbaPo4rfzl0sAgnNuwjHgyBzF4QEdSAiBQupTS3kfm0jV3Wq6IwnqTre5PzGoHKAi7zJNw9T2ukCqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMEjDc364Qwr71X%2BwGKtwD4Wy4xEyG15OA5LcBwB6JgsVJduf5llwKPDonFB97ZfpEQQfkfdBE9ymt8Zr74cSLH%2Bhv00pqTYzyu8CZoRQsOBjddTmwXzR0HSsyiIw323VlfVxUBxVFSfw0ERjlNPwdo3Jte8q5ZRuEWb7NJT1MxgbTRHe9dhlaK0sGFDt%2B6fQw4u%2FlePuMgGBRo7DXfi5FSBUlQTdi3EZlhYXU6DJBpYZ%2FwKP5%2FQ1POdrmo8YFDRy8X2XnGf96pnzY3iKEvhEbV9jG3pkyYH0r1WWcDQ7ka0iVSVxbqo2YhjAZTsTzt%2BlDkhwca8DvIughCYoSycFn4lKQu5jizC3BRKrJL%2BD6TQcB9UFkBJlwm8aKYdLDOhQ7t6uA2QFtL%2FmWg8fbwWRFLKoSgz%2BiSGbkDteZj%2F66bFrJvg%2BA%2BAqZw7EcuF0bUeLNQB7o4u3AHq6tzt%2Fz72A1KuNWR16bzeM0WVz8wO%2FfsXNNvXLnc2ReC%2FNNLQ%2BYLTu9arPbNIANxPnULcib2T1hn48ico0vbNikSBqRnU01rJi%2F%2B5TXtl0p%2Biqj%2Fc9rqwf7Qw76n7cpqJyMxB7e5ozKcTpxFpqTw5E7poArwROn8yztCEjJzhsARDc0ljsoiE7%2FwR7DhGzd9IcFIJ0wluKMzwY6pgGxmEBWmbZIUZwLLXaaR9AFSW1dTdNrBTV5lU5A9JUcjkqGNIW79XOBlEONjDPNhMf6u%2BHBq3LMCBFuPOxQnWz0oeVDb16NYk5ga4PHVJbZ5ta2OHWhRqb2vJ1xdKyYxMuinbwzjJd6G1khi%2BmZKlZ%2FjcrsQqqftjPHH44%2B7JjpwhLHTDSvbB4cMRJEbnQMV1SBNyEwKQ1A7icrvrJzPAMVNWkYM2D7&X-Amz-Signature=763b755030b02f7935ae28ad3cd610a9df5e66019b5a8b5cee90193d80a728b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXJOPKG7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIHZLUrZpt04d1iMLNt6WIK%2FRuk6LoA%2FK1x3evazRGYitAiEA9OPLe300L%2BtzvoRykXfp8hAXJTP3p9jlFLILusEQooMqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFR8rpGpVx32BV5yESrcA%2BPaAoFC1z04%2F7cbjRM3sUy3eSU30pLSGDhpH31hYiEIVoqfyb1Ow6lpLxs4p8rIUwA6JR5WA4HEEYEFTEO757G0gcLXlr7hQEIHJZPIfPax8X2C8yweWh6vGbea0N4Ut8ZwAlfnxPKm4FpDo9Vdhj4DmBqc57VIhpoNnblv5ExA5RiCpQogdOy5V1OelaXH34QpnQR9eR2I8hhc3zYnpPupgDkueuBUeXFqSsPMgyxjuUaBUs6u0NXbKcVxSGqs0XBzv2IGeN8ZX7tAItHJWiq59m24tRFDQKiop%2BPbbFUORzeaaQGfQmp%2BqhftiH%2B9sov3eRnqV6ZvaHAWgRp1wbroLqrJubOOk6jwV%2B%2BHY8tgD8%2BEeObZ79TwepevqIsPCIa%2FNV%2F57pRtIieWW89KI1Nphl0GcRl47ecFHBC2yVbKnluqofnPHqFtO1tAXDQSP8nsGciE6Ah0BtRdW7truXihf5U9yh%2FxdfvtMkAh8li3xerVV8uQ1wD1d7PBvkfdvTQ3QOrbKCTXVQMF%2BfHdEhlR1wvWqZpnmO0urHrvq44FWPay6KTNnUEj4kmDuqUi8Myc5JkatFvzVyfK65FihwY%2Blvvzo9ObB6N9yHLnUVpS16BvGmO%2FmIkiPE94MKPhjM8GOqUBDRucLV9ehVqjOiMDTPHqQX9BmfrC5CM5MEJ3wfP8HBg9P1BZjjhZ%2Bg%2Ff9VD2aKVl4QdeydlXcwq57SOjwSC391vI3Mpy0N5nmq0KEdrNeP2mQrX9k%2BLKNDm%2BFhUJeIV9xzMZUJlnTTWgPUNs2OkPOr2%2BM7SnFuCzNNmYqlVmEjQMyq%2BKQlvd58MX5cILzkQ4enQdVDZVIpP%2BfWR%2BtS1v0tgoxbV1&X-Amz-Signature=9aa124b6784b4bdca0f5f7f2214bf7878c277fcf10fade291acadaa1c099af12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YMPRYWX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIBHWnqfuD%2B7%2FxIcw%2BPgrpE3Ml4qSPZm0bAi1ea4lUmJKAiBtgEccil0DlznKZcI85GMfGAgI1URH0ccG5Upi0hYxwiqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQFCZxQWnKfSHZZnfKtwDAE%2F2QgZxagjrN4RCXT59yZWN4qrCBBPIYPANBErZoazWqUdfA3sXo0Atssbnz6SDkCqdWRGVHQ31CTMuoGPkWadwKK%2FJ9AReaOoLccWYsDoQPn26t8%2BoXmwHWAY2KRc%2FrsJsYbJrVH%2BiiYJVkXnA07MYWGhThqbg04LXGOYwqXBI%2FwN2VtMK0i4P1fGc7xUMw5f%2BYwJBj13DDYmAlC0zwjllXvYvepr1zTNAV05IBzl%2Fgro0jIAmqQcephuL7CF2d2Q%2B3oA69FOfMny8%2FVaMtUu1kmw0rOgisJn2H%2F58f3aWJ01hxRs8Z%2FodOPjoT3wf9wb6ZdBX3rq0m0tb9IhlX8iWs9rZzDEH4LCM%2FMmMzPXnHaW0DicVkKXe1thE7Ly%2FXod8fcGEKy2JbzKncZxTh1v41xWXC6kYeF5fZRzok7RQTyB0HTjfY4KpQM4X33O%2BF7RvFRV9SjHnUDZcoipDGIB8kwnJ3Z5cEBfNjtaywhRPyZzU%2Bs3a93tAq%2FCViJH5F8MquHV6FvnAKzmPi9Em2bweDqrTlWuD3tGpbdWtrj55RAxcQJiiK7%2F1H%2Fm5iFRxD0gE%2FxdVc37pf0TRVl4XeP1nTZQ5ptYuXKI3dUK14mtB%2B%2FlmPcGdc5wLo5kww%2BGMzwY6pgH8pKNbdP9mKeKN3WIGCyHG2md7sz1%2BRS81O9iR1BBSEpbdoilKT6f%2B7uemi2i4Kwt6nI3nrlFZostt2ktgaKB6c5A0N6qy9h5NZh3iMpuVdO65bSND5zfQaftEQiI5PgK1FSPPAtrA04MKYgtoRXJQmksvzWhX%2BJ5UB05eQYcxg2FdjFdBwy3BV20w8l6Wg9OrdjFJbxrhK9tIHH%2BdtNUR2r6F9Eei&X-Amz-Signature=b0a12206d8769f32c20144a9821c3b985a604904fe437c8169726b77bd43c4be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YMPRYWX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIBHWnqfuD%2B7%2FxIcw%2BPgrpE3Ml4qSPZm0bAi1ea4lUmJKAiBtgEccil0DlznKZcI85GMfGAgI1URH0ccG5Upi0hYxwiqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQFCZxQWnKfSHZZnfKtwDAE%2F2QgZxagjrN4RCXT59yZWN4qrCBBPIYPANBErZoazWqUdfA3sXo0Atssbnz6SDkCqdWRGVHQ31CTMuoGPkWadwKK%2FJ9AReaOoLccWYsDoQPn26t8%2BoXmwHWAY2KRc%2FrsJsYbJrVH%2BiiYJVkXnA07MYWGhThqbg04LXGOYwqXBI%2FwN2VtMK0i4P1fGc7xUMw5f%2BYwJBj13DDYmAlC0zwjllXvYvepr1zTNAV05IBzl%2Fgro0jIAmqQcephuL7CF2d2Q%2B3oA69FOfMny8%2FVaMtUu1kmw0rOgisJn2H%2F58f3aWJ01hxRs8Z%2FodOPjoT3wf9wb6ZdBX3rq0m0tb9IhlX8iWs9rZzDEH4LCM%2FMmMzPXnHaW0DicVkKXe1thE7Ly%2FXod8fcGEKy2JbzKncZxTh1v41xWXC6kYeF5fZRzok7RQTyB0HTjfY4KpQM4X33O%2BF7RvFRV9SjHnUDZcoipDGIB8kwnJ3Z5cEBfNjtaywhRPyZzU%2Bs3a93tAq%2FCViJH5F8MquHV6FvnAKzmPi9Em2bweDqrTlWuD3tGpbdWtrj55RAxcQJiiK7%2F1H%2Fm5iFRxD0gE%2FxdVc37pf0TRVl4XeP1nTZQ5ptYuXKI3dUK14mtB%2B%2FlmPcGdc5wLo5kww%2BGMzwY6pgH8pKNbdP9mKeKN3WIGCyHG2md7sz1%2BRS81O9iR1BBSEpbdoilKT6f%2B7uemi2i4Kwt6nI3nrlFZostt2ktgaKB6c5A0N6qy9h5NZh3iMpuVdO65bSND5zfQaftEQiI5PgK1FSPPAtrA04MKYgtoRXJQmksvzWhX%2BJ5UB05eQYcxg2FdjFdBwy3BV20w8l6Wg9OrdjFJbxrhK9tIHH%2BdtNUR2r6F9Eei&X-Amz-Signature=4361dedf2eb0364da20055fbec8ebe808bfad17634267462bb7d58996da3769b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFOZNYVG%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFBEtBW9WS8rWqXK7Edu0e2SVAqPqpu6MhMwkCCfM63iAiEAisOC1yLZ9IayiEc0QE%2BtiOMkMuWDwFkHe0I8l2cylJ0qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAsnIBGsdNn8sND%2BircAykK2zWZmV9rnuaUutaWRbSllXCfvh%2BK3cHQGdxc3VxKbeKcxThe6AZgZEYgYkUQK8jN76MpeiRoC2qYdoPBm4JrMXp1IUZUiE5kL7gNv0C4G4LQb6hIeoA5qm%2FO4QFAINI8LIZrudL7HM%2F4IUlp3JzPoOMLWoJ326VyvxfgsG%2Bo5TBQ0JwkDRctz0vdgrcXa%2F0SwVsx5UkkQ1J1%2BaVSAg2XEaUyTQGxh%2BQaUocZrYGk8849lzPnUFwD3JmHdcIxBJv7ysZQ5CPy%2BOsDoBFvs7INPIPej1MrQaqvYq%2BBspgOnj3JW42Rj1tbl1%2BYiAFvxRjieVgmMpE%2Fhiu5tzetlKofyJraKgfJvjJNIm46Pp3bThtHCUL1gHrlWYC%2FDpBhtO8lfMlnU%2F7K0YeagjmGFbd4rnisG3ruHnFgrqo6xh2AJZwcEnLh7XZvGAnlksnq4%2BGY0xGGvS5B1RtL61bEkp%2B0zldz4LzDYuD6WFoh7H%2F%2BPDETKCGpsEgbw3Cm9aUJJ8DqzC%2BwYO6T1PzM1QWSkF9dkCpizuZjnF7qLd1TC9CeovFPi%2FXJ%2FR7Ab53R2NId5xZcdzhrUsaaW9Pwbvj8DL3%2BIQV62hMYcMBPhuPs41Bi%2BZa69gFWQOsXeSKWMPzhjM8GOqUBePWmUeWhF04WZvXZgt7yH%2FT3UmxskRXMHEyhrvTvccVIohPIupDe33xHRiuGwo3SRtLNJhsw5DUeWQhFq%2FIDUUfbquuzI2Ncxj4OBwfafFjCi6K9oqry9bWBxXIXvaztftijaN4NWEG1lxXjxCmqWTCY2YztHBXDDSAJ%2BBu41bHKiplKZX9SPNGGQGAM66e8up%2Bkx1lKXojEITLecWIq6EHGcR88&X-Amz-Signature=7e74bb00e547c121e44427ce36d6cad3d43d56510d08762e0d7ed120dede6953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMKHBVMW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFltwuz0xSRu1TT7%2FlAAiqaPmMiXQDZvUrGwgauLk%2FZQAiEA5eNcxYFBRIpYI10DMMverNUs3lFJWqCi8WDOooTe%2BbkqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDyewQNsEXLwtN0tMircA9uiBgRAyzZY0m3qpbfPVq1MHjZLAgOhzrzYX49nAkZJJqQ%2FWFlJOhMWbDCtq%2FWd2jWNeqKsmx0bT6wYkULNn0YoYAHhN0R1Zx7G9RH6blY7dAXN566MkG9H2ycOKkH%2Bvl3OolMD%2BFU0pctkOiB1%2BeJ0KGhxKda%2FIdEpu3PudY2RA6UrzFCqmw1Y2jvQCer1kfcDXCX7CBHc3yNoIi%2BQfygK6ICyUWoocgJPvVoTW0A8OeDhV23aVDKXYuDtLYLG%2FSYaBIs7I3GqjsBAKf9liuBNzoMgBkvy6huri%2FZyc5Z9O8hr5%2FXTFBfuNHRBsXYgdI9k8Zz0DysQByhbEDj0BoL4POLWx4X6vIOCOoWRCNiAK8QAF16bKt7GE62iTHCl6Ulh9iwwGa0dhVp1jcssdlcZQkLhc6OY6IeX1mRdP%2BGmwuW%2BW8DLACYNbMezv%2FiI%2Ft8Ehjo5TSw60MtHyp74YsZsjT4ExfAuoOu%2F3c0rt823oGNQ3JvqRgYzwkm6Qrr0lrYLZindz8%2FnLKb3lRPaOPhhGIVL8LkLPUjuI4O5bJtzvkcdBcnUtkW2iCBNbIj%2F1Re6FgoqTyj6ddvB7JgGFigA1XDY3doadrsgxRHV4l4SNShBpnegFzXTrs5nMIfjjM8GOqUBbB3VPA8bxIoYtk%2FwgoCPPa%2FhP1Oudc6US7ovZvsYwo%2FbeIsMAfcz%2FL9%2B2pKTwiGJr4nBOBwNavEbR%2BgWAp3s0EZjmVWYAwTy0dTZaDtOt7O8qzMZ0o1jJvAGk1cxXhoBM3hBik3kuviOxJY8bwX6a%2BM5HnbX0YSMeps6It%2BstxBqV6qhvt2sAgMvrbVuStWZKLUWUtE%2F8PJ%2Bje2zPfXyQzS1xw01&X-Amz-Signature=5a0217ff1d6c3655347f786a334fb30337cff4ecd42b90af40d7319dded72253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMKHBVMW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFltwuz0xSRu1TT7%2FlAAiqaPmMiXQDZvUrGwgauLk%2FZQAiEA5eNcxYFBRIpYI10DMMverNUs3lFJWqCi8WDOooTe%2BbkqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDyewQNsEXLwtN0tMircA9uiBgRAyzZY0m3qpbfPVq1MHjZLAgOhzrzYX49nAkZJJqQ%2FWFlJOhMWbDCtq%2FWd2jWNeqKsmx0bT6wYkULNn0YoYAHhN0R1Zx7G9RH6blY7dAXN566MkG9H2ycOKkH%2Bvl3OolMD%2BFU0pctkOiB1%2BeJ0KGhxKda%2FIdEpu3PudY2RA6UrzFCqmw1Y2jvQCer1kfcDXCX7CBHc3yNoIi%2BQfygK6ICyUWoocgJPvVoTW0A8OeDhV23aVDKXYuDtLYLG%2FSYaBIs7I3GqjsBAKf9liuBNzoMgBkvy6huri%2FZyc5Z9O8hr5%2FXTFBfuNHRBsXYgdI9k8Zz0DysQByhbEDj0BoL4POLWx4X6vIOCOoWRCNiAK8QAF16bKt7GE62iTHCl6Ulh9iwwGa0dhVp1jcssdlcZQkLhc6OY6IeX1mRdP%2BGmwuW%2BW8DLACYNbMezv%2FiI%2Ft8Ehjo5TSw60MtHyp74YsZsjT4ExfAuoOu%2F3c0rt823oGNQ3JvqRgYzwkm6Qrr0lrYLZindz8%2FnLKb3lRPaOPhhGIVL8LkLPUjuI4O5bJtzvkcdBcnUtkW2iCBNbIj%2F1Re6FgoqTyj6ddvB7JgGFigA1XDY3doadrsgxRHV4l4SNShBpnegFzXTrs5nMIfjjM8GOqUBbB3VPA8bxIoYtk%2FwgoCPPa%2FhP1Oudc6US7ovZvsYwo%2FbeIsMAfcz%2FL9%2B2pKTwiGJr4nBOBwNavEbR%2BgWAp3s0EZjmVWYAwTy0dTZaDtOt7O8qzMZ0o1jJvAGk1cxXhoBM3hBik3kuviOxJY8bwX6a%2BM5HnbX0YSMeps6It%2BstxBqV6qhvt2sAgMvrbVuStWZKLUWUtE%2F8PJ%2Bje2zPfXyQzS1xw01&X-Amz-Signature=5a0217ff1d6c3655347f786a334fb30337cff4ecd42b90af40d7319dded72253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKTCCOQJ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T075038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQD0RkYmx%2F2I44g7QSs4I1M0W%2BAGEXWK3bWD0TQkdx7PtAIhALvoLenNLsEYhxzOHlfcgD%2B55vrEdWpRIiE54nr5wK5PKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyEU6qKA5kF1n1i%2Fjoq3AMZ6eALvjGpf%2FoDzekGZeWxDLZViz5fRMFspA1ZmNAybJ563kVnfgY6mwXbfZXMG0GwpPjFNvmL4ZCP1GVQxjzF6UCY8%2BzMWn0j%2FbFIOFvpddrvdIhxWdOg0UVvutIU4jbsxpENNM%2FmFJiSHvkam0DwT1OLlc0w4JXqv4fa1BnuoiUE5nmc5UGS5t9jGi%2Byim05oYsc9NDb2UIZFDbOF1GeIDYL%2FLFYErFBTv5NwUqkm0h3BS971vwh4eGoL8feL3ddo0f0q6rL5C%2FXUkVrmIuhyJCwfZxwvz2FnSXoI84Y6FcTPz6sHvOAOMwx%2F4i0%2FB3zEtDNbuXfBPjeMUT10Y3gp4LIW1lqacqIbRRkWHsgJJUhBjzufdgjv4F0iHk4KZlyYMa%2BcxcZ4JDwROdrmdr3ontaTHPmcvsqjqsTXiR2HtU%2FXl5yBIIUVORfsqKLrr57VFfBc0S0IDYhtJMvtYiA3zh69yxEgQHb0VPgbTDmuGsZ4fkOqSTnL6t8gFpceaba8vuJhBtD5PtICJSmU9T3mCvdjI0EXmV6IzFLd8h65yiEi3MdvRjh4vV1G5W0mkBTcKUTpsFFyk72w8wgTptzK1YTP%2FI46ZUGgSUJJfpixuD4vqQh2hlycMMqnTDa4YzPBjqkAaHEhAkEru2nQ5jlx0LA9x3huqkJ0w2%2FZN%2F2M%2FkoSx%2FW8YkvVdE4NUctpnggQIk%2Bgixs7z7FPSwP6LUuJ3miidI%2FZutEKf0BqRlECcPHDfwqVvWwzIqCCMg7NhaTUeW9%2F2BxKJne8VqLbhsTmZEncXwQvS2MLyYQZ0%2FwG7wLzOWFjGv4ItNyFJED0Glqd9trOn%2BVDlhlUFfudr%2B4KPMpblJUXDPi&X-Amz-Signature=3f9cc96b8e4cbd0381d776445cb7e3d353a45167d534d00118fbe4d571045481&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

