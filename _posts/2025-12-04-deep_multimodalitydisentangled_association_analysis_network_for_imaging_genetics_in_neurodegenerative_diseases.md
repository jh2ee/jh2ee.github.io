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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYYOGEI5%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA3oGufZNq4mOv3MtuyqVYzpjH0DNzz%2FGgO7HIP%2FsVAXAiAxcQCR7LQukJAPIdwt59kvYGRM4hdtYqQHdTzi0YM86Sr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMyLUQtriqfjntlGKvKtwDiR3J2WpJPxRaVqa565kN77ljTP57gVc3i%2F0Wv%2FMrjbzDVE%2FMmK6lCq1nCr58Wz8P97vyR6aCdXsUmBd%2FIFqbT2RFgULvUqop8y4DBDm1evhMzQphDkKgundEWgOvVOVp32rcSs63pKxVC3TbjtcbV%2Bk46S8K0l6Oped1xq440kaNdMp7f4kQzJKsdljf5uyYv6ZYN5Jb7t4AA5lk1BpXYZwxN%2Bxa0HQRr%2BwSu9zCJ4xaIFqztXuehVpEhB2waayoPCRWH%2F1PeL%2BFIf5RASKRQudwKuYE9%2BUiUKM8bJpaLUBZsuH90w%2BrOpFPYLsiKE%2Bs8MCgCNO8OIPAwALexiugg7ZWDuGBmbeStduHwGiRBVQD98otrT6C8LJtRMk8%2BsR7HwmvDYcIvOkjQXoY3vKyXxsbufYAoBUXitiZILBBrGjw57PINWn96PHE4F%2BxHpgPplm9RxSvN4hxxU4SN2QsxLWThbNzq97%2BnJxmMo8CpqWzvt05gY7Mx%2BVVr%2BHohI7tH1lZOWBQtcLNemUjZxgViwrPe6KQbNLgDqQHzh9DyCWY2sZKZJuSniF2EDVabjasZ4vlW9IlPCKK08O8PyLf8igsQvOj8r7wTTEboF3wiL6wAgygt9HPrlcOZb4w3b%2BBzgY6pgGoych5aJ1UelULDyH9DVRs4FXMu1XpMq%2BEf0lZFRa4NAAG0BvxWteDffPMpr9hJHNw85qyzedOoqok17eAHeGsykdp%2F7EDmE8k8%2FmTj15pzl70D2gfHU8fJ4K2JXtfhA%2Fhf6LDioYFA%2BeSky6u9hPVm%2B5gkEArA7Fk%2BYJBBXYQhAgdDmjaSAxQbUK%2Fga6jEYvl%2F4ZH7w8BCxUr4LdnQEBRHvAYNIHl&X-Amz-Signature=141a8ee5d5759ce5dbbe1188b5976c7ee88cae46aafdbf3d68c285feaeafd354&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYYOGEI5%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA3oGufZNq4mOv3MtuyqVYzpjH0DNzz%2FGgO7HIP%2FsVAXAiAxcQCR7LQukJAPIdwt59kvYGRM4hdtYqQHdTzi0YM86Sr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMyLUQtriqfjntlGKvKtwDiR3J2WpJPxRaVqa565kN77ljTP57gVc3i%2F0Wv%2FMrjbzDVE%2FMmK6lCq1nCr58Wz8P97vyR6aCdXsUmBd%2FIFqbT2RFgULvUqop8y4DBDm1evhMzQphDkKgundEWgOvVOVp32rcSs63pKxVC3TbjtcbV%2Bk46S8K0l6Oped1xq440kaNdMp7f4kQzJKsdljf5uyYv6ZYN5Jb7t4AA5lk1BpXYZwxN%2Bxa0HQRr%2BwSu9zCJ4xaIFqztXuehVpEhB2waayoPCRWH%2F1PeL%2BFIf5RASKRQudwKuYE9%2BUiUKM8bJpaLUBZsuH90w%2BrOpFPYLsiKE%2Bs8MCgCNO8OIPAwALexiugg7ZWDuGBmbeStduHwGiRBVQD98otrT6C8LJtRMk8%2BsR7HwmvDYcIvOkjQXoY3vKyXxsbufYAoBUXitiZILBBrGjw57PINWn96PHE4F%2BxHpgPplm9RxSvN4hxxU4SN2QsxLWThbNzq97%2BnJxmMo8CpqWzvt05gY7Mx%2BVVr%2BHohI7tH1lZOWBQtcLNemUjZxgViwrPe6KQbNLgDqQHzh9DyCWY2sZKZJuSniF2EDVabjasZ4vlW9IlPCKK08O8PyLf8igsQvOj8r7wTTEboF3wiL6wAgygt9HPrlcOZb4w3b%2BBzgY6pgGoych5aJ1UelULDyH9DVRs4FXMu1XpMq%2BEf0lZFRa4NAAG0BvxWteDffPMpr9hJHNw85qyzedOoqok17eAHeGsykdp%2F7EDmE8k8%2FmTj15pzl70D2gfHU8fJ4K2JXtfhA%2Fhf6LDioYFA%2BeSky6u9hPVm%2B5gkEArA7Fk%2BYJBBXYQhAgdDmjaSAxQbUK%2Fga6jEYvl%2F4ZH7w8BCxUr4LdnQEBRHvAYNIHl&X-Amz-Signature=141a8ee5d5759ce5dbbe1188b5976c7ee88cae46aafdbf3d68c285feaeafd354&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4RRAM66%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID8ehcCDVjLV4%2BB54er9gQyyOUCshgMl%2BMHn7x7jkRYyAiAGquvjVd8bwmN9xl1GtgcSejfbiJGqtIHWpv5utJ%2Fa4ir%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMZr9%2FRoUtVbalWmAsKtwDlMOhnQXx9TyHRXlnwrg8hk6RtwgqQkF%2FXXECTadZ6Q72GqF7XVQyTiss4CqIr4Ojos2VvnFIqA%2Beh%2BTitXE09izNY%2FX4c%2FDhYC8HKXJjH9fzRbtM2%2FcQM18pYjWA4JqOxsfOOCrI6fuhPJcl%2Bm87EMq0BUCgh84ZA7yzv6B%2B4z168LqglzVI7k0tLDUITBfB5GcMH0Zyh3RRBx8yEnlF2VWWZaVfZnIcFQsYp7qcpt2e8vpdqkjkkTYVOpRy7i9cIQr5lB487anzL8hFEzPOlF6CvPhD1DIC5HQS4Ogn4x1SIR5E0XZ4u46CDn9miFrnO%2FGefRmAZ9gUGI5E40fSyjRBubaTbBKcXpm%2BSgRRi%2FlwTjsG%2B0DnCiMPGXAmqV5PbN8brGUy3%2FrgAwhAcDh02cGR71XcUegzraXHMyZ2h9vhpo2tnWetNnxSOiLCkNm80XGx%2FIqn85ZJQ2K4lPObqQoCkaD%2FIn8F10WkukB5Y9c8aRVpwe4SYtXAeSlpNUZclg%2FqRrOumurEdMSlk%2FeLVUQStBKN%2Fm44meaUtByvHgQpBgi7HVR1YjxEPMb9jpLpHQPgnLXCKZAcxWuJsZf8taYdqfiU8oU7Tk3Rt760iu%2BVBPw0J%2Fjoomfe7%2B4wjMGBzgY6pgEPOlkBchdD77MK%2FqWGI8cGRWOfNa%2BYUN0pWSDDu8K6YZIVSAaVL1yJEDD2PNU8A82PVTkqSSWaiKXic1XGVzLwFrycm0vp9011FfSIQCs30zacBPSVXmw%2BTfke0K1qgXZWz7xz3GBhbrqcp6Evo3Z2cRD4beEpCRPowgh9I6f91FhpY6YoY3e9567CzaRt1dKQ5dabzhF%2FJnpTwyJHZggDwCF6RPJU&X-Amz-Signature=36ba95eef59daa79d1d05f81671ee732713a6c7f11a5fdb0e7a75517d720dd22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X36JYQQU%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFuiC1JegXXDZKYRCfn3at0rsapM4czMtMN0pXQWSS%2BuAiBm4kBUqe1QfEU0s3rPSlGQ3Nj%2BKqTvQG%2FUNUzOcVePAyr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIM4zJ78LQZ131y5AuQKtwDXvY1rgIRMIsUbwmryQMzV6fVQQJa6AayUyvcD5IxYoWfheB3vwzsBtZRNtXCwz8NrQADFV30%2BoVfACvmP14LtC1RI6XqfRAUiW7TBN8ytafEigeVWqnWTHesqOtUQYi6G4N2EdKCk80MTJpy3gCat7qmnYicGIVWgPlexUbavVbE84jorOJo2vPU5aPJ7NLBil3qilbBYSrO3exvOMXTf5pN93qnbdUQl2IvFVks5OTvIkWxxHaKhsks7Cus9UqaUi5en5mRcPF8XGaDmNd6NLnWrTiBF5dy8am%2F2BGrKqraUGy45ffXf0y1BqMYrc%2BQei0Laa6QKFYRjKcvHgYoPbLuSPYjwzZKM9NnKzM%2FPxV5Qf%2B8lV4O0rezK11J7c4vWfaREk%2FDD49x7MtD2b30VcENOuW1h5j%2Fq%2BEe%2FdTtJZmn6BAwOazpd%2B6ZWt%2FBi%2FXpp3gGgEOsaBLjHS31Ew%2Bhn50X5c9V2FtuDBvStybSMr6EupQZj%2BcN9s%2BBPS0geh6fDQP9RN31XNlFP2AtOg9M5lLAPCXYuPOmPd%2BEJ9NJWntfg0XoBdaHBB0kgHZN8KoAYT%2FIdeh0Oe6S4nNJxIDq9BjeTPoO255eqquQEX8VGqY6DxBuK9%2BwkDsFaDYwmcCBzgY6pgHOCvjiz9EUAO1dupV6n8vBIQj51wKbzPK3oYj1G1DmKQ2ywWKp62QZ1oLnj8RHXqvhLhXAqhXqztGc72SolB2u%2B4V%2FG1eUB67ZDIejo%2BoCERy9r5x%2Fs7nIHu1%2BaaKI8cp2Svb%2BwtkQwSH5vbCwRK%2Ba%2FgY33qT3FxzBGKjm1bRtFdiMAIN50RAVj5apCIFdaTGfuLiO5U%2Bfm6YyXar0J6qhBJ5v6iV3&X-Amz-Signature=8a7080f1b05e31e9a2227c791156f4290e3e00fee3ae736e444a356e7a12c022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X36JYQQU%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFuiC1JegXXDZKYRCfn3at0rsapM4czMtMN0pXQWSS%2BuAiBm4kBUqe1QfEU0s3rPSlGQ3Nj%2BKqTvQG%2FUNUzOcVePAyr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIM4zJ78LQZ131y5AuQKtwDXvY1rgIRMIsUbwmryQMzV6fVQQJa6AayUyvcD5IxYoWfheB3vwzsBtZRNtXCwz8NrQADFV30%2BoVfACvmP14LtC1RI6XqfRAUiW7TBN8ytafEigeVWqnWTHesqOtUQYi6G4N2EdKCk80MTJpy3gCat7qmnYicGIVWgPlexUbavVbE84jorOJo2vPU5aPJ7NLBil3qilbBYSrO3exvOMXTf5pN93qnbdUQl2IvFVks5OTvIkWxxHaKhsks7Cus9UqaUi5en5mRcPF8XGaDmNd6NLnWrTiBF5dy8am%2F2BGrKqraUGy45ffXf0y1BqMYrc%2BQei0Laa6QKFYRjKcvHgYoPbLuSPYjwzZKM9NnKzM%2FPxV5Qf%2B8lV4O0rezK11J7c4vWfaREk%2FDD49x7MtD2b30VcENOuW1h5j%2Fq%2BEe%2FdTtJZmn6BAwOazpd%2B6ZWt%2FBi%2FXpp3gGgEOsaBLjHS31Ew%2Bhn50X5c9V2FtuDBvStybSMr6EupQZj%2BcN9s%2BBPS0geh6fDQP9RN31XNlFP2AtOg9M5lLAPCXYuPOmPd%2BEJ9NJWntfg0XoBdaHBB0kgHZN8KoAYT%2FIdeh0Oe6S4nNJxIDq9BjeTPoO255eqquQEX8VGqY6DxBuK9%2BwkDsFaDYwmcCBzgY6pgHOCvjiz9EUAO1dupV6n8vBIQj51wKbzPK3oYj1G1DmKQ2ywWKp62QZ1oLnj8RHXqvhLhXAqhXqztGc72SolB2u%2B4V%2FG1eUB67ZDIejo%2BoCERy9r5x%2Fs7nIHu1%2BaaKI8cp2Svb%2BwtkQwSH5vbCwRK%2Ba%2FgY33qT3FxzBGKjm1bRtFdiMAIN50RAVj5apCIFdaTGfuLiO5U%2Bfm6YyXar0J6qhBJ5v6iV3&X-Amz-Signature=d61be388287cd96936e0fa5d8c87a48cd85883a2000e3b0c442bdc6bdddcabdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7P6GOE5%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZ04ysdGgBzfjFuP%2BQYStWPo6mbJZcs7BnsInLYWIK1gIhAIFBf7%2BEF%2FB6iPik69D8Az2lAA%2Fep0zgPiS6syvy8dAEKv8DCG8QABoMNjM3NDIzMTgzODA1Igy%2BkX%2BqPxtMZ4H8TLQq3ANkBuUx04MxA6kX1DLFj1yRycQwCMY%2FpIux4KahodlEEG6YSpDqp3exUu26kQRmAejC1xmL5YbZK3%2B1HP4f9Ar3FNH%2BCTsGVcVgHJhpNFtzeoA6IQ8ukeK%2FGnpocaevWcqk7P2Tmb78pThnC5EndLeqxhm8NFJw7Q2bhrnoptH8j2vs6l%2Ft%2BCHjXc9aIDHvSu8mEqJWRp2xD8dPl84PNwNLRznDT%2F%2FvbRdOV8jpmPCJhE%2BcdCObaNHf3WIEyJ1T7nHhdW%2Fr0xBRKlCDAbou36Ma9%2F%2F3eRk9tCOO4gwioSDOMq2CmdMbCCDD2DXf2wApCo4Y6GLwflvHFRyUOPXZIpS4OwM9xIL89Bl%2BANA67pO%2BuV90G4ghvHzxutQfXvF66qVnoKrt4r%2FcqZ%2BTd8zHvhtEx12K5lclTfpRr%2BDJDMG8NDoPrIo5C3vl0VupncX2yELGowroy%2BmduU5EjMTFB%2Femo7G3ek30GLpi%2BcMU6zzqpITACor1xzk40er2gHO0ZV4kJRDpr%2Be7k8yZvKKbMMA3sLbsbVYUyi%2FASjMMPdNofPiPkNHSfLNWdD8YJ9QCOj1lbXfiuhCZAZIAMD4z7zv%2BT%2Bg1MmzaxnjSwi9d0DfuS23v1A4YuzJuKAdU0jDSv4HOBjqkAcMtxlalYJ67ajcDsABxA61oUzDr0VZe%2Bxu%2B7Aw5Cvky0y9pkTEhO%2B377n2c4qYx4VhHJsNSADyz%2FkRlA1fb%2BMK1TI%2BNLdy3qCAQwFm9p%2FQ0seQ5MkKODRyTmF0RCygNYrSnSECUqjWYmo9BK35XsIxCP05O%2FsSyCR9BNGNSuUjZdySdUSMOvQ%2FA5WwBoYuNv%2BZMRqPLpjWkJYTcZRc4phkVuGpi&X-Amz-Signature=c00913f654c4f747e3e310b38ec5d88e24dbafc0a81b605be6124127587fb1d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRUTBXMQ%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCk82jP%2BRm5N2xtbEMssR9Xw03A5sqIevG6V0tGmcuqvQIgSVaJhISLb6vAlhgNcw%2Bb%2F2%2FUB%2BS6XB8fK8w1XN0GvVIq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDJ6%2B%2FmsfT%2FofZJhlMircAwLXhHuNOHpChE%2FZR4e8pRzGGaWgtdn%2F1hBfG%2F5TkFsFoBtYmFB4oz0lp9UR2yfRQgqI%2BfAE7pz%2FaTzi2xlanO5l0h9frrMllJQv%2BrEyogwwgOAi0BI4%2FJ1kJrFZUyvWDxf6Nedw24Vg4dET87SFyRMh9tDE2SXR7sNtJxsIhP6rYfuPr%2BCLwERYk0aJPuTB8giP%2F4Pd18ndz%2BVgWI1m0jS4%2FnpHjuITwtni6IorQAyQl0MESyLh%2BvGKertWBW%2BpRZgqLOYmq44DF7iTfkOejORCD75vlX%2FdfL6pJWQQnC%2F8gv2lDMPDfk5ZPTOJv0xF9OPlwsXH8WSlcK2Q%2BzUKjv35DesxyyzV2Fsr%2F1ubxrqy0%2BKvFDicoAgGO2VKWUaNis1WPntyE%2Bk7%2FGjB617oXWYuIhhlnoa6hLTWjmXwQnr3ZA6X7xqoEgzNJgRd%2BouX3VdCp3REOpGQTroRWzFQIJGz03AW77o8kUtRe%2B8Rx9pbVtYX%2BBKzr1LWrIRI%2Fh7K%2F35Ktx%2BrPvLvffSKdk4ZagiDwPQQPb6FDjbwAOVFh4m6MBIjNCpedd8PAY94xSCStPd71zoEas%2BvISs91vFcPoOiN%2BxQ7kSpMbtJnjYNg1C4UiuhoS76ErGhiEJhMNG%2Fgc4GOqUBT84zsGTPaFfY0JlGhmtzTgD3bpMKo8IM%2BA%2BVW%2B6kNqkuvKWv5xvwLMePu6JllMF3fKOOXbDInfVTll5ddPls52EE%2B7OMkmjnd8R0UT9rRmmHg4JUiNvyEW8nRsS%2FvHtSDnczxQvypqG8vt8B1EGm0XLVMBaqArnu8PwZWS8WJkMVG%2FiuWikZLnfLBQjkQqxIH8PS0zn1gRKa0W81w7iimTn6ViCu&X-Amz-Signature=153279051ada34d11dd385628c3c23bd65815e09960345611fd306e3653308b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG4LXQJ4%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsDavCYTEeLrxp5KIBf3pCQG%2F%2BNQatY0HuytSjpVIJdwIhAO0xC6pz9zBEy2SCFoXeFT8QnLTcKWRUSgGGZRSk2JSnKv8DCG8QABoMNjM3NDIzMTgzODA1IgwFBlX%2FEloA5TLlKIQq3AOfbyOzvO%2F7Z9p9BwY5tNxLO1815KUC3vePCDtxv2GYLjc2%2BfP%2Fqttnb36A8j%2Bzi7%2B8TjxxrR14BKtbWAlI6Dt3%2BZT75z8PYx739Mo%2BrWPPXAZXGwecw%2BKORWuSWMoZql1bg2rgufaPs2iAmkrxUSFasT1%2FNjqhvPtilUjkJpSwhkWRfKEx8j8i5vfvK9WjqMYbq77zjtWm8%2F7tQsLCnrWVCXqBbPOBMj7Tib0Iw%2B9GgD4W3z5Y7S3nOPypUX%2F%2FDzKjmVToHdrW9bwqJTZL7dlXLDHmQglB4%2BI5aBTbZpTY%2BtwMCJs4q2B0B2TfOpjhGpvxwUmHDNkbbmV4Uw1qQc98rP4agw0eLnkV6TOmA1rHsZDbmxJyN4%2F182BSWwEdVHNf6%2BnjJyyw%2BofDwUM4TpbeEkxh%2FsJ3SaxR%2FUzFkyNqLGvhMm%2FMD3%2FcCnFmleKgH9SsFJXq5cC9WSybfiaZ4J%2Fo2at1Ypdr%2B91SG2%2FkgSOf%2FR6o5ddsIlEBGM5cHO3XbjmCYOkkk%2Bq5cpVfeDqcqHf3VeGmkXXcwf0HEk3m8jQFrphmT%2FdtjSN%2BTbHllyAPtePQeR2q5ioTeAiv9i9eZHtCwKWnsBDos3OV4JXlWAYkI8Kg1r4wwjsDQPIhvjDUv4HOBjqkAQhN5ivBJB1mXFzJzavUiVIcJvjirG8DFIrrf5p844FSIvQmiXoX75Bh4BcOpC%2B6Fqx8BVcWpokbIzdFicfY8OzGsFfcaPzSFuzENk2Ciob3gimQUkdwvjx5cuMiKYeYYNPW%2B6mAj6W39qztCg6D7jK9u8QC45OmZ%2BDoEVRbEyLe6N3DaL%2F5C2UFJNl%2FBMB86f9D%2FyB4drIbXBK9UkS9gobgyR8M&X-Amz-Signature=e82e33cc9432722dde4355f50f340b63c48e85b7f043a800d9ea32b7445ea8bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y2QZ44A%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICji86X08hpDiaxpSGqzpsF1oxsIGakMhZFLo1f4vyliAiBBQD6UDprlaf3NX76Izx%2BlOA7%2BRONs3AGE1q5LMgYaaSr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMSqK%2BT9fgQ%2Fsx%2BuykKtwDEq%2BaHeD2TxpS7p7ucMhQRsIGHHm64aFL2MsmgKIttt84WrJQ9HxVfMKUFUoEdTH3CS%2BPF1MIAiPdu3Q45t0EiBBMKWFb%2FAvKa9ZArzQBo%2BpZn9mqXDhL8pbsJk13VFdlH06A7QJWpL4Nd3e0h1H323N%2FwZKUtByKupFW3PfSwY1wat28KcH5sLAkBgEt7RC0K6wYtAamkExfPSmLmuSQCTmJuGHsToRUGBGpSywc6iZpnrQnV0T8cB%2Fdb6jjC7Dpkp%2FPa4emA7lwhJeDpWNc4AtFjApfXla6CCbK4bBMcSVKzcKo279B54E7jirYv%2BU1quwC3wv5r%2FDoZCuKEDnuBo6FOG%2By0pqozvMiR7vWHSAiSEzomx0i%2BYGPvsSUBxmh625BzbKjJ0JMaJT9ui2y3gosKjcmpKKMD3oPB4XG7kXCgMVJdeo4mlTb63tn15uJCXDgfLZo3op69qQZNOirtx%2FKqi1iOh9qNwtic%2FwJCuxFDNDe%2B7ZoZgJ8a%2Bh6VwUGFhKXIIAAJr2E03yC2gsB3s%2FJInrpcD%2FSyOfmKgV5MlVqC2qt7nSszFQ1c9mDbhRqRehaBSMymsbAn7Al5%2BZ39calABQV4ibrXxVj2iF5IqbqUwNhcmcGge%2BpOpcw3b%2BBzgY6pgGXfpBDVjDBGLM84udIpa8s2lHtNrTBjZuXViXX1M9a75Dw2jZ0f2coqnmbR9h%2BwsJznDOUSF5ZcDx88Qg%2FVt9BYg8maHHA23rcdbEB4j2kqVHvu6h6cREFOUJxzAWH%2B1U8mX8m1BEzEg%2Fnc6bfKqztpgvwUARLdyICl0ywMWBm0SvJ1JSbH0hRF%2FRZpvSCF8fJiLriffspjUCQw8rqxZsF5WDIRcP0&X-Amz-Signature=dac26238fa40e195e7783be52a5a1ad9a23bfba3e028cc137e043ed07f779f42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y2QZ44A%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICji86X08hpDiaxpSGqzpsF1oxsIGakMhZFLo1f4vyliAiBBQD6UDprlaf3NX76Izx%2BlOA7%2BRONs3AGE1q5LMgYaaSr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMSqK%2BT9fgQ%2Fsx%2BuykKtwDEq%2BaHeD2TxpS7p7ucMhQRsIGHHm64aFL2MsmgKIttt84WrJQ9HxVfMKUFUoEdTH3CS%2BPF1MIAiPdu3Q45t0EiBBMKWFb%2FAvKa9ZArzQBo%2BpZn9mqXDhL8pbsJk13VFdlH06A7QJWpL4Nd3e0h1H323N%2FwZKUtByKupFW3PfSwY1wat28KcH5sLAkBgEt7RC0K6wYtAamkExfPSmLmuSQCTmJuGHsToRUGBGpSywc6iZpnrQnV0T8cB%2Fdb6jjC7Dpkp%2FPa4emA7lwhJeDpWNc4AtFjApfXla6CCbK4bBMcSVKzcKo279B54E7jirYv%2BU1quwC3wv5r%2FDoZCuKEDnuBo6FOG%2By0pqozvMiR7vWHSAiSEzomx0i%2BYGPvsSUBxmh625BzbKjJ0JMaJT9ui2y3gosKjcmpKKMD3oPB4XG7kXCgMVJdeo4mlTb63tn15uJCXDgfLZo3op69qQZNOirtx%2FKqi1iOh9qNwtic%2FwJCuxFDNDe%2B7ZoZgJ8a%2Bh6VwUGFhKXIIAAJr2E03yC2gsB3s%2FJInrpcD%2FSyOfmKgV5MlVqC2qt7nSszFQ1c9mDbhRqRehaBSMymsbAn7Al5%2BZ39calABQV4ibrXxVj2iF5IqbqUwNhcmcGge%2BpOpcw3b%2BBzgY6pgGXfpBDVjDBGLM84udIpa8s2lHtNrTBjZuXViXX1M9a75Dw2jZ0f2coqnmbR9h%2BwsJznDOUSF5ZcDx88Qg%2FVt9BYg8maHHA23rcdbEB4j2kqVHvu6h6cREFOUJxzAWH%2B1U8mX8m1BEzEg%2Fnc6bfKqztpgvwUARLdyICl0ywMWBm0SvJ1JSbH0hRF%2FRZpvSCF8fJiLriffspjUCQw8rqxZsF5WDIRcP0&X-Amz-Signature=7ede721068ebb8da05fc2125ca3b9d04bc36101da9745988610825c9117ac1e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHMGJL4K%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXWMjuBOZql6M8ouVjae6dLy6SOONvv7E0PTQ%2FrcUzuAIgEyaBlp%2FIgSxQ51CQ7W7kqNAa5%2FVl1rhUpgUUNYnd6C8q%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDByBp%2Frl%2BWdyOgEqaSrcA1QoU2e4ZybxvUYWAiHWhP0NEjrffqiiDFkAiE3ySGqzbIOqdNUSxUsUUNqgNBFw7bdSYSUI9Kh70LRmWeIbAS1bcKHpL9asZH4aQvSwsHE%2Bud1Co7cb%2FQQnaKqahF0CwfPHbtmQWSaa388z47XTr92litlGJqQpnsA5pYe8BmLPvg669zewm0d5e5HTcA2ZOog2GXOkSk0J0Qxem6hlopYfmkRqXrEn2cE0LEUAFEqR8JODhMv82msC7rNnFHGn2vkhQCPQISunJrizz7LxJdsKYpUDtDt4ShK2SN6%2FudJTGFrCDtThWrJ%2FqMjwbIscBsoh6h%2BvKAG7mbVBCNGzFRGEZ4Bm%2B3LYEetprvW%2BrS0hzee3b%2FYOBZ8pJqae2fB9trJaOeT2Otff3bARqZmF6NdeWDr47A%2B59D1zSOGzLE9w7PSYmaLYq0LHVuvPFFY4QUtg6XFbIkMuNgvP68wC93XvcFuFrgAB1Y7l6%2FwCsOWmw6BBk7hHMmOXYQ48n54PhR3w1KZLraIX4fTbJqCk9ANJHGaI0h9bYemFoFsgT7MK0cHXgKXAUm9q4nJ%2BrCRfUIjAsa3l3ym88POZNoLEhpXe0AwifsbN09lnaXULNddG8GMM2rfNGO75xy%2FNMI%2FAgc4GOqUBS7av9tODf%2FYT63Kjd4XL14TqAcEVHtQK6vInOhqlj9GYhsfhFzfYHRk5ykphldheTmyKeIq5EEYA2DtnWbMroIayxQc%2BysguueVegN%2FKK%2BPfwfdnq0CdTolGwBCzkPSlkTlVni5At6jirnsMWjm7qiJ8DWIMH6OCygNcgJyTX8pts9p9%2F%2FYYKa6V%2B7rU1JbknfBdX0iZ2rKDQisJf5N%2Byxnl%2Fwm8&X-Amz-Signature=300bb77bc869fd22c38dc891cd96a7c0e3c202df8ad80bd96f8e69fc46d88eab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGACDHSR%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAofguOa7ikbXKjR9DhUu5G9a1spEP4XM4bwz875N8l0AiEAubJf9Drr8BJzmJd1P0D5F8ONmvBriyV9eB1whql%2BgcQq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDNid%2F3%2Ba%2BaWHyiaaCyrcAzI4IAc1TnuUcEbvtEVP1ckAQPwqBTnx6yisJyQKfnysFOhfIwMoi450BRS1vgtN91Tj727KJSjPpBefuVucC%2FRbCjOZ24EoBgx09BeyzDKGmNN2lDIxFzl22rAHLYMwCY75wjjxm7sgtq2CwPHf6Cn6CjzGa6lNYsSP0gC3NPOOEMSkUN%2FoWegR2yefYKgzeCP%2Bf2bpDF2nFDhYFHvh4M5JD%2FdyQ4iKIzHMiVH8Ds4IcMArXTnUV%2BOEzEscCCv323Am8jcKuJuzPo%2BSopCL4BWw5Xt139Ie58LonKMLrU0mYB05%2BipPx8j6Js8X9uzp1Kav%2FmUrBcthWDE0iotfPLzOHWE7MZmOPivG0INFMIg%2BJa%2BF7yNv8idtdTI5ImsWcyH4ycMkc0V5szLR6yjYpON0h1fsdwQvvoRh3vm6CeAJbBPtGFMrLj2DRMu3%2FbN5ouYiPT6n2GGFNefjb2q9ZC%2FhZHlvC9qgtlgiJIir0eP0sS8vqnE6TAdu%2Fk1T%2F3jN%2FOXdbjXqWzDgDK%2FdnkANAUzqGElQ6Ge5z32fny8S7OfWfB2VWxeKkz8C3e67AYKt4wTEUaeEXJMzNKXBRSfkFgWYQPh0F%2FOdpD995KzINUgMZ13vw9OjT2GAYc7fMOC%2Fgc4GOqUB6mdkAkmlcXuWQfECsquwwfN42s%2Bvw%2B%2FT4kcVV266bW%2BZUKr4bRXbwVTmrDRcnVH9rSspiNXOpi0VlOa61VUgegPCz5u5a6YoJEkGK3sx2OYrLCyhKFnoCSIqKj2ipv%2FaMto12XdfIccZ4DMMD%2BxYNPiniz7V%2FWatM%2B3%2FsfamtxbphZQuFbN4%2FCiVD5kbZrQ8eLEjgky6lvN%2BY3qTXVKkJHLAGJyy&X-Amz-Signature=f2e0848bd13ea4407702930dea9167db441f4e913f0d66d1b7ebaca2f7eb1128&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGACDHSR%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAofguOa7ikbXKjR9DhUu5G9a1spEP4XM4bwz875N8l0AiEAubJf9Drr8BJzmJd1P0D5F8ONmvBriyV9eB1whql%2BgcQq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDNid%2F3%2Ba%2BaWHyiaaCyrcAzI4IAc1TnuUcEbvtEVP1ckAQPwqBTnx6yisJyQKfnysFOhfIwMoi450BRS1vgtN91Tj727KJSjPpBefuVucC%2FRbCjOZ24EoBgx09BeyzDKGmNN2lDIxFzl22rAHLYMwCY75wjjxm7sgtq2CwPHf6Cn6CjzGa6lNYsSP0gC3NPOOEMSkUN%2FoWegR2yefYKgzeCP%2Bf2bpDF2nFDhYFHvh4M5JD%2FdyQ4iKIzHMiVH8Ds4IcMArXTnUV%2BOEzEscCCv323Am8jcKuJuzPo%2BSopCL4BWw5Xt139Ie58LonKMLrU0mYB05%2BipPx8j6Js8X9uzp1Kav%2FmUrBcthWDE0iotfPLzOHWE7MZmOPivG0INFMIg%2BJa%2BF7yNv8idtdTI5ImsWcyH4ycMkc0V5szLR6yjYpON0h1fsdwQvvoRh3vm6CeAJbBPtGFMrLj2DRMu3%2FbN5ouYiPT6n2GGFNefjb2q9ZC%2FhZHlvC9qgtlgiJIir0eP0sS8vqnE6TAdu%2Fk1T%2F3jN%2FOXdbjXqWzDgDK%2FdnkANAUzqGElQ6Ge5z32fny8S7OfWfB2VWxeKkz8C3e67AYKt4wTEUaeEXJMzNKXBRSfkFgWYQPh0F%2FOdpD995KzINUgMZ13vw9OjT2GAYc7fMOC%2Fgc4GOqUB6mdkAkmlcXuWQfECsquwwfN42s%2Bvw%2B%2FT4kcVV266bW%2BZUKr4bRXbwVTmrDRcnVH9rSspiNXOpi0VlOa61VUgegPCz5u5a6YoJEkGK3sx2OYrLCyhKFnoCSIqKj2ipv%2FaMto12XdfIccZ4DMMD%2BxYNPiniz7V%2FWatM%2B3%2FsfamtxbphZQuFbN4%2FCiVD5kbZrQ8eLEjgky6lvN%2BY3qTXVKkJHLAGJyy&X-Amz-Signature=f2e0848bd13ea4407702930dea9167db441f4e913f0d66d1b7ebaca2f7eb1128&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GFQLRB3%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T221151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICkF5TkZK2WBjPRpznICbrvxFaogUoObofRU6L3U8vlqAiEA4F9NYMEIQWKr7vkxWhhxLOJdF29Sosm4JYYWr6dFS7Mq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDMxxu8Wu9Qrw17NJLSrcA6qgGds4CiI11ZwEvb6fB0E8jv0fzbVmtj45HSP6MOzzXFMSXI2jEg4JWQeAp2OJshAmX08M8vG9XaK6O4LKV%2FE1yVzjZWVrutb4CA7HbgZYwE6a04qNzHxxxhegtY7Z8f116ZHsKqFPBsLBLeenlKnoamo5SCuvFx2PN37Z7e1VEACMXmV6rVtJnvOHrbuNVF3LsYooiS35Ic2eroj8CxPqGNWLYVSlylJC50yOA8E0Vg3C1qhymFDW%2F%2BKgHTD4CSWHy1cjZQVtKn491SrWQxJaOWeCNqQ4ugih%2FWK7axjjze0Y7h%2B5Z419PbBVEO9AVSy6CPxTPL4OJmINP7XSGMU2CEt0g64bvmSvRZbFj2gigWd3MaUQ9a2fMZ7fFmeGx%2FCnuFDxK%2FpCQDZhVAHSAlVhMAwxsn8CZVS8uYVju6QvXh%2BQxLHe5voJcdhGXMQKHJkDa%2BQPBJqaJgLj5MHVSzIV%2F9n%2BtTYJtIqGSIY8UbP4H1S1xyr%2BLy6K6Ncs8t4riby1MJun39c9bVqvV2iCBuPJmj78yIIZ0nTK774USPUOfbWzsC7iJyiTsMORGXqUziNxmq6KTmgk6DGreWwHa1YGAE4UTze3xsu4TOcximyaOdLwZbREGj0dc4z4MJzAgc4GOqUBvkEDUF9eUVWWTZ%2FgwNH3mLuCnA3Y%2BhdMkc%2B%2FVX8%2Bzg36KQpNcD3A%2FkqkCY94ViwL9KvSyvIMV8N4pTfhsE1N2IBbMYuJvVtC3tjL8sz%2Fq71aVzFnngnDyY3pK2SSkaSLedWLadqkChVfVYHwBoCY9%2BlLHCOgAAsW4YcQCciIXQCLN1eKmkexboVjU4tJqFPSbzw%2BXolLA7qnHYlecug7oJiLO6jo&X-Amz-Signature=b1f9083e26b027264c0f7ef806b590e754ed906cc44a254156fb39acad5057f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

