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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KBTFFFE%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIHxZkpGQqdcnJW4Mt9rAMXOeZyD6EKCtO22XGXA1saDcAiEAvzK%2Bba2XwFGFaoSfMov9FOJiY%2Bs96ipOOmt1kZwUPzAqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDINOcKiFUM334s3LgyrcA6DDHLDmYpwqNgVF16PB0orhIWRqcMAAhrnEf1OKOyIUwGWEuMeKCQv4QLkukS3y%2F9Pm8HY91ru8oheIEz1G50IcBR8Brounx%2FwMRkQylIYoeCdAbrOmQ0iDvZ8qYcQGKAgr8Sr9P%2BVpxldu8gXIm7gNP1Teob4155NXDoSI06eouA41wpsqwIqMZmVoscrVOcfwCqxRXXvkT5Ja9HFVFrznQxuOFmcVCmv9nsPjDRu07ameLiUvrbkJkZxsy0bX8LCMbpJdmIw1qZi4UBYlbLmDp4ngnZ3sxpl73fJzbGayL9x100j2OjeVbmJ%2F%2FOQLGgtt%2FnJZL0hunN6k7cVbr7Qqc3mDASfAf%2BBjxzH4Q2t%2FT0k3qdph6oKrXSizfP98SeycB87%2FizWFHirwCmPWZT3A8RhwB45wTOzP2P%2B%2B2U1c8cmKyeo%2BZoTg1sIRp4NJNW7NmunoYo83iB68LFINgNtTBv4HCiBv4dRxvZ5x6bFF0I7AWGC8MGwley9QVcZ8DNWy2KI27%2FVV9PNPs0pMFU0M8WA40KJxKwQ3efSZJlDlaQGeFaK5%2FdjabBewgIWKvaE8oBGXT2wbTb6fiIVlA02w0LdKdvneOPQnPZ83aNT0gfNKtkEhYJaYWmH9MJqA5ckGOqUBZBcuIClKt%2FBBJmcPSs1TvFnaYcRGEJ1hzIxxoHFZrNByDISaCWAlUo1s0PCV18k30zgZBLe3Lh3uY306g0GF3LRZKBC9iE7nK%2F0kqMQifuvwjsQrdykthVYpKaNB9R0o5447yLscWDFLRVfhqv8SsSYnzZYNTlfzomWBL96QhqL0sBwPUvTeSAN%2B%2FSiXM9Xs%2BrqEQxaR6r9GMn1UaqBUNSKlauJ4&X-Amz-Signature=6c44591c9182adf1b300516fe22b86c62c06bb3e88c5ee17f6f5b877a4e3b483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KBTFFFE%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIHxZkpGQqdcnJW4Mt9rAMXOeZyD6EKCtO22XGXA1saDcAiEAvzK%2Bba2XwFGFaoSfMov9FOJiY%2Bs96ipOOmt1kZwUPzAqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDINOcKiFUM334s3LgyrcA6DDHLDmYpwqNgVF16PB0orhIWRqcMAAhrnEf1OKOyIUwGWEuMeKCQv4QLkukS3y%2F9Pm8HY91ru8oheIEz1G50IcBR8Brounx%2FwMRkQylIYoeCdAbrOmQ0iDvZ8qYcQGKAgr8Sr9P%2BVpxldu8gXIm7gNP1Teob4155NXDoSI06eouA41wpsqwIqMZmVoscrVOcfwCqxRXXvkT5Ja9HFVFrznQxuOFmcVCmv9nsPjDRu07ameLiUvrbkJkZxsy0bX8LCMbpJdmIw1qZi4UBYlbLmDp4ngnZ3sxpl73fJzbGayL9x100j2OjeVbmJ%2F%2FOQLGgtt%2FnJZL0hunN6k7cVbr7Qqc3mDASfAf%2BBjxzH4Q2t%2FT0k3qdph6oKrXSizfP98SeycB87%2FizWFHirwCmPWZT3A8RhwB45wTOzP2P%2B%2B2U1c8cmKyeo%2BZoTg1sIRp4NJNW7NmunoYo83iB68LFINgNtTBv4HCiBv4dRxvZ5x6bFF0I7AWGC8MGwley9QVcZ8DNWy2KI27%2FVV9PNPs0pMFU0M8WA40KJxKwQ3efSZJlDlaQGeFaK5%2FdjabBewgIWKvaE8oBGXT2wbTb6fiIVlA02w0LdKdvneOPQnPZ83aNT0gfNKtkEhYJaYWmH9MJqA5ckGOqUBZBcuIClKt%2FBBJmcPSs1TvFnaYcRGEJ1hzIxxoHFZrNByDISaCWAlUo1s0PCV18k30zgZBLe3Lh3uY306g0GF3LRZKBC9iE7nK%2F0kqMQifuvwjsQrdykthVYpKaNB9R0o5447yLscWDFLRVfhqv8SsSYnzZYNTlfzomWBL96QhqL0sBwPUvTeSAN%2B%2FSiXM9Xs%2BrqEQxaR6r9GMn1UaqBUNSKlauJ4&X-Amz-Signature=6c44591c9182adf1b300516fe22b86c62c06bb3e88c5ee17f6f5b877a4e3b483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W5DR4DE%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQCRuubiWt%2Ba94syppxlmNkNRrMLDUYlDJ%2Be6k8ENnLITQIgJX5yjV2spzcmiAvLsM5SHoVAxoiDzLRPTiOVV8uHiXkqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEMuSSpR1kDNrcTNGSrcA1n7CCnYrXZIKv8VOabmZdxL3cAcq8RAwSagH0n4nzBFfwU26Yq5GkheeMuh7QzIsvG8FniaqcPZ0%2FSaAqwxEVM4zih5p7ye7z1nbQEH3qTBI75L5TJwJIQtTOFIbrECEOfzMqSWPOjeBiUHU2Kwtqx8%2BuI8dAGD7F%2FF%2FGOt%2FDJaY5pYB6BasfmuvEI8ODMflvqyKtHizhNHStLuBeUrZEE6xXvQBWGhrE7zr5FRjE%2Fd3Vi84%2F3a2Dfyy2tO%2Bmm1uF2yt8nNZJ0B9euLqkMQK1Hfc8ZNb2TDOipVCH7vdyD%2BBa7a7vu2FpRZ%2FGm1e4NV24WC1t%2Bn6dPgfYJ3QcJwG89njQERYyP12xqGhtdK10GHXubwrC8CyDAM3hTlzFlxMN8a1Zu5P2st%2FBKFiLnhcxnUJHekwy3MMNiBJUh9FbQ3Hng4%2FqriTrQm5rYjXWZVKpRpg8wQwXMtnX6H3dM3w38dXIKqIuREeKbzt2LFHkcz3XvTgB6F4arwH0huALgCIYzkSTLAFHmEM9mF8dPRwEXxMiemD5DVfH8758LIfraBYrtiiBR%2FEKJ%2BJ1oAdSSH6eXHASUWqXNUB8tcqRZCmWKVahK3Ndev%2F8pNpDQK3Q3RygviEZfoMgxYIqmYMKaA5ckGOqUBlWQ8rL3ojpvd6AmxJnoYY%2BGx8V%2BWcu9fc%2BppdK3cGaZrF1yT3NEroA4PMrcbevnMtRLZ6GiZVe6ryJtMd7sgFdRVEVqRBlYmzO7w%2F7AYdKxnffXA1RvgtwPl0muqSrkrMQuxke9fb3vBmdpWyuq1NsbdyOj66BdEnsTdtW%2BoV%2BsqMj%2Bzi5UjIJgU4ZeGkPjPnY3ddB4PtNjRFOQpBznsHctoDLnS&X-Amz-Signature=49b93c749060f400d3b91d31a29bd6965d89f78e99a9c9b82291643ff0166371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WV34JUOY%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQDLd4vV311Q4ETI44rzwoQNWFezFF746mroZL9izHdYEwIhAJrOh8WRXo6VICw5W8XwzpScUke5IKPFvCCyhoL5gmWlKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUKYo5JSpuksebWzcq3ANcpAs1ZtP66o3nUm%2BYVue7BLjZ7Z%2BuhW7ZAsjaH76Y5hefyBDYewBlHVQjWd9kVvxTp4nxzYlm7v5uZpNSiuZ4TqVszKMXXOXMfHpodPlxrSheCGPEuUI1O%2FeTCEqJp9GJNZ%2F2mcvTpkebY5sycoqmwfMVSfT%2BbfxqtdcyVsF9gUBNXsH6ng9icH%2FR%2FC4UTEO5ic52bVBABM9%2BN0EMaa1g%2FmPm7ld9ZESbO58KjjLwbu%2BR2hP8y%2Fvr1kCKZNd22PnoVrjZwwkMMbS%2Bht5MPtR3WyPyR4rr9Zd46OJKSC1urV1%2BoLCVNACGS%2BO5W5DRVDP4wZ8EgE1G7sb8FXUv4zHW36dSjaYTH8xUbBsxutKrmeLiam7CcH1iAuEeZo5Rx%2BWY6Rrdnu5HPg350rqXGE4djMcqB1qKUDPCvSE6czwaqj67NPiAMgcYrgf8eSexGL0zsuRKPFBQsFtHhPhBT6TH5zjUIbAY%2FxXWSxKEN9XskTknBgHTT0GfwfJ5SZREWLX8N6hI3Z6m6LkkVhNFsUJKFVI7gIKzJ%2BWLim80wvwhuhRDy%2BExJPGBnLR5txpJGF8DOEV9nRHBiMo8wF5gBZFpiAlPARvTVkXO65TBsmODi0pZF10QkUWdfyZH9DDb%2FuTJBjqkATcSxCsngzwFVI%2BlDD11pKPYUCY9iqBOQG8ylQvFK8kee24uxHTUq8xW5ur8o0SQawONn2S7zMdL%2B%2BdslyUE%2FvN%2FRQUMGSvls%2BYeObQNKUC8CelYZKFcQQ7s6SSrijTzsmwP%2B06CvV1zw%2F%2BOdehyLM62BghcYsVujDJen77R%2FZpTmui1%2Fl7wXLg5i2TB2IPBbaIn5gu6pP1906XwKNL2%2F5sTxszR&X-Amz-Signature=17e3e4433f7805c0f55c59a95f327c7a847c811c1b2ee3b75cebf0be4dd699b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WV34JUOY%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQDLd4vV311Q4ETI44rzwoQNWFezFF746mroZL9izHdYEwIhAJrOh8WRXo6VICw5W8XwzpScUke5IKPFvCCyhoL5gmWlKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUKYo5JSpuksebWzcq3ANcpAs1ZtP66o3nUm%2BYVue7BLjZ7Z%2BuhW7ZAsjaH76Y5hefyBDYewBlHVQjWd9kVvxTp4nxzYlm7v5uZpNSiuZ4TqVszKMXXOXMfHpodPlxrSheCGPEuUI1O%2FeTCEqJp9GJNZ%2F2mcvTpkebY5sycoqmwfMVSfT%2BbfxqtdcyVsF9gUBNXsH6ng9icH%2FR%2FC4UTEO5ic52bVBABM9%2BN0EMaa1g%2FmPm7ld9ZESbO58KjjLwbu%2BR2hP8y%2Fvr1kCKZNd22PnoVrjZwwkMMbS%2Bht5MPtR3WyPyR4rr9Zd46OJKSC1urV1%2BoLCVNACGS%2BO5W5DRVDP4wZ8EgE1G7sb8FXUv4zHW36dSjaYTH8xUbBsxutKrmeLiam7CcH1iAuEeZo5Rx%2BWY6Rrdnu5HPg350rqXGE4djMcqB1qKUDPCvSE6czwaqj67NPiAMgcYrgf8eSexGL0zsuRKPFBQsFtHhPhBT6TH5zjUIbAY%2FxXWSxKEN9XskTknBgHTT0GfwfJ5SZREWLX8N6hI3Z6m6LkkVhNFsUJKFVI7gIKzJ%2BWLim80wvwhuhRDy%2BExJPGBnLR5txpJGF8DOEV9nRHBiMo8wF5gBZFpiAlPARvTVkXO65TBsmODi0pZF10QkUWdfyZH9DDb%2FuTJBjqkATcSxCsngzwFVI%2BlDD11pKPYUCY9iqBOQG8ylQvFK8kee24uxHTUq8xW5ur8o0SQawONn2S7zMdL%2B%2BdslyUE%2FvN%2FRQUMGSvls%2BYeObQNKUC8CelYZKFcQQ7s6SSrijTzsmwP%2B06CvV1zw%2F%2BOdehyLM62BghcYsVujDJen77R%2FZpTmui1%2Fl7wXLg5i2TB2IPBbaIn5gu6pP1906XwKNL2%2F5sTxszR&X-Amz-Signature=a2e8560ad6cd7cac51f43e359c17902367d952d9bd640b6273dbd349c3d2d66c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ACDZHDS%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQCi4xYShIn7ZZtc9liHszCxtYWSXHEef7F0W1Akpb2vNQIgZLIDLdG3d5KXlETz2M6UkpdbYp43ntj65eahKD6Dl3gqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFsxJCZDN0o41ztgWSrcA4RnxRmFx2Z6sJHvrXyXt2FZiUhC1mQeD9UvRr4H9r37d1rlx0%2FHdx1xYzN7%2BU08Taoo64iZwOTAJTREswQNm5OxyOOPlb8qMfcVaMMLdYo4s%2BltfTwRx5atZEyFM4gryI323ouSAOnqGUIum5%2BDhotQzBQlp88toYpZtVCS5MjVG1k0Pu9UtghPCkDU7du3GS8vwKX7faPkIosie%2FC%2FH%2FDZttUykddJiZQaPImB8u8ZpvjMVBh4w53JVSz3NvjDAUKa3Lu5iD6jZ81d82Th50AC88qVPV1N%2FtyesSpgM%2FMTIhqcczpbkAWqepUl9nveapGSxphCjApIxji8cbyvfKkDqLgicGAek4Gm7v7EmVddJYfuYwNnQfMmuddxzl0NTzFiwfgCoPXzVBXSnKOyWeJTrnEKFkfW9jq3mu1l1gKYwbppj5mzyAyPYC7NXzI28UVTiMwSYCcd4XUeJ79HGRywBqmTKoaBCX%2B9%2BCJ7YHyLFA3ducyYmHYRbhJeDRcOBwAow9tzoTTw5SSYBXzrEErpmUidvXnrpkjozKgOU8NQKJHtnG9KIuTDgLHa1%2B1YqDW%2Bkl9f0pgUxpVRicLkF9NiEhksEWPH4fQJUbI0MUAW2%2BlNZXBs0PbF6rb8MJj%2F5MkGOqUBd8C0ykCcFSD6NG%2F8F9FBf%2BjVbdeGPtTx3MFAy3QmKlUPwm5kXRV2Ohr1dsT0B5aswNaFTA1%2BUxHYZsT8CxltFG8JaoY38dAyN7ICWwIAaddeM0njo12g2RPvE%2F02vM9CsQNKJfL8YekD2yMCvtXXqOq%2FPrmXsOG7UZnYAzPS088T04aDMmBSPOKFQEcMX%2F7UARllURszsYgBLxipdnq25pfyDGw5&X-Amz-Signature=08a6b253d42b95d3d44ed1239530564e95c8021f8d6bb5f4a626bcb42e1b46ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OOE4D3Z%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQDUDQ6xBeRJbILbyRbVvPH%2F4pIkTKOJjK2HXnfc%2BhPM7gIhANpxzx5zA4JGhAorUeP9YWT9WnRSxOwt7a7JMmDvqRrvKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHFtzxu%2F8C87NX8Qoq3APH1kbnlUMeX7raqkQjApTCo3LM1uF1ingF0x7oF%2Fermci38T9c4Ah%2BH1nNKlA5gbCq3NfCR%2FoUBA8BSudikSW5UWghl8mruROzqSCp0TTkt54pmYlxSzY3JZszOKijG6gHHmBoEBUF5kgolIPFOUU5DXujONVXKs7%2FDl8hHwenp3309Lbv43lsnLODqWvC1KtVHbjhS90oDbaeYBf7mGcZib8OtoEd2qsN%2BorwBHsJGhDqypzadVdkpW4ZrACYRBpdMvHOLEWaW7B1VEyXnLrn0j3oyAbX0X6edRO1CDOybd1T9YiTsb7Bq%2BfpfBHyvblGeXDeGdeU28jPLBfkDW2oTIVagNktSH6iYIyAWBiz5sZMGM8hHTmcdvpH4yTJefQxcqHB0c1SsPna0NMMtuqhhP0w8TqN0agQyFIo3Q2JF8yHFTdwuw%2FeK5kjssKbGl9jyFVD6KfRCDayHMRaJ%2FkjRbKPBXaAQM1EXxp7oAA80ZTE3FW967fZI8JQFcEFvg2EV0j4u2WjWDpQwO8WLHBBJxX1d8WE9lXN5RooYVt4XYIEN7xWRneKP0k6GQOc9qo4AZp73GKoBVZ8w4Hwzt85X%2Fmz4oxKlwSRXwQ%2FGAkVv7meyYLm7VBucr6hfDDW%2FuTJBjqkAUauDxdFQkGz1T8xd8tDE0iTbc30tUe6TlZj07fD54hlj6mGWBIS8QCIYmcx2REJcUDt3kUW46XpLAK9F7PEOhWAUCTAXejRp3%2BUgfGzumsp%2BQb738XKwSaMC1E4nGKDSreVO%2BNF1PlW%2F4Ig4uHcXY1RgUUEhA2No6g5yUZdxLG6dU97QxAuNliizx40t%2F2GdZtnJ7ePhrlYjD7Z6k6gKtuzxYOd&X-Amz-Signature=18e922af51bf30397b70408ab947b78aa8744639e587047d4c11fae2250ad951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDRDW45T%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQDdqDtfwYgZGsuRUVdX9D0sS9NcBE0nwFNiHrZvycJoJgIgEherEUFM2BiOQHjFUrT9mIwZ60D1QqArYxMdfvHJgisqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlVZDqnwe8YFkyE3ircAx3CoRaxcS%2F319AqEh9AVZWIp1%2B6hD2k3Mtaf%2BOf15bDRePZTGyxsXwTJsay4fe67t3w%2FZWSaC6wdWTjz0hjY8ZV4018iAF85KFqY9LirBGCF6LGp8j9nsfBZjS1g7O%2FoH9LGqAalgOmfKp6B721JuExG0spwBl2r4h%2FSrnfMHtrjRs6I5y0MdkrtjhsQ95Hgkt6a4xukqiizCfxfeedBDS2uUbum2xCaT1P9v0jyJTvAtSEL2aUvh0AQxKcrYPpAE8nFW3yso3U6EL07i2uXexgSR6dhR18Bl6bHam%2BF7Qwjk4hplSgpLpXrCU7mHV4ktM8OkXtbJsWVxU39TrQ9SxlrMo3cuRhS3j6B8uL%2Fz716kgFnDnAtAVdx%2FdLCbWRPqVQ9V0WjWPydWqbgaGI844nfwFA9sGtg%2FJvF3zycG8xFgfnAN2QiQlAZTl7R4Xiutk6B2C1dLGAncs7M7ZeYivTH1ipjIGEPgQCG6wjL0EVTx9YB3TdfZeHdL3SWAfh1g4rWhtSA1KQ2Q8VPJzu0LuneFysRXZ6toaEMQkYFmpn4YJJIrsFdyDuYDF3fGVO5IfZMlESTv28wU51MSSnpGdAvQ8qXijw%2Btso9nGTgETxGXt%2FNfXfLDpoorzCMO%2F%2F5MkGOqUBE4j%2FK6eWYC08dsOSca13PFIPrbU5YzM5WtptiKdWREoKzJC%2B98axQCV4Zl2GEPgJ878tp%2Fq9VfCWZIMrTIMu1daGKnFwlyVoikDapRE7c1AqJsL2NToBn1k%2BrUUENQI8FiDYjuzzon9CDcwMiWrZseQl8QGQBsmkJUU19qp1q%2FSJq6jJS428lEFr7zcBvgKg5t4hyJiiqpck8nqPCEzOlJW7Gi4D&X-Amz-Signature=ed24961db118e8289ef48b4e6000b2cc5c92debb9916c2ddecab037fafdbe930&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V56NN4BJ%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQCiKemyMHRIxILbfhkaoDYEk23pZ7ci6OsJbSuDSjbiDwIhALJmvT5Ic7udLO5DLhJaAJMgUnRmt6xTQGC88I7wyWhhKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWt9UfbqiNFN0Xzo8q3AO%2BslzZJuGfBiOS0Q3ZTHJlgnZfJSSWkRM6lDXPeLPpTaVgUcVmYyVOwugOuu93xM2MhPFpkU5vgzfLjZXm51OIx763Fhr%2F7nOS8dzxUeuns7OIBjSiBSoc7o5rTBrEyV%2BPJBzOaTPDNzIai4aYnb%2BpliWb0TAwwRMtRm4Vf%2FFxNnsxvZ%2BY57ltVybyiC9oEZpf%2F90AgrbSmJa8YXcD6w4jFB8oPpWIWpCjmuw8UBLXhszDI%2FIa7PGQajir0XeooMe2Qz0rgc3RMqjjs7fMsiWytZwfuNQXBEpUmkgHuZR5twwCA9IgynntmsgawRolXXs7WMY%2FpJM55GtkTAGBEQRZAor7%2FeZ2lEzEnWcdPlGaxXagzM290CfeGfj9HVWRea1e%2Bm%2FCHwuDQ9xkADwjcDjp19OZLXp1JTv2X0jMjvJYpO%2FkWSoGLlFfSjhzqnxLpSQJUW9SsAR0%2FN7%2Bm0%2F8b0TFMuE31GMqUDOJ%2BEFA9x6xGtulgBSq8VIzabA78DYnqg2ETr%2BO4bCJRV7vR%2FHhmFLrTT96b%2FH20wlSVrc%2B4kD4XM18W83RFEjqq6085WFrg6um8AbVPB%2FKxoR3ajZwRpqDsO02pL%2BUFDrTwULpvGaYt1co%2FHGbx8UYZWovbTDv%2FuTJBjqkAW77VyoLmrIQDeknCy%2FznabvxLqrnHnbk%2BC03fYexxP6I%2FtggaGNmmKKYm9Fp%2FoLnM5Ixu7l3JXtm9xA7F%2BB5zaiqdDGNpt13hTAkvBloZ79I9C7yqpt%2Bpc3APW3FJ07VVySjMRKmAaJLBd5zBhGlKJBCa2FcfHiMix3%2Bw8xrpWMpjONsqIFK9UrNcxPimLwOAbzqXridQxkDCUPaybS3%2BhtLiX6&X-Amz-Signature=c22c678babc4dad5616e270ab0fde7b01bdeccedae4a6f911a5baf2c81a9c8c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V56NN4BJ%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQCiKemyMHRIxILbfhkaoDYEk23pZ7ci6OsJbSuDSjbiDwIhALJmvT5Ic7udLO5DLhJaAJMgUnRmt6xTQGC88I7wyWhhKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWt9UfbqiNFN0Xzo8q3AO%2BslzZJuGfBiOS0Q3ZTHJlgnZfJSSWkRM6lDXPeLPpTaVgUcVmYyVOwugOuu93xM2MhPFpkU5vgzfLjZXm51OIx763Fhr%2F7nOS8dzxUeuns7OIBjSiBSoc7o5rTBrEyV%2BPJBzOaTPDNzIai4aYnb%2BpliWb0TAwwRMtRm4Vf%2FFxNnsxvZ%2BY57ltVybyiC9oEZpf%2F90AgrbSmJa8YXcD6w4jFB8oPpWIWpCjmuw8UBLXhszDI%2FIa7PGQajir0XeooMe2Qz0rgc3RMqjjs7fMsiWytZwfuNQXBEpUmkgHuZR5twwCA9IgynntmsgawRolXXs7WMY%2FpJM55GtkTAGBEQRZAor7%2FeZ2lEzEnWcdPlGaxXagzM290CfeGfj9HVWRea1e%2Bm%2FCHwuDQ9xkADwjcDjp19OZLXp1JTv2X0jMjvJYpO%2FkWSoGLlFfSjhzqnxLpSQJUW9SsAR0%2FN7%2Bm0%2F8b0TFMuE31GMqUDOJ%2BEFA9x6xGtulgBSq8VIzabA78DYnqg2ETr%2BO4bCJRV7vR%2FHhmFLrTT96b%2FH20wlSVrc%2B4kD4XM18W83RFEjqq6085WFrg6um8AbVPB%2FKxoR3ajZwRpqDsO02pL%2BUFDrTwULpvGaYt1co%2FHGbx8UYZWovbTDv%2FuTJBjqkAW77VyoLmrIQDeknCy%2FznabvxLqrnHnbk%2BC03fYexxP6I%2FtggaGNmmKKYm9Fp%2FoLnM5Ixu7l3JXtm9xA7F%2BB5zaiqdDGNpt13hTAkvBloZ79I9C7yqpt%2Bpc3APW3FJ07VVySjMRKmAaJLBd5zBhGlKJBCa2FcfHiMix3%2Bw8xrpWMpjONsqIFK9UrNcxPimLwOAbzqXridQxkDCUPaybS3%2BhtLiX6&X-Amz-Signature=b7404d54e34abd0c0b0e0c50c9dc1320864101c14a0725e6f839b4baa2d11bf9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IYADR3E%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQDs6PQRokl1gtAU4WKUCeQ1ei0hmKa1yPoL81SVaZyjZAIgIHcctFyWb6pZG9WiWs1SN9a4U8mBTlfkHMI3geAURJIqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOvtQlAcyOpEV0RxJSrcA%2Fb298sLXF2JEXKTpVWbyKjRGN7QFReMA8XmTWSP5BNir%2FnuJYzl0Og1r0K8vKqQ8nHZqO3C%2Fb2Q%2Bo6b81fCbwTSpHev2L9IZxKlGX92OQsd%2FGDYCiFD%2FdNV4C7GPg%2Ff1sm4kGofBL7ZySwWF31ep7CR9ycm4ovj1QRT%2FawdzxTEIofu7op3mBRyWB5otHn1TsOffH3mnxq6cDoEuJg9xercsIcu4Pa6IbWKZEU44p7ulhIZ9%2FFK4YM8skwzBCXEQioM2wCSWneK1KJgLqwUPD%2FmFa92vUm9C94BohdkbAnjk2j6T1t8A1IO9IDY6EeQlpvbWU0RT%2F%2FDS%2FSv31SUEyI%2FHCetNeFcRe0jkEkCb8%2BWIbF3zsXq4bb1%2BggEJ2T%2Bsj%2FerixRZUMCOcfBsDydpU3IQCs2rxMbBZxSsnL0UFI9ReYTPSc9LIRaVah%2BhOMOdvUHa4himiKU0Xc84cYbW9TBPz7paFLNOu6fmmIO09jtHacIHqSIy%2BUhZ4PLcuqGyKohpL8W0uPkR%2BPdWdf%2FfhmmKtP7Z1bkmi7uMIV4DCNJ8Gxy75qb0cK92ZFZEcwtWFIUIY3U8mEm0foil1wm2m9XCNWgZk7kzJcucRWKmfmF1PR91hvE8mpxTa65MLf%2F5MkGOqUB9Vt27qpfIZ3SYssulMpkps79O5x498bogmwOvOtf4mAmxWqQ%2FZg5t4%2B9s%2BebM4ST0YsEZwPzYeF8lW1uPH5vtiqnjeCBt2lKCM5nr7%2Fj3Lwo9b06sQJPWCZ8hssg2JP%2FEfK6NWj1ucopqOPW2qE0NqBeknSSsilE2XzSEhUQHZx1WA6sCkHh3qdMNgJ8IVfgnHRDi3%2BkYa0dZb49GBUPvcA3gpgd&X-Amz-Signature=cc0ce4908da5d5ded2ca56a81277fec2887eec6ca94cb7c1edc96ab06dbade5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MITJ4LL%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIHBCFhV1Euizu7nuTfgcdP88cFznQetgmOLHf%2F9H%2Bo80AiB6pg4CHgG%2BWyOPWex1CLtd2xPDtYRrgWK%2BXABkRow%2FZiqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhOr5WinPCVb8q8kKtwDlo%2BypGe1q3BXUZGslGzflyScSliUVIt3BVoz%2FUgNoC%2BO8XFCqeSvKOILuFScZlbbl6u5T1OaIEGb%2BU3qjOKpWpr%2B6twaCrjytdA1gFOmAHxRkIDBPG5P2vgPDHtL5tiHYVpao1c2A3RSawU%2B6UPNDE5jcFY1wnjdOLWGEU%2FacGS2XAW%2Bh%2BCjMo8cCVcMnYWhBH8QRmZmgd3oZgKZ%2FpvjYS64NmkT8zoZ8rAsh6OsyHyApEP72ifQPgpVuxsCXRavJI2shLNReKd90si9QklErH8oKfZqJmRoXrHLuwo5ha%2BoAzJV2qjmQ1DOHjZ5scpqv1OYoqwkD%2BPOL0HM38Ygco63jf7b0GMq38tKaul4v4S9cahi6BiZ2GMTfDXzbeno2XqHS6tsMkGozBWQ0wBU5XGddQcGgF7e0EqouWGAMhYa5rMG0xE1UN4nd6V3EpjTR7QL7h9nKD2aUS4GSqwxqcqdji2kqTyGLYkU9si62ofQHtbLYoP7rT7h7NgQdFqFHBkJ5ceY2mUGcZcV7zXP%2F1U8wtlRPOXukh78IV%2B5pNChdZHwf4NXdACS39ungU57WcoMgCaqaWLgBbFdzZsY3vukJ5Vs%2BM4pabxUOXXIpUSLgJy5ud6ZOEsCawwwxv%2FkyQY6pgEE%2BNoPtINpc3YNudfMEeWwWKwJDe%2B6%2FrBWIYPyJC3t%2FMIAgnJSflJ%2FBo%2BefwEK6L2nIZZvNpUdMrBJObV%2BizSlIa96hFiqT8WtEMla2%2FH%2FFscKqkG02Rhn5KWjpmyaBFZPcqCEP9dXzirbv7aaZSKsj%2BBQXFG8aZOIivYqNkyN52mPFvJlXYG%2FZxXVYGf6AdvUZI9S9RbuiSQTrutKodUDJ49QEZEG&X-Amz-Signature=569c1ec7ef8acfe4e1cdf720dc84677b2bba648aa39414e475cb3ece0f0bc111&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MITJ4LL%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIHBCFhV1Euizu7nuTfgcdP88cFznQetgmOLHf%2F9H%2Bo80AiB6pg4CHgG%2BWyOPWex1CLtd2xPDtYRrgWK%2BXABkRow%2FZiqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhOr5WinPCVb8q8kKtwDlo%2BypGe1q3BXUZGslGzflyScSliUVIt3BVoz%2FUgNoC%2BO8XFCqeSvKOILuFScZlbbl6u5T1OaIEGb%2BU3qjOKpWpr%2B6twaCrjytdA1gFOmAHxRkIDBPG5P2vgPDHtL5tiHYVpao1c2A3RSawU%2B6UPNDE5jcFY1wnjdOLWGEU%2FacGS2XAW%2Bh%2BCjMo8cCVcMnYWhBH8QRmZmgd3oZgKZ%2FpvjYS64NmkT8zoZ8rAsh6OsyHyApEP72ifQPgpVuxsCXRavJI2shLNReKd90si9QklErH8oKfZqJmRoXrHLuwo5ha%2BoAzJV2qjmQ1DOHjZ5scpqv1OYoqwkD%2BPOL0HM38Ygco63jf7b0GMq38tKaul4v4S9cahi6BiZ2GMTfDXzbeno2XqHS6tsMkGozBWQ0wBU5XGddQcGgF7e0EqouWGAMhYa5rMG0xE1UN4nd6V3EpjTR7QL7h9nKD2aUS4GSqwxqcqdji2kqTyGLYkU9si62ofQHtbLYoP7rT7h7NgQdFqFHBkJ5ceY2mUGcZcV7zXP%2F1U8wtlRPOXukh78IV%2B5pNChdZHwf4NXdACS39ungU57WcoMgCaqaWLgBbFdzZsY3vukJ5Vs%2BM4pabxUOXXIpUSLgJy5ud6ZOEsCawwwxv%2FkyQY6pgEE%2BNoPtINpc3YNudfMEeWwWKwJDe%2B6%2FrBWIYPyJC3t%2FMIAgnJSflJ%2FBo%2BefwEK6L2nIZZvNpUdMrBJObV%2BizSlIa96hFiqT8WtEMla2%2FH%2FFscKqkG02Rhn5KWjpmyaBFZPcqCEP9dXzirbv7aaZSKsj%2BBQXFG8aZOIivYqNkyN52mPFvJlXYG%2FZxXVYGf6AdvUZI9S9RbuiSQTrutKodUDJ49QEZEG&X-Amz-Signature=569c1ec7ef8acfe4e1cdf720dc84677b2bba648aa39414e475cb3ece0f0bc111&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFVIKGJA%2F20251210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251210T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIH4jdLZWF7M4IkdoRKLupaQQa%2BAE4RcI6mVLL2uVeH91AiEAm8EM1wk1RvEecP1LPkzHObQ43zyEM0OdK6nF0WR2TGQqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE0AIbK0KwgWMQD7lircA6DCei8dSkJwoksQe62McDsNUkorUdsHTYUE04l3pBYme87E7LsvOWMj1Oi3fkgDFL5ascUjlaucGArwjBnGjIrFQSYjungHDSy5jG7qeg2yqlSCwKwC81l8gAWVa7nMsw4lg3aXac86Tsl2Mrx%2BHQOciK9jO5TVRzyzhjmFv5Ktre8reSCos3zlK%2F%2F1Rpyn%2FdFpw2tstOoJ%2FMspTbIPxR0wNTsozNQhcY2RqFfcbYzFZtJVizWXXnQn2bBS5x78vPuwboFG%2BkL19ji8GX%2FWtE52gyRCWKjNwPqMR2ggiYj6ix5BRYuR2WlJiSAnFFr%2BqHf0ABNDdRQ3gZu6rlydr1YTcSmRt6s94LjzsvQcWV2t3TvFta2UlJgSk9lTpWBZfIp%2FBhv1xwMql0vIvXU1JVjlNO09RjuAOOAANLsZ%2FmBhNfHC2FOKl8bUjMU4gAZ%2BvfI5NmK7R9peqLHJBuqiIEFhcVMQwjXcIE7nQjN7FP%2FKx8eKDELVvnz5WZLDPa%2BE7a3QSHvwtr3%2Ff2bsrY6GzFZtDkhGNg6hj6%2BsTWBmcB9%2FJVXZIWlw7mHJoHWr2amtifV%2FXHYSQUI%2FZcZZNUz4ya3rJc%2BWdJ6HYPq4yBvLrC5p9bRn5vzt3hq7cDX0MJj%2F5MkGOqUBhCFT3DfxuSOyoWWeX7DJFGBii74d1BvRPNEaelUju524Rz2Gad686VKriHtoWxmoDOmqs%2BRnClRWb61nchXVTF%2Bb2cDKJwXP%2FzV3gEn7kMNQz9GnJaL4nFYZFah7Z59v3l1YOBLzbe12BzANJYvuyqzqk9NyO7pSkOKYSEFB%2BRTUFsafj3EDHtuQim5ux0g2IQf%2FrmoN20jCaMgUHCpGvf4%2Fugi%2B&X-Amz-Signature=3bf22135a712b551bd939845ccbaf8163d3f504adf4e7934cc63ff29bde0173e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

