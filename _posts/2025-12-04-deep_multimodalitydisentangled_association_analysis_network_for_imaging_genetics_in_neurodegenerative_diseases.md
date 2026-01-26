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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQYMGOAD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCO7DMZs4Xco3k7NRMb3B9mJNn7YOGo4gsQ3eYzsXsTSAIhAL8%2Bv9ScZ84y0jmtVwV%2FJld4ZoK7BebfnLni10Frq7muKv8DCEQQABoMNjM3NDIzMTgzODA1IgyVXftVf5IHu%2FnX6fAq3AP7ai%2Fe5U9qgth4%2BbcQ1EHUizjsJgEuc2PgdsCuW4jj4me8YRivAOfsCv5lxKbbVgb0W12WHA9TNAzCrUKQya%2B96nicEVFB9YvamqZwVbTrOWSw6hCid3EX168VnQRv1gXHXo27BGkii2o8uGcJ8Ke3YR%2BTQ8AR6nVyFcgMnHXGvQ%2BVIM3DtqY8dJVQztolwe7fDU1n%2BFDttRYduSKSmh3fj4v7wYacwyWV8yolLE6QcNYoX5wGhOgzfuy3VBvNH7ob6D17KtMADwp9pSx3qTkmRpBxkcQsfaOL9QqkonZtIXJqSucDy77l0EGculhjypRkQamlI7WRcxKDvwEUMYN8ZGfLKrAdcfTiT3RSgt0WHYAc%2BSAejrKt5xIYw5OmZ6ytIhNmPC%2B3GD8dOdOrrLTaIba%2FrLLZWKepWjZD1qFcDa3TZ645leIu7pnLclN%2F10akXjrtmOLtLx6GQPUG5SLxgSUOAgcfpASZ8p0264xc3%2B%2FrAxS8rSvqg%2Foe5v5ciRp6u86tComgQN4BQN7WCtVZxLdsQXW3qv51TFYoHjWl0Ruxoq4XnVLZBSojdenYSl%2B65H362sY1SCODlOQw2uHKtKnNNDBUdyC%2FC0bO8WouKze27CqmmwwHcjYXIjDk%2Bt7LBjqkAZcaTKhMMyTYwP%2FrvP7QpKu3nm1WU3ZYZYxQH62JW%2FmflNqEuI0oypez7lbwjzS0hIehZhMo9n3ZgvYNrwlGu4N243JgSarsPLF0XK0F4zmyniAuqgrkElJ%2B66lb%2FhfvkIS10GrVRR0jUcmVLylXNcAOEbHos3TlXsd1UKjlyJd%2F2WjVQwZHmykgj0Ufh8Pna%2BJ8Eo6mGVYhfeNb%2FUGbe7d9lIex&X-Amz-Signature=ef9e61749c58c573583dabcc21cff9147cfbbe69354740c567cbea7f8f3fde62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQYMGOAD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCO7DMZs4Xco3k7NRMb3B9mJNn7YOGo4gsQ3eYzsXsTSAIhAL8%2Bv9ScZ84y0jmtVwV%2FJld4ZoK7BebfnLni10Frq7muKv8DCEQQABoMNjM3NDIzMTgzODA1IgyVXftVf5IHu%2FnX6fAq3AP7ai%2Fe5U9qgth4%2BbcQ1EHUizjsJgEuc2PgdsCuW4jj4me8YRivAOfsCv5lxKbbVgb0W12WHA9TNAzCrUKQya%2B96nicEVFB9YvamqZwVbTrOWSw6hCid3EX168VnQRv1gXHXo27BGkii2o8uGcJ8Ke3YR%2BTQ8AR6nVyFcgMnHXGvQ%2BVIM3DtqY8dJVQztolwe7fDU1n%2BFDttRYduSKSmh3fj4v7wYacwyWV8yolLE6QcNYoX5wGhOgzfuy3VBvNH7ob6D17KtMADwp9pSx3qTkmRpBxkcQsfaOL9QqkonZtIXJqSucDy77l0EGculhjypRkQamlI7WRcxKDvwEUMYN8ZGfLKrAdcfTiT3RSgt0WHYAc%2BSAejrKt5xIYw5OmZ6ytIhNmPC%2B3GD8dOdOrrLTaIba%2FrLLZWKepWjZD1qFcDa3TZ645leIu7pnLclN%2F10akXjrtmOLtLx6GQPUG5SLxgSUOAgcfpASZ8p0264xc3%2B%2FrAxS8rSvqg%2Foe5v5ciRp6u86tComgQN4BQN7WCtVZxLdsQXW3qv51TFYoHjWl0Ruxoq4XnVLZBSojdenYSl%2B65H362sY1SCODlOQw2uHKtKnNNDBUdyC%2FC0bO8WouKze27CqmmwwHcjYXIjDk%2Bt7LBjqkAZcaTKhMMyTYwP%2FrvP7QpKu3nm1WU3ZYZYxQH62JW%2FmflNqEuI0oypez7lbwjzS0hIehZhMo9n3ZgvYNrwlGu4N243JgSarsPLF0XK0F4zmyniAuqgrkElJ%2B66lb%2FhfvkIS10GrVRR0jUcmVLylXNcAOEbHos3TlXsd1UKjlyJd%2F2WjVQwZHmykgj0Ufh8Pna%2BJ8Eo6mGVYhfeNb%2FUGbe7d9lIex&X-Amz-Signature=ef9e61749c58c573583dabcc21cff9147cfbbe69354740c567cbea7f8f3fde62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEFCNUQN%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICqX98qhFswGPo1YtnqglLdL0Sn5cHBLFiN2rDcjcuorAiEAqzpvxZ7w9Rjt%2FKw6U1ih8%2F4m9GYV%2FMYZhueCXHPPjbYq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNB8iLyT95xMI9WoqCrcA1%2BvVQUxPX8i1K30IByWHdZX1Sd%2BsSACu0bEDTMHCzkEIP3tOI5glKaOxJRQ1sEhI8fXg90HGfU70Djcm8QZD2%2FnlLeV5vKy3N0Ttuun2S2SRJ8d6a%2BNjkIG%2FpeNZTxFcBpHc5TNI8Yeh1CsZLC3s8Q0CCSLd7VAmNt01xK8QA1iYNra3dcdVt6DGKQvfse45AdLer5Ufhp8mivT6S%2FzrizLpPVhyBINaVWaDux780OAyouXCpUpYHUK8Z0OLrjeJwiMYsEfIFCypm6G8Gy2bLLvM6MoAyJxlErGsyIYHedP6lzXlt4Y4vOBxmMh%2FfaK2KJuKIRZKkfKObIC7fAIiw7JcolW9Eavq59MvSFKIvf8nk2yt5H%2FITqz8UowWUfYeggxdyTADzwZSGN%2F%2B4DWaDAOoIe0JGLkOkqPwZBV3VjHUxmYOAvGPrm%2FNrDW6x0V65tghHO8x74MW0uvBftbVLi5SpeExj2HpbpQxW2vjnpgQqnEe0ksurInAMjNIo81zMFhm7h6XmTLIdtROSrpbS5MoUSDzys9fQA1M8%2B0GraQ%2F91TqZAbdhNYiGRRnf6p28WaT8YeOyrtYtZ7S1xkasI6XWxPg18a%2BbNz5PVLwMgR7gmOnSu%2F0bWO%2B5PFMK%2F73ssGOqUB3%2B1GYblH%2BdnzRtY9wsA1BfPp%2FnxbfyVW21vjmolkqSKeEuEcP%2Ffut%2FJFOQntiXUEx9NDbmJQ%2FM8x9QMkHdOGAy3XNvnvT%2B0u0rOoZBwvfLa6jAOXXvPqVCUymSWEAbyY%2FqMlc2821%2BTjQNGYZ8KwWmluaVozLlLTXoyGH3K4%2FACj2xe3YoCAqpChr7R3BaAvh7GT87UTXtd7fp1o0svaoHJUCHly&X-Amz-Signature=8ccf5847c894b7f652cfc43fd08ba6715b052cec7c9d0d4978bd02f848b40b8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2PM64VE%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDO7FAynBeWmhxoWLbvXomB2ynJ7GFm%2FLz8eCrGMmYEMwIhAMwyuXjcQksVRMPuPQeRLl1kkzNZa%2FB6F4G7ejnYZdExKv8DCEQQABoMNjM3NDIzMTgzODA1IgysxnnBda%2B3lRq6ToUq3APtHHFefaO8WK4NkoO8f%2FYh2Og81A%2FlYHwlS33pfhCFeWZ2zXztkJn00ceuz4DeWCibn2ZTZx5UuzUZX9lDqfQA%2FKDzfVcwhLuis6PpXit8uZrUzivp%2BZbTSXr36RPHNcLgXfHsD7t3x5oftTTyJQSKFYuwy2xi5G2%2B5A7Kz8qGRHvYkYOlZaZT7WzOq6LHi2orJnZH%2FKuGyB5o9PwdSfFjlQ%2BBxoHdgmHFxjfVn4oo94ZXaFv89VXkIbOliI%2BBv1C3y5ZlsTR0MIePXcF8bT0gxVfqcwjPSJ6dE60y0HxkEzdicrFVF4zK%2Bhz63%2B2ViuI58KJ40i54721KJcqdo4WUTl%2FkIDLAiIgZ99cKcNxHOQ4oHPg0v6nAckFI37nEone74U3LlGQfCNPdojR%2BWnEWaymHBFC02%2B0aTopyEE7sc5rCMx72XTyBobZFNsN%2Fn7fYrnlNUmNOUWYndUBaJFWYAsQzq0lBnehJyZ%2BOATmsbPKLhONEs6RZSnGxmoHduxU1Y%2Fdn1KrodtYzOLVJIQWTl%2BK2XlLVeVyic%2Bhi9fK%2FGVuQmxtSyOAvclFfepD2sY8VwJEuKE%2FDUgolglcB63NCL%2FCkvvR2k7hCQgau63ZmgTV40fjH7UNqd9EPJTDc%2Bt7LBjqkAdOvOX5tKYaA6EUXJmJlIrrACoR0J4IM9QPdo%2BHsdyWreoX4oWBWUQaMfuwaapK2itIdOsw9qPzjNTxKjq8mA%2FACfEXStk5SubCMwH%2FfGwSlFP%2BogfOEd5jHIwyWRKczNwoFNof54mczZDMd57poIZXHxZvq0vqUADaGSWLbiF1C2Ef29U%2BFCQuqxkVjTRrDImyjySuUh32Zq7CV1rVm1BF%2FM74B&X-Amz-Signature=193096f7fae2f81536f3502f9eab4ae27347824855b533a9042f962a144f83ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2PM64VE%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDO7FAynBeWmhxoWLbvXomB2ynJ7GFm%2FLz8eCrGMmYEMwIhAMwyuXjcQksVRMPuPQeRLl1kkzNZa%2FB6F4G7ejnYZdExKv8DCEQQABoMNjM3NDIzMTgzODA1IgysxnnBda%2B3lRq6ToUq3APtHHFefaO8WK4NkoO8f%2FYh2Og81A%2FlYHwlS33pfhCFeWZ2zXztkJn00ceuz4DeWCibn2ZTZx5UuzUZX9lDqfQA%2FKDzfVcwhLuis6PpXit8uZrUzivp%2BZbTSXr36RPHNcLgXfHsD7t3x5oftTTyJQSKFYuwy2xi5G2%2B5A7Kz8qGRHvYkYOlZaZT7WzOq6LHi2orJnZH%2FKuGyB5o9PwdSfFjlQ%2BBxoHdgmHFxjfVn4oo94ZXaFv89VXkIbOliI%2BBv1C3y5ZlsTR0MIePXcF8bT0gxVfqcwjPSJ6dE60y0HxkEzdicrFVF4zK%2Bhz63%2B2ViuI58KJ40i54721KJcqdo4WUTl%2FkIDLAiIgZ99cKcNxHOQ4oHPg0v6nAckFI37nEone74U3LlGQfCNPdojR%2BWnEWaymHBFC02%2B0aTopyEE7sc5rCMx72XTyBobZFNsN%2Fn7fYrnlNUmNOUWYndUBaJFWYAsQzq0lBnehJyZ%2BOATmsbPKLhONEs6RZSnGxmoHduxU1Y%2Fdn1KrodtYzOLVJIQWTl%2BK2XlLVeVyic%2Bhi9fK%2FGVuQmxtSyOAvclFfepD2sY8VwJEuKE%2FDUgolglcB63NCL%2FCkvvR2k7hCQgau63ZmgTV40fjH7UNqd9EPJTDc%2Bt7LBjqkAdOvOX5tKYaA6EUXJmJlIrrACoR0J4IM9QPdo%2BHsdyWreoX4oWBWUQaMfuwaapK2itIdOsw9qPzjNTxKjq8mA%2FACfEXStk5SubCMwH%2FfGwSlFP%2BogfOEd5jHIwyWRKczNwoFNof54mczZDMd57poIZXHxZvq0vqUADaGSWLbiF1C2Ef29U%2BFCQuqxkVjTRrDImyjySuUh32Zq7CV1rVm1BF%2FM74B&X-Amz-Signature=423428bad8c553af01fef2d3ab8a5982005a1e1adcaaf01525e4823c30ae85b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653OGGTZC%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICN0rdGH1bsoch6em8XR4CVjNz97hcfWPKvs36UsiNKXAiEAjRX7rkKrBmrT3TcOXrG%2FcoX2PBj%2BQ6RDtmkEQo6RF68q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDLs2jkV3bMUG9%2FCxEircA61%2BcXMdhG%2Fq7yQqcmdrUH2yFrX4amYpVNfARcT1l2SXTSC3BSkfI9ZfTowots8F%2F1Wa5o4kk7Nk66i3MM96tNMoAl%2BB1GYJPBjs0xKu65myB0YdqZJwgnK1EroMvdwqlb2rZ6a9IdTDht9lq26p%2BjAT1HPNuvmFhSuC6z4YJPoXAgEXAWM1fefx5mNmdl%2FO153B7kJYS%2FDVNiXbLitibzSEoOoPspcS%2Bm%2FT37UfFigsK6iKdbGmseMPTwPvzIxGP9s4Y8zuD92mMSkuH9kLz9kYrWC%2BA0hmmoZoyV4yw5XuNOfS6e9X2uxYXeBO1ZVEPE3wTkmRVIQSHHy6NpSM2Fdf%2BlUh68noiVypWrYxqdLVf36QXzwQJYm0nw7z6MI%2BZSEhz6qNlmv6%2FdLICTYJFOVvWwS7YNJNi2JJ3SNaCU%2BrByCVgdcZBjzOsYp4FS3RAtW5iLsQ0gTiaZASYk6MtCBd0RLQAdMROil1daSKRsbD%2Btq1h78xzLowD8ZZkIvdBSaVZ%2BJoBylUFnxSDzNzNzoCVUmss%2Bf7nkwslPwrvWWq47%2B79lfC9QhB%2BbCWri3lk2spEpDC55vCpHaJbSoLEzWSxX3Id9gF8FVQX6bhsoybFDp5RfvArW%2FG3UnkMO363ssGOqUBgtpqBDzS2XRCDXctOPcAAJQN0ZSNkxjJ1Fg5sSq0opjyqP8dictPYYfNqDIdhbkCo9KxmEIop8AT%2FITQeHLx%2F1iMxxQ9NjmWnfrplOlUwE4vzslHliFoFx2N%2FUFmiOdNQXgGgg4%2FZnXKtBCctEzgwpMJlT%2FEOOjX%2BcEFlvqpElrFApLDJvGRYYgPCnHHTLKxGMOoMa50VgfGFi16RfIyR4OHx2gJ&X-Amz-Signature=d004e8108e3dbfd2ac04d04ad69c5d77424f30a51a8d266878d4f922a35c0960&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7QYREKT%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDHrda%2FNPnerXJCwugua7vspWct7TXUUaoI9FcaZzT4dAIga9QU9%2FFG4WngOI%2BtARwhASShXE24A6QF%2Fxz2f4r%2Bu4Iq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDC4E7Xct2WOEkFxpySrcAy4M211Rydl5%2FxIExHVvb3h7korGDdi8XWAKS7i01veMHQMys6twBHu1NiBs0wzj9rOVl2q%2FaAZ9wJTgHR04AbqPPJ9agzQFIqrhx%2BennHcjhuYTuuQCGpTRSU88vKHsPj3o5nybdzOqGT8MV3NDxT%2BoXxa2jKMdgpCBzBzMoQY%2B3WJPCbA4rZLoYojFdwgzn9%2BiPYfUlH1PMU6SuULKOx9dS0XJcMwqPwwTweWFGspq4WasqLnRZT%2FGv9wJytFbtmnVYddwzhxDZOqIL6BPCadQ9M29N2Y0pbZD%2BBJktE91yuNA6mKb%2FOiRLuzDWO9Gr7AD%2Frv5o%2FTeHP2SbskEM7A2QAfD%2BY8EzHrT%2FuAQ4nWi71jP7%2BuD4rm1lZqJSGgu8T2XXxWrPU02ARgOnpXR4BkauUlwVbEW1206ljMZr%2FGwMiIi%2Fi3xOYxGJs%2FNQmRJYHAfmY8qzIjmuXFVYl1xWQ11AKIpza69uNIr4SqCEqc2YWWut4cB5lFYO3PzxOGu5N4X61ztGRwGy90K0s%2Fe%2BdnOH%2Bqqt%2F7dOLxHHYiPNvWUu4QsyRyiOZAzMM37jtvrxyJsRhTOIqTh3jVDDUbAEG9Xg%2FwydMCy9L%2BYb3U0%2Ft1z5rRGJcDKBdacY3bnMP763ssGOqUBFV8%2FOOiwWU%2BMk53fN8lVYUvc7bLdLJa50uymC9T%2BCg4ynVY52BB89ZIVVbqjYEJT7Ng2PnTVPraky9rhmDVmN8%2F0zfykWHJiqp3AzOoeky5CA8GmiwQ4KMdh%2BW902uAJKi3vlrGYagxNLF7Plbu0pOiJpfX82F6%2BT6cZmwn7D9j9MzfM96DXfAU%2BVOcnO1%2BX7RkKXWNZnzTU3upOWwmQQ86la5aO&X-Amz-Signature=c10834fed035fb6830352a4cce7403413e643bf98ce73b38478be0e85f4605f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466624CLPPN%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICnSVdCB8CiIdauQvMR4fjQTGJIo428xsDrNCRqWtkMCAiEAzCYNZGDBL%2BqggKepLf%2FUOi2Jt3iBgy%2BZXJy%2FlSZnMz0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDAFkPQCqpJ2QMoTHZircA4SLKB2HQZ7IKFNhqJIOS8BzZM8poeqmNlBn9NXeUoCHdw8qaGmQ2wxQP5Dc5daUctA2iQKFPMqBr9uW%2FCxmjhHbPRoi8JXqHzVnVptH%2F6VUf0pEu5fy8xs2fxwoBIzH%2Bhg%2FoxQ1dOU8bcoIDVzZaEpL2VNlaiw%2BwisPi5YTyvi4pfCDHQhEX1nIIno8xjjuIHlL1uZ5g08Dv37sdJN1oj8%2BCwpjdqCyiniDrzbXj0v1fehv8ODsLj1SggCY1b3HK1uk9tInvKmFVDhbJkcCjxf4xVzv1ujCiGKXrSEOgTK0OPDtKnyv7E5UYyyNnUu7%2FSF9GstqpXX0d1W5KTUwrarDf8bJe6B6IF4sTeHYFe1GoORn3arrJhJga0T5arOgBIAw%2FymnEOG7vZnaQT%2F1nQXD30gIUHiSZOQ4h1ZEblH5HEGHRMprgmU%2BwiPVtRerncBk3NcDlpm5ViFCUEaZUjIWLP%2BT9v5FB0t%2FssKIFg5icccPEVCiUNwno%2FIqf8aGIsZby6Sgz9ol73PVgmEnPZtJJ8OCyJrJqB9pY5Y%2FMuElNOv3x6DymPIWh%2BjqNDQN%2Fgn%2Fba6YIliHvVPLexOOXAsN7f4KID%2FhF7r3cpjFAi9U3rk3hLmsYH6NphO8ML%2F63ssGOqUBUEY64D%2B6Agy4XA7SPCCb4CK%2F6HdYzOvSI%2BEb6nX5GtitNYQnWwzOQMOW3w1WpCmnwz7r9rWvazOmnGRSubX0xhEv0RAvI%2BC7Qfb%2FgknJj9hCmJFye4eHsY8y%2FAQT6H5JYQB%2BqUZ%2F%2BFJyyCDDZm7sZRkDmOjb5dDXs%2FD1t%2BkvxgxTZlIa8e2eqItA9d6gG2ntOP3WnoUvASdMSTNLCvR2LBmshe2c&X-Amz-Signature=21939a55b0babd9c8f1063eaa5610c352c589026ca792b8636838d2b7b96b980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA5YXFXD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQD3niPI32UwG4evHRqYad4sgCHRXBQbrG74OF0fkBVK1QIhAMPidfxL3Ka3v2n2zrK8K8DtEmtXMxwOPpy28oTidBN2Kv8DCEQQABoMNjM3NDIzMTgzODA1Igytf6lDN%2FjMPe9ThAgq3AOu3trc1r8gqSo5zxKljQzAieCODbf%2FYoFoEvl%2FeSK9mvkEcA5DV%2BOy%2Fh38baHrAiRVaSedoEQ8Ilr1edlV1xMu0ZCJsqhDO2xoSPkv%2FpNAaNmbfQpQmyj6mAqn25YMSTVlGEvxVkhfOLBexsCJ0RKMhv489GGAgfvtP0Qbr90RkEzMo9TzWutu4DmdnJ1K0G9NI9A5RpNoW5cu5h1khINVfzYz89m18Ohvgwwz0LMLXUvoa8zPMVl5FHMi%2BmsFvZj%2FGxzCEBM2lICq9CMYIo2EBfPGU71mdLpHAJNW5scKXYWwAQWcgktoQcWpHQcHhgBVVdGDvpOOw3msyzzmmz8GfMhwNKQY0PY%2F0vYMPcZLGX1TkX2ma3r%2BVfITBye5Oo%2BggSfxY%2FCgh%2FG9JIqeD2lZFmx8Zy7a17yw28LDLQGF3Fnpwn%2BbvUWSAdWCj7X%2Bfi%2B8UFJHlen%2BDWac3RRFom3Ee402EYZCkwcVwwfHWEwl3RcLZI03MYAhmNTMGE3byplpToWqc526R1u3t37D86kpFsKmdvQv5dJIi8zoOPiN9KMeskYJ8TjYcXEJ2WJwxr%2FNQ5zH1CwGkzEqqXTybe4o67wjnHJR%2Boa45Xytt0Sh6gVgaBaVRKbbac0swzCJ%2B97LBjqkAdMz5Mv%2FV%2B0l09Wl3GtXbGfDX%2B0DPqmsUGgS%2BMoRXr8XyNay%2Fg0QCVSNmqro5ZxugvaerEdx4IjcUNda3XO9XfnuHk2%2Ftgf4cvieXthOn6yESORGjgqYLjUCyCNav0s%2FgkQA1baE7a7Br6irZpkVn7zjge2qmXjAXwbvHJinEVyd8nSTSWbxtOWQ0tAFvU6ExxEhhTzsNIPDYA4JV01N1ZwKgplY&X-Amz-Signature=137f94dc6ee79e3b7af8f2902a1b41cde398262a86256b37f18518c0abce9958&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA5YXFXD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQD3niPI32UwG4evHRqYad4sgCHRXBQbrG74OF0fkBVK1QIhAMPidfxL3Ka3v2n2zrK8K8DtEmtXMxwOPpy28oTidBN2Kv8DCEQQABoMNjM3NDIzMTgzODA1Igytf6lDN%2FjMPe9ThAgq3AOu3trc1r8gqSo5zxKljQzAieCODbf%2FYoFoEvl%2FeSK9mvkEcA5DV%2BOy%2Fh38baHrAiRVaSedoEQ8Ilr1edlV1xMu0ZCJsqhDO2xoSPkv%2FpNAaNmbfQpQmyj6mAqn25YMSTVlGEvxVkhfOLBexsCJ0RKMhv489GGAgfvtP0Qbr90RkEzMo9TzWutu4DmdnJ1K0G9NI9A5RpNoW5cu5h1khINVfzYz89m18Ohvgwwz0LMLXUvoa8zPMVl5FHMi%2BmsFvZj%2FGxzCEBM2lICq9CMYIo2EBfPGU71mdLpHAJNW5scKXYWwAQWcgktoQcWpHQcHhgBVVdGDvpOOw3msyzzmmz8GfMhwNKQY0PY%2F0vYMPcZLGX1TkX2ma3r%2BVfITBye5Oo%2BggSfxY%2FCgh%2FG9JIqeD2lZFmx8Zy7a17yw28LDLQGF3Fnpwn%2BbvUWSAdWCj7X%2Bfi%2B8UFJHlen%2BDWac3RRFom3Ee402EYZCkwcVwwfHWEwl3RcLZI03MYAhmNTMGE3byplpToWqc526R1u3t37D86kpFsKmdvQv5dJIi8zoOPiN9KMeskYJ8TjYcXEJ2WJwxr%2FNQ5zH1CwGkzEqqXTybe4o67wjnHJR%2Boa45Xytt0Sh6gVgaBaVRKbbac0swzCJ%2B97LBjqkAdMz5Mv%2FV%2B0l09Wl3GtXbGfDX%2B0DPqmsUGgS%2BMoRXr8XyNay%2Fg0QCVSNmqro5ZxugvaerEdx4IjcUNda3XO9XfnuHk2%2Ftgf4cvieXthOn6yESORGjgqYLjUCyCNav0s%2FgkQA1baE7a7Br6irZpkVn7zjge2qmXjAXwbvHJinEVyd8nSTSWbxtOWQ0tAFvU6ExxEhhTzsNIPDYA4JV01N1ZwKgplY&X-Amz-Signature=1c26b3afa94a0ae284fdd58e2573cba42568a5525c8593fc174fbc15af6044f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZENDQQTT%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIEfpwgqkK6XhyxP4UuPEu8FqkaLC1kthmGpYxi%2F8zxVCAiAqUK2YmIxdPzs3G5efRj6tUJLOTHHThzLFbwMLV4Xjsyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMHv%2FcHBg6yhrdeAeNKtwDhslnmnbzanrpIdKPQJKanrHkV7ebwSduEY8xyXR8t%2FGUDQd9cuGxe3nid%2FGe%2FTNM6Mm2du1gKf9yPNyHpcdJCchWKZMhAYZ63bHzsbuy%2FpneGZ0UAHstCHTwR42Gn62odQ%2Bcgv5LKNcGP2YH4V1mIOtM4fddk4E8NykzVEGhqYohR8FwhPXp8aJvME9W4Qb9cOhtkcofQYkEbc0mDLvGWioaqlM%2FPi97oUaLDQKFXe8BwBf8P54JMoisPxJzKXsa7trtWpdSxgKj%2FliZ9WEv8iRVQ5r4%2F8gUtVUXaLlq2aYxmfNa8q5HzwtgZ49lDBMlQ84zgVA9%2BO2nUZtrDaf%2B36PtwKl68QJt8u4roPLVH5KQBV2K145FVnO1ettWUHK%2FKcvMRchOfgpVAaiRkVmJ51CJuXS6ttUsHymjheDT37z2EvMcJahEoxXQe1cueG64%2BuojS72ywHissFbsfGz%2FbcmT6zIaBszJcrP0vI3EI4GV52wNoZ6mjP5Ves%2FuCKnWxaRFkXS4rkGnzAknXVKWYQntUkxbVovtagi5t%2BpzI2GxqTdytEWSu2ejnM3%2BmVol7W88GNXJgTeD3w0vbLPQXS6vcWVYoquluxufHXLtHxdVYcSqrllut3p6wIAw7vreywY6pgEfQs%2B0w2a2UXVIO3azSyEQWOgNPKJ382tOIHU0tS0%2FmrwFKFY5IIme1nE7vSAe0d0Vg4ZHt5LGSSzjSu6USjtDHB%2Bffy%2BBHP15woXpfs8IgF2CDkIq094Ib%2BzTSzAgkHaXWJcBS7QmVEp0IoCGd03bZ%2Fj0tei0maKybylg5zrwe3IiB%2BqPuZaE3SAsmEO5adsb799zGuvhVHzyEFRmnkHcCoYKuAgE&X-Amz-Signature=b2095dd2befa1eacf38bd25d015c9dc31276a60b72a8f28de9ecc950fb189225&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667644DGB%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDjDl6Fx1RyKr4qqImIm1u3tRBz%2BrnA%2B8U%2FLhDkPhdW8wIhAJ8PH0T8bc7%2F9Esxy2eXcYqbKwLSE1rST9sF3IEREdm8Kv8DCEQQABoMNjM3NDIzMTgzODA1IgxxZJyLtqljgZucIWwq3AOhBWpJA8NeN33K5TDkxnbZ%2FFQAo1TOIM8bzry9mYo31wLZqA%2Bf%2FZ2GwUQQ48GbaONq3djhH3AP2ojKfeNxHx3Y42Zi5unFjTSrudOp%2BnzfwTDRjmc4w6ZYQHX3Y3bLF%2FcDnCj6DPfYQL%2B31%2FxLp7KrX7J9jP4Ovl9Bduky2taKM02p0xGzlAX7iQNLVQp1VCQJ5kmhpL5NN9%2BBXxp6e19U0IDBKHn1mbvcU%2FsVGfRzBQAsFPrLrLOg3fDkec60NAb8NC7LC3af7uYhiw4P%2FznVJhT6k6Q7%2F5ntIARKmqa%2FaD0i8AuYDskOFyfiV%2Bsl2GfVjR7ejN51riV%2B%2B97N9CohhOALl%2BsDKrtNqUt1pdPSAnGMhO0PNxawVOpCm%2Bu4iDjxN5s%2BVSpDBHoIbP6EKATmwnuG1DWrjyz09EwQS5%2BQykY9arvnfTYJsA0xuVLC3HYB5UAZXkmob1M9yMQPHw5KWTquw0aKjmDnaLWYpLUI9JlPehy1EBFlB8wReT%2BTikk%2BaeYSkjbNFezauK5kO%2FHU1TYwZScN%2FCbFeLsW6ANRcpjO3TIWaT%2Ffo5PWQKNLhRWztm0oIlzPDJihEL%2Bu0SDPRMZ2Mjb8%2FeXhUs4j3%2BVK32ye8N2FDqqcVN98azCI%2B97LBjqkAar8cLHAW0Owoc5xZWep8r5KMGIs6S97yOA5oh8Zamq84J7xQzQrcvdh9B8freULFVLxC5t8qV2yPLlYnRQs0gNom7iK3qS3dkrIFFTP4strWO%2FMhkwqJ4jTwra9ws0kTp9%2BequTtWKhpKw8KqfFvOEDCepn9U4grKSMfa0nANsup5Ile97FRHTO6RPSc%2FlNd6qfp69biF%2Bkie5mSpHm0WFvoxMV&X-Amz-Signature=37033ee3746db30d4b2d8920466f7b3ffa07c8041ab26d1614ba2384b81aaf41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667644DGB%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDjDl6Fx1RyKr4qqImIm1u3tRBz%2BrnA%2B8U%2FLhDkPhdW8wIhAJ8PH0T8bc7%2F9Esxy2eXcYqbKwLSE1rST9sF3IEREdm8Kv8DCEQQABoMNjM3NDIzMTgzODA1IgxxZJyLtqljgZucIWwq3AOhBWpJA8NeN33K5TDkxnbZ%2FFQAo1TOIM8bzry9mYo31wLZqA%2Bf%2FZ2GwUQQ48GbaONq3djhH3AP2ojKfeNxHx3Y42Zi5unFjTSrudOp%2BnzfwTDRjmc4w6ZYQHX3Y3bLF%2FcDnCj6DPfYQL%2B31%2FxLp7KrX7J9jP4Ovl9Bduky2taKM02p0xGzlAX7iQNLVQp1VCQJ5kmhpL5NN9%2BBXxp6e19U0IDBKHn1mbvcU%2FsVGfRzBQAsFPrLrLOg3fDkec60NAb8NC7LC3af7uYhiw4P%2FznVJhT6k6Q7%2F5ntIARKmqa%2FaD0i8AuYDskOFyfiV%2Bsl2GfVjR7ejN51riV%2B%2B97N9CohhOALl%2BsDKrtNqUt1pdPSAnGMhO0PNxawVOpCm%2Bu4iDjxN5s%2BVSpDBHoIbP6EKATmwnuG1DWrjyz09EwQS5%2BQykY9arvnfTYJsA0xuVLC3HYB5UAZXkmob1M9yMQPHw5KWTquw0aKjmDnaLWYpLUI9JlPehy1EBFlB8wReT%2BTikk%2BaeYSkjbNFezauK5kO%2FHU1TYwZScN%2FCbFeLsW6ANRcpjO3TIWaT%2Ffo5PWQKNLhRWztm0oIlzPDJihEL%2Bu0SDPRMZ2Mjb8%2FeXhUs4j3%2BVK32ye8N2FDqqcVN98azCI%2B97LBjqkAar8cLHAW0Owoc5xZWep8r5KMGIs6S97yOA5oh8Zamq84J7xQzQrcvdh9B8freULFVLxC5t8qV2yPLlYnRQs0gNom7iK3qS3dkrIFFTP4strWO%2FMhkwqJ4jTwra9ws0kTp9%2BequTtWKhpKw8KqfFvOEDCepn9U4grKSMfa0nANsup5Ile97FRHTO6RPSc%2FlNd6qfp69biF%2Bkie5mSpHm0WFvoxMV&X-Amz-Signature=37033ee3746db30d4b2d8920466f7b3ffa07c8041ab26d1614ba2384b81aaf41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663KQ4O2X%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDQge6nk3b3Fpk3%2BDCtZJ58pLc%2BLgLbogu8C4NpbZQ8CwIgFpe48f6aL86DzqhQld5gg9yFv87CcoqDgOuf1G5i%2BWEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDI7WJ086wmV5vEfjAyrcA7KXV2OZEA27kq0bo0LnFcWXOGiCUqryVT6M3DK6rAZi9o48uT12aLiCcTri%2Fvl3juIs9tbkIe1CQOtqyeMsht2lpU7Thm2GqaGI1KfAsoSZJlAi7aY4zh8coJvC3ZweVW%2FH%2FBd3Sr8v60LtUho3mS0kMwsSgluEMAQtRISCrBZu50rZxtZTllao4T9nLhVitFMOq7CliK1NXeHlx6Irigf%2FyMtlIfyx1ubZlez6HD1n7FU0JaTC%2Ba9x%2BNoRvxK8GOF3nTUVl56B5ZzMAavZ7W08Ya2I7dau%2FVdY15erDl0lXTDQQLLivJdoFhHZlj8uqWyjpeaysJZtNfWvh1iO79qeulvfzH3pZQz%2FcfmR63jJC1Sa47JhB6EJknn3YnRGaMoM%2BOFzYr1njsruUvPwfJZ%2F%2FUpjrgDhXJfY%2F1z7LX3usibH%2FTb0zN%2BOshXPABDTmb58Xn98CENnSZeFLqdv59%2B3RkkX3snt%2Fpd1uyZaPaC5hxPTXp4LXu9GFbW3XtZ6PN936qgckYywUJozQmYDe3oPlBQE%2BSMYaaXUd%2BLru0JH%2BmS%2FoonmCv8Nzgm3ed2JlGPuWNWahOos869dn%2FCyrRtMHUevI6O%2BChqd9brpQ2dgefNFL%2BAZ6TZeGVIcMOb63ssGOqUBFZMlKoDFbgK4rupO7nfkM07MOXSSfQ0ZhFMvizqVse5%2BfTmaBoHkUth5URl1LG55x4iDAcMmE02lksBany%2B%2FqzfCZm5r9oLrQfPAJWQUACbZeH%2B1fr8UNLGN4DLlEHx%2Bi204fgG9flmnF0ODOJyfQwXnGzF8ZbO%2Bh8cUD1%2FV48gzKVCUSXW1K7mZG8%2Bf0ArEGwSfznHTjhZcB%2FX4EJpaSTIYWA24&X-Amz-Signature=4773e298d8d904a27955d118c0e3594280f6782583ab6ee079bddf1e149a9f91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

