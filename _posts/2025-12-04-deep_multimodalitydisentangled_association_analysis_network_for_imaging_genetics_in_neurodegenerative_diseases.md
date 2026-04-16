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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J6YL7TH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHrvAzvMVpn2kUTSf7C8ksCY6UDpJEEVit9JCD8h%2BoewAiBKhgwokXm%2F3BwfiJlbsuohGD7wMaH9GezCULe8iMdDmCqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxJ9bIU6MJjumULzlKtwD9Bp3rhwUa0t71FlIYDOuKR5dJfPwINqAkzQrDqoqHl46tbVBgvTa33KqF4Ma7g1zp8XLZNyn%2FqnT1e1kg5249n5el7UBqUsvclnvH3eGaHFqyDfkrzXP4e6S57EGmPHuiKAVF%2BRHrGinp6dMcoaImGVvrq4%2BYiwFgiClEOatLpLVh5XXgxpAHvUb%2BYD8mqZ%2F353z8Lrnk7u5oo%2Fp8PdRkUiXUXgAFxQsXZB9xersi2QiZxgMze8pmT2mDNhMCrlljpCNU5WV78ZgJeX%2BuY98EVAlkqrHcZg89XFezZJfzktiknIEeEhteYF9Rdn0O3qRImoeqFBZ1lk1oo9SWRI15TUNqjZGMdJ0fsBfhuQ%2FmST1bKpjed%2BuFsuuGV8X5lUhRYFTgcaJl0XNpoqfGleAg8ryevinKUfOhPOSXhfFM1XM51avEsfArztVQBTCoXQHLtzoxnRrf0IIhyEYoK7gCXN5LVXh6vsZAnbfd7eYgVHtE%2FnehyH9clBleNNRBpNTBzB2mZ821lHK%2FWaTWaB5y57rpMGiHbJotUTzM9tNj9Xi%2FfX1KhEMo3m7fi98bzJ8QdxgaPFMwDp4Rt8WTmMCGHseq4d%2Bn57lwNF09TRP6wTJvc2ITa0zZmzV37EwqMaBzwY6pgEgvACNzlc%2F5Glv2f%2BEiikMsrGZ4nVlpupRVwkP3pgHwOVg87o3hiWshLVqlRhHBh9VzqntNGJ%2BDXWAe6aZk5oz0VCqaFn5LFyLOmNpiPo8IB3ZVEIAwyd%2FwAECItvTcgPeQqOiL95TYz96EEUQNrQinkyVwgTAMxI0314vkKPGUzGnTG3HEIGzV0V3qIhus0dfQLd%2BHsvLoQD8s7fkI57Y8t9qGm7y&X-Amz-Signature=8060f5768e26094be482c39e12a9ed99cf23f619a7514654f1faf22439f812f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J6YL7TH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHrvAzvMVpn2kUTSf7C8ksCY6UDpJEEVit9JCD8h%2BoewAiBKhgwokXm%2F3BwfiJlbsuohGD7wMaH9GezCULe8iMdDmCqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxJ9bIU6MJjumULzlKtwD9Bp3rhwUa0t71FlIYDOuKR5dJfPwINqAkzQrDqoqHl46tbVBgvTa33KqF4Ma7g1zp8XLZNyn%2FqnT1e1kg5249n5el7UBqUsvclnvH3eGaHFqyDfkrzXP4e6S57EGmPHuiKAVF%2BRHrGinp6dMcoaImGVvrq4%2BYiwFgiClEOatLpLVh5XXgxpAHvUb%2BYD8mqZ%2F353z8Lrnk7u5oo%2Fp8PdRkUiXUXgAFxQsXZB9xersi2QiZxgMze8pmT2mDNhMCrlljpCNU5WV78ZgJeX%2BuY98EVAlkqrHcZg89XFezZJfzktiknIEeEhteYF9Rdn0O3qRImoeqFBZ1lk1oo9SWRI15TUNqjZGMdJ0fsBfhuQ%2FmST1bKpjed%2BuFsuuGV8X5lUhRYFTgcaJl0XNpoqfGleAg8ryevinKUfOhPOSXhfFM1XM51avEsfArztVQBTCoXQHLtzoxnRrf0IIhyEYoK7gCXN5LVXh6vsZAnbfd7eYgVHtE%2FnehyH9clBleNNRBpNTBzB2mZ821lHK%2FWaTWaB5y57rpMGiHbJotUTzM9tNj9Xi%2FfX1KhEMo3m7fi98bzJ8QdxgaPFMwDp4Rt8WTmMCGHseq4d%2Bn57lwNF09TRP6wTJvc2ITa0zZmzV37EwqMaBzwY6pgEgvACNzlc%2F5Glv2f%2BEiikMsrGZ4nVlpupRVwkP3pgHwOVg87o3hiWshLVqlRhHBh9VzqntNGJ%2BDXWAe6aZk5oz0VCqaFn5LFyLOmNpiPo8IB3ZVEIAwyd%2FwAECItvTcgPeQqOiL95TYz96EEUQNrQinkyVwgTAMxI0314vkKPGUzGnTG3HEIGzV0V3qIhus0dfQLd%2BHsvLoQD8s7fkI57Y8t9qGm7y&X-Amz-Signature=8060f5768e26094be482c39e12a9ed99cf23f619a7514654f1faf22439f812f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBRTW567%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH9b966Q%2FRltrOr4QKL7ot9Rwpus1%2Fxa1HUDLbTl6LzVAiEAsbVIZhOi7UyQIha5nctVk23Rz5teUzrs4RPXgSOsi44qiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDBurh%2FHsyU7ikFhiircAwtLjBoWcQkMMj63slNpBL7TWsA2sD55Gb%2BzWlaq859gnHlvgoJsstyU7vkkfbutPiMBssUrvHb3ThlTbTyp94%2Be4fhEowWZsciL2SCvdNBsW5DQP5OT971aUMC9QZzKnM0aG8qqg8ci9f3y66IZBjY47GpXmN%2FWLt1z658P7n%2BblaNrWpukCxbTQcRd99ec%2BjWOB5fHAPMr4tZ37Va%2BRpo2fDaZe4Q37En4rQJ08%2FW5rrlLXwJxHUHEznPUpOFRpF3ktRtooPtjXXZgXApf2FhGo1hJy7RxpbTda42rd3xHh6eZ6txpLhjji%2FSt%2Bl8kjrpT%2BUgPBsVtjAqGPyWgWku04numW2Qo03B8eW6M7Rz9vs5CkewWp6F3BQMtFefm%2FlAqPBYsQATQX9xpItRo2xgEK87EpGR3CrsDHfjQHcxyDX0MpRX3aHS9Ko75OxWIp%2F%2BDGSCVQz6UOovib09pLHrLRnVf%2B6z%2B5D8osoKKxPM8%2FmKAzp45UPGV%2FMKvLuJFSgSdcRC7ISf4b6313%2FWXSWMCuJB6mIBpbmePdVHbkBKo1NDovRnYkxdiMzjimK0nzO3%2B8lKr7%2F8sjkqAau9ohuDJioxoIvpHYYt34Ej96R%2FhQhGmGJ%2FpqHGDgc7lMK7Ggc8GOqUBZQKiXxHSZJJm4AkMhEUEIAREnFGFCkt1byQMFDI1ymlWoiEMJLJkB7u4yGGVmFXcdpzUa2FbJV0SSKMerKZZiOvWfsE1sPLtQ7s9rP%2BNayzt6MkJJG3IYL%2BZL5qnMw%2FoDWabhw63XXSva3YwxVnjLd%2B6BzH%2FLReTurQzbkW0a%2FYkCa02KkVDy7mv7MbEgfpfdelzLBeXOOUMTSJHVflrAUbIb%2B9D&X-Amz-Signature=1ce021677824f57a6694489dab55457a48e59c269ce38b0d043357b1ef4eca86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ABE26YZ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCu7%2BhwNL%2BGn3WNOLpyJmqTsfsmpbZ6sxquFdfW5y7gtgIgJp1OLXPgFtgxnyJqqxPsXQznztZO8ZmluZg2vSZN0HUqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3c%2Fwu22MAa9esDMCrcA2AFI%2FjrrGFbg%2F7jYb4HiBtGwEdAFm2%2F%2By8Y8useLDIovFdctaVyKU2Bznne9%2FgTQQhrT%2FFzkuJPgOLnLKmll1P9%2F6EZGznFu29vc7oBBOyx28mBctBpbyJCnhM6UqyR9c5IEML7ZgGVqPd7uBIO5sqezUGQPX1xmJOB6I9ij6ck32YC%2B4lXR4x9JulL7wwhULeZn%2FxkQViOBTWCm0%2FI0k65KxezohTJj9ZgXomdg9eAkrBhzZYI%2BNjWPqonfGX9fpuqa8wG2WRlhQI2%2F0pmfp1COXFEVFU3XF9jwOiFeDuVlEi0L1qasKAwnAGA5%2FCb1Ulk8DdEffJBo2CBQ0o0PpJL%2FRlMoOUKV%2BnYiAS7Vl%2BRhJ0SLvLLnQbqc4JNZmrZ%2BibbZ5JrGE61bvzWRuezWUfQGBW%2BUNBwWfuuRTNkD9bbK5xp%2B%2Ff1pa8oaxR%2BD%2F7eOfulHcHZv8LY74OBSryt8VyrgkpT66UqARuRDhSA6iDVtWykhBzQtvHVWB9Oj8EfyddpkG7WE3NndUYeDCXwaMJQYHguLQVACTAotfVn%2F3z6smqX1uxmqkSmfRgnqds1laI%2Bup4bSzWdP1I%2FguCy97mgYkp2UeYeVicxXgFJWLmWqcg7DU1MUHLIZlXkMKTIgc8GOqUBp1rr2E7y2UHt4Le6VS5LQoL1XHeEIaUQ8%2F5l3aMGVb%2FShzXq0409n3WpkqshIj%2FxyGCGVAA%2FktUyXJ7TKI9sFGj8W5qOiba7uYDiBzug8icdZk8E8mYO5UTEIHSLrgahjJq5ZV7BT12EFxs%2BnerXyRBWsQ3t58U6SfRcpwWdvaZ9B1romWA6StFBMn3ZMs6%2BnsAFc%2Fl1dqElKTr5etDEtDBXadtl&X-Amz-Signature=2760ab77f2572df23ac6fdfedb504249d124b57be5ac14799d221ba3bda5ae3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ABE26YZ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCu7%2BhwNL%2BGn3WNOLpyJmqTsfsmpbZ6sxquFdfW5y7gtgIgJp1OLXPgFtgxnyJqqxPsXQznztZO8ZmluZg2vSZN0HUqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3c%2Fwu22MAa9esDMCrcA2AFI%2FjrrGFbg%2F7jYb4HiBtGwEdAFm2%2F%2By8Y8useLDIovFdctaVyKU2Bznne9%2FgTQQhrT%2FFzkuJPgOLnLKmll1P9%2F6EZGznFu29vc7oBBOyx28mBctBpbyJCnhM6UqyR9c5IEML7ZgGVqPd7uBIO5sqezUGQPX1xmJOB6I9ij6ck32YC%2B4lXR4x9JulL7wwhULeZn%2FxkQViOBTWCm0%2FI0k65KxezohTJj9ZgXomdg9eAkrBhzZYI%2BNjWPqonfGX9fpuqa8wG2WRlhQI2%2F0pmfp1COXFEVFU3XF9jwOiFeDuVlEi0L1qasKAwnAGA5%2FCb1Ulk8DdEffJBo2CBQ0o0PpJL%2FRlMoOUKV%2BnYiAS7Vl%2BRhJ0SLvLLnQbqc4JNZmrZ%2BibbZ5JrGE61bvzWRuezWUfQGBW%2BUNBwWfuuRTNkD9bbK5xp%2B%2Ff1pa8oaxR%2BD%2F7eOfulHcHZv8LY74OBSryt8VyrgkpT66UqARuRDhSA6iDVtWykhBzQtvHVWB9Oj8EfyddpkG7WE3NndUYeDCXwaMJQYHguLQVACTAotfVn%2F3z6smqX1uxmqkSmfRgnqds1laI%2Bup4bSzWdP1I%2FguCy97mgYkp2UeYeVicxXgFJWLmWqcg7DU1MUHLIZlXkMKTIgc8GOqUBp1rr2E7y2UHt4Le6VS5LQoL1XHeEIaUQ8%2F5l3aMGVb%2FShzXq0409n3WpkqshIj%2FxyGCGVAA%2FktUyXJ7TKI9sFGj8W5qOiba7uYDiBzug8icdZk8E8mYO5UTEIHSLrgahjJq5ZV7BT12EFxs%2BnerXyRBWsQ3t58U6SfRcpwWdvaZ9B1romWA6StFBMn3ZMs6%2BnsAFc%2Fl1dqElKTr5etDEtDBXadtl&X-Amz-Signature=3e6a03c259bab089ea4778984b4913000f3d014d8a39af62ac4c1e4e7e6991ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666KFCBDX%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEZqEmIuePNUVMb%2FGM3MnpWZZ%2Fq%2Fn0arnyF735JGyQBgIhANEQuPzlfXo8KlnLya2DRB%2BBtu%2BGCzd2hgliN8j%2BmG5ZKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBhwSIuVI%2B8BzRLGEq3APEljj48cpWiORsP9l2cZtMq6%2BpJmnHHtpkl7X3We2hNn9%2Bj3%2B7xRTSMr5POnqm6hDvV0OJPd55mwQnIwegJNTIQB5IzzTtWE1aF7apHjiOt7s1jQ6bTXL2r65BI%2FF4WbdI8hJtuOcaUEZh39vrsVfbc9SYMTzWwalk0pXnrb5s%2Bs7h2cJLcHxD4sWj0Ua4VFiXOnWyKCMfQQ0VmVLshvH027bToyUaRB%2Fog1aRfIYJCRKyfMaLi4B2uAY%2FvUU3lQOEPZcG6ZG0kNq0mik9tToVyttQOAOFQb4ukxGYRi1i8Uow99cSDsAXXmpIw3UhkFK84LxcgjGdycOodfdqV7g9RP5pzAKWo2vusZ8PdkgWplfu3HLADtT0vYDcNec%2FD78Grl8ndPHbZYbG3TuCubU5ZaquK7zzMonpc4ZdnJ%2Bv14j9%2F2gVc71kcV%2Fq46rdhZGioJd3OTh6Usvn2c1kx%2BbXHzqjYPLANgKwyBc%2BWM6ykdaBf2erl5VEpLNes6ogD8dIamGd6Pk4XdrfjcilQKdCQiW10Mql2oxJCuI15SDt1m2ZrXajFsxF%2BTDS%2BX%2Ft9kYniMAA2I%2F4o2FIZFrQTs6D4%2FHmWUMlOo3pDnPNJVrG3imefq7%2F%2Bjdd0hVP4zDCx4HPBjqkAe7wGWJ6oN797hGUWpEQT0DBcc%2Fsb8Sks1EguOJLYO5gs%2BmB%2FecfsnsVqgihC56TlVBLYihwaImJqFpY0pMKXM9izNPeA84Q5va40MPm9c%2Bf60ibvgHYpQJowiuRiRKwSYjJVgw3k6NTlpoKcXTunMMbZoSmwTr4h3yG4DEpjsV26azt1TB1rgk5pJZTQGi5XAX0IdSxCIx8g6sKDEzTJBRFrtL5&X-Amz-Signature=195719af96d14566a15bb2119623369ca52992d1bc08ea2827cf6674cf5fd7ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUAPYSWM%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDmSqMraoVqSeGe5Xqd5dAWahebUFUjkqv1Wes8y%2BzJLAiEAnLCiydMxuOFqZsnILnQNACuCynHWHBZaG%2BhjEP2Y68UqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBaQOp%2FHJP20MjDd6ircA5%2BZBRK8Ce7ProSecW0v5NJat17EQS9wk4VQu0mG1BKK66kYPHo5S3Hfl7LKJfLd3ZT8MVtDvshuRq3nu8EEHjZrmBF085bvzcdQkUpTZhdyoKTFVlsnUOfeC7SDLDtVFr48EamvbTDLB3d%2FI7cfkSSARW3RDjMn9XS1X5QQm53clogFAlfl8xx172lpkCJunB6WjuNV1uo0I6shgcCxkiQiOg7x9EjD%2BYHGzpLQGIR96Gxcvqm%2F4x45EVXg%2BYZvMCiOzq1Ns%2FBFni5LRwO3oTL7UEYeTS1qHMOHEbasRL%2F4H%2FQYBl0HE2SU5m6lfmqs%2FALT%2FMFQJLxSw71Djvi8qvqLemBIkAoGGps4j8YVqjCUcaShK4VdStMtgkYsgIUNxD%2FHxzGRWF%2BwXUqJ8rjLIPLkfN8GPaKva1gjhFVm0gwMM7bcNMvas1cJMuNBh3pXM4kgvOW%2F%2FXeCM%2F69lGBMocujgKxhmnjwqCZWI39b8jfMNWpTgg1IHNAvFw9lDCj3UEC3s60vLq387%2Bjz6PNqyv1j67OKyXDbu0JL0gIKW%2BgEAX4nJ%2Bb69lnRb%2BGlIreSJswqX%2FGlmtCmciULSkUk9sxL2BSt2QqAGOhLaPIJfeXEnXVgcvgqR0hAEIVcMLPFgc8GOqUBTePQw80vgd3jONS8UuzFX0ko3U3Sus5nuVBDtmO9tl9yb10776jP3i7J5LDmSZEO7IZe5T4vtp14xhmAjXeOqb1lmIndK6kpNhQuWMjERw9nA%2BUTtqq33wufZO5hR5dx1pSGfKG6MmeoxsjCdfWVRz49ORJmFJ4gWIpUOfEvebnWBdJpTk9v5%2BWZsTsk5%2BSV%2Bffk5OSpBzQvLMxiQyPvwS%2BAAwPO&X-Amz-Signature=c560c6a2a36811d8a7d86ba1fe9e0c2078f16bd41abaf8840dbc2f11b02503ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SVLCGDS%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAG2XLwQtgZGEUDLw%2BTkmlPUGerKUDEQQWpwBuSRPRrAIhAN%2FKA8tP22UjNeXRbsD0tksEG0NQ2Zp9T60YrvvikH4pKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzxwmgygsA6EcV3kU8q3APoUJbDXzrmD1VTS2j1I5BOvkmxt%2Fw4xG4Dn6Wbm387O0yku7u9NZ5CGLzpmY%2BTrkE86QYVlNI0Qb51zk3Yd%2BaD328JV9k0Rf8cvgbXf%2BfaNlhPkFNmM4g3%2BxypYsg0XddIW6AHbDZEbnhroK8Xgw%2BSWuRRRuHngmr%2B4hTDvtm5QjxAEdmPQwrsn6yJg6FZS1FlsqknL4eCC5zuCRlfjROC%2FzDJDmEpU7EY8HuyxlCqbBt9f2SvX2fvwfhm5ys6Zmzeqc%2BMfvERpfOjSKJBCeybJJHSRF4%2FXlCjfzo0KEOTywMEoiOmJC2xC3eAB4ZyPLtqVnynrlu6%2FAtvox9S%2FdbnKh104RABxDFdG%2BCOBAQHCc6p9502Ru7O3%2F0JHerVmzfmoFBBfK%2BfRiNTbTwCTFRDZ%2BFMcQB2Cg%2FEcWCl8Z%2BhP%2BQQoilfdCbfAHlKJKlXsrC2hmYjNr0Su7fhjfEEY9Sxa2FT7ZT3tT6AE9hRDwAK7hzQVLF3pT6I04hpipusWvfLcWG6Xmg3uDeqUpYRu6phdCev4PAzG9dxavg9Aju5tRv55FDu3VFm99r8YFY3gMiVT977%2B1VwuPLMTSTyZ8A14hFUZe3rZSO0%2BHcD7Af7NJ0Mnvu2Fu351ZM0bzDBx4HPBjqkAQiglRY1sJY%2FwouWydu9rPtWxTKV5KB3Hwha7enWnLg6NSz8kKJolML6fcH7QWHtUb5rIvY173E1hKdyYWKmAAoRx5ioV0WtMIwVrqI0JW%2BBfuQEcjPjdaG1EbOWIxPHPdH4Kb9f6rTyXYH1b3%2FwyHH4fo5jKzxG08YxM5EhV0aWRO0TBWqAnocRONVHisOvTu5ml1sZhRpV5G%2FLIrL6sJYUa850&X-Amz-Signature=33ff92881329b232af829798feebc01d207884b5ea28f6998e1f8ee28d4a2d7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663F35QJEC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEebW2YdZ%2FlOW%2FDIgI9YO0UVKvnWsVMTWtaok%2FPh%2FPJQAiAe102Ixed6BvfrYJwjvogWgzVesxq90Rmzh6dS%2Fh2B8CqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZmv8Zv3Azjl%2BrhMWKtwD%2FFx%2Bfxg7DMUq622zhfSeg0a8yAQhFQrp%2BTDFbA1DZ7I4tAcUSKqLtd9Mfts4WdgC2m1VnxsPxsc2hcSBX2Wdabdjyoe3ODcxPB4EjdvI%2FoDEqANL65XvGeKqbaS%2FijWFrlnz0xhmMAsymEByeo3jTO0%2BtE%2BCCnWa1%2BKOMijIqBtu4uVYkgKmdAjLD4Hl3qQXcHKRvOeA4gaUQMHlipG%2FgFcVweU%2B3bwGR5jgUuJab1dzBMyZCREgJTLDlXYsVyPlBCE5dpYBLBMmCpxbRlMiaVE8Pu27CR3jNE%2FKGCuFux5VleWZBTpgt3fnyXza21iNkRpTJLyDbFAM8%2F9vJ5dqvVtSQpexnlaERt8dI8lYCUt3cnz482KEn9xBXp5oWhDRpxpMFE%2FGLJtumreyY2eRjCnbn%2Fu9RgvP26TdfPh0n1jzUDDuuEwlOEGhRaJVJF%2BLwX3ZHOOX8Z6rM6UKmOpnV%2F5NpMe444keZlijhENrxh3rWZeKQvZLuvqYqkwUrNL6TAOSqfsjhO8TkmnHZDjG7aspcLuQmBnfj2V53WLk%2FvnWotoMTo%2BjSIwTX0UQC1TQ0q5lKFP3Z76K4jdtjCJVRfUF1IQApZHAX7CH98RZoKYTxKagLQ%2F6T%2FEQJ80whsWBzwY6pgFgwpVVs6zaqhxLOr167BbOeskkfMFhIGl5d5JfU3FiOsH1wGWTCwKATDwP4BhySXGDYBk0slMrS%2B%2FORZ%2BnXkbmfDumnylwkp2naqF7xwsyFt9%2FALsx2i03SthVaKnqNZob7h2vi0qdcypFNCD3A4TMwsRKcgoVUpntgGkJzSX7UhcK7WginZod5%2BQZFvgta%2Fznlxyg6sJqCT7EU3MSSIHxXhTTw86P&X-Amz-Signature=3dc2a30ef99942790cef0a1f1d7b8c40ba78b4d149d43e06e1b5e5481aea3f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663F35QJEC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEebW2YdZ%2FlOW%2FDIgI9YO0UVKvnWsVMTWtaok%2FPh%2FPJQAiAe102Ixed6BvfrYJwjvogWgzVesxq90Rmzh6dS%2Fh2B8CqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZmv8Zv3Azjl%2BrhMWKtwD%2FFx%2Bfxg7DMUq622zhfSeg0a8yAQhFQrp%2BTDFbA1DZ7I4tAcUSKqLtd9Mfts4WdgC2m1VnxsPxsc2hcSBX2Wdabdjyoe3ODcxPB4EjdvI%2FoDEqANL65XvGeKqbaS%2FijWFrlnz0xhmMAsymEByeo3jTO0%2BtE%2BCCnWa1%2BKOMijIqBtu4uVYkgKmdAjLD4Hl3qQXcHKRvOeA4gaUQMHlipG%2FgFcVweU%2B3bwGR5jgUuJab1dzBMyZCREgJTLDlXYsVyPlBCE5dpYBLBMmCpxbRlMiaVE8Pu27CR3jNE%2FKGCuFux5VleWZBTpgt3fnyXza21iNkRpTJLyDbFAM8%2F9vJ5dqvVtSQpexnlaERt8dI8lYCUt3cnz482KEn9xBXp5oWhDRpxpMFE%2FGLJtumreyY2eRjCnbn%2Fu9RgvP26TdfPh0n1jzUDDuuEwlOEGhRaJVJF%2BLwX3ZHOOX8Z6rM6UKmOpnV%2F5NpMe444keZlijhENrxh3rWZeKQvZLuvqYqkwUrNL6TAOSqfsjhO8TkmnHZDjG7aspcLuQmBnfj2V53WLk%2FvnWotoMTo%2BjSIwTX0UQC1TQ0q5lKFP3Z76K4jdtjCJVRfUF1IQApZHAX7CH98RZoKYTxKagLQ%2F6T%2FEQJ80whsWBzwY6pgFgwpVVs6zaqhxLOr167BbOeskkfMFhIGl5d5JfU3FiOsH1wGWTCwKATDwP4BhySXGDYBk0slMrS%2B%2FORZ%2BnXkbmfDumnylwkp2naqF7xwsyFt9%2FALsx2i03SthVaKnqNZob7h2vi0qdcypFNCD3A4TMwsRKcgoVUpntgGkJzSX7UhcK7WginZod5%2BQZFvgta%2Fznlxyg6sJqCT7EU3MSSIHxXhTTw86P&X-Amz-Signature=7fc60b8d4368a8912c43d4568b9fd4dba4b9719057647234e559f4beafd8032c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667U56WFFR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGSlF4HLwJYYzAjRIy5QK1kcXRdGh93BrARE0x8ExbSsAiB5a%2FrkQRAn10W3kM35yZJdYuGnxSY4UFiegFe7NLSMZiqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeauv%2BVNvGbGohYRCKtwD78QEsRZQ5k7AuroUKMkKuQAZ5c9gokpCBF5H7sgjJgxXzUK0Sf4Z7NHTCflV3szqmVhaiF3zwuzi12OVGI8K76I%2Fyppc9fKsSspVgfUoLuiTlIYBZXqlCMilDdhA%2FLKalzoed1XRYKeqn07nYuhsys5QI4ctIjHG9rGWckb6s2zqhmAI8G7eI7anNQZLJWL4dtbi%2BKO42t%2BpfGr59kKTN3m2bQsV9vVlSnqd9s25h3f1aB%2FsIbfeA2DwJwYcWTrRzhBbr6A15KNvSDTbWstHcRa1bdSXmwZtqt1aCJkhzuZA3dcE77DGNvNeG6ssSHuOW1SGb55ThETycOA4%2BeEen8Qha7pNHvSRPkxFgRhv25ElmHkn2b3%2Bf1o8Gie2jrQEibwq2F4clPcKOQvmmO%2BsE3awrzeDrSWX5LYQeYeZYDJ0pyX3ZxAPAvz4Kd89fELCiRXECsy72%2BaKrQvZKe8yDMczLlIvZ215YxJIWVvxQuYyA%2B6r8yBD2zKR9Mcxu3d1FEVolV27RVsgEW7TjGzAu%2B921IvDATsLWvtz6pA%2FuNvjg1BdjMyXyW8WJTUwWdiadQQR3lTph5kmJ6V86qA2pHj0eSnwwGU5gEUdrmoyrgdiUGrCW%2FRN21JFBR8wo8iBzwY6pgFSFtmz30e97plNl4uM5AvvO0vc%2F%2BbPDiz8SOc2b%2FaM0b1Fv3CgKZXXr3IgAIVuBWZxy5v0f7FX6tt9sgFm3OSFuBjHlvaJVNBybEgQ5VL6I68EWanyCht2Uyo7xLVjSZ6Ci2PxRwEzwSGeOb%2FO0tJ9rmec%2FZI1VILphyYo0BDxx31PkyZOwctIOKF2ZN0JtOQLNZaE96iRoGM6fdMr2kEhhjBIu%2Fue&X-Amz-Signature=35775c218b6deda27a67db98fdef315e1a1315c72e80d8d7733ea048dd70d140&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDX5K2NX%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEHEV3Lpgbr1kFZ5FVyYlyTagy3XmW%2FOOHTuKCDUbCf4AiAQr%2BSlRlG2I3ewIYy59laz0fft40hvrsACWZ1m0FVrfyqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIML5FxUaYXvGdyPmvsKtwDpxuXnU4UdP1P%2BBtEpf4YhXdlm5QldfH6eeSo857RCWJ3Zn1z1YNDPx%2FRceDuO67yPWE2rsTGVvmE2Kv9m9ZCRnzJpfzDnYe4MK%2FFyElDOt2en1icbxnct1sc9W5A6FmbgFbPmTlJnXS2Z0PW2LhchXb5c5CudK0tETB3dtB8Fr9Ig2XYaCQnRuTPpR7xdGkkzCVrn%2BpG%2Ftn%2BojPJi%2BkAEUmVW6wT5DhzDIJNLmFfrc42qEFNoaE8JgYELpIv73%2F%2Bh0gPB7oNjAtz314b1rM0td%2FvUGIQZYvMEjNIgX9LCX8l9qS4I9YMd3DOO%2FYQ03m2lkqWXDjhbyXpImvaOEb2Es2ZjSinrRv6yKND6ddhoTsoISnaaBsDW%2FiQGeoGtEGpCJTfzZuU8rkryMSlIYG8jCfCTQQ1MyLHeb3xgDcTKyrKio9taqlAyZ0%2B%2BaYl8lK6ZcD7RQEPx8mXakv%2B3R%2BKG1N28ivGCWuYX1xgLS%2FhFVQEe0rgI7pZAyMyFQPZO686cp2klrDs3g85GcW8AgwyahiqzW05JYTYQkD%2FcrdEdt6F%2FGu4xDWo012GRT%2FErqmNO0qsULH3JPBzWMDE48Y9vhha6HkB%2BMLkNMl%2FhchIG2FffZGA0C8G9v%2BFA8gw18WBzwY6pgFisFMlCUwylDVA2wgL4oJivXtgpZDD5%2BWFj6ajN69i3jO0W7mFpJ7kQpO9%2FPmvztY661EKgvBXj1DVGtTGHsm4In%2B0oAD6dXqvIy3429HaX3tqiBGwlCMBKNPaNme3N58y0T%2BPujayBvS06yV%2FzuFQZSslms%2Bhq64r0CtGgoRJu5hoNSHp3gIdnyqfc4hSlPmQcQ7oMEninrdS1sxvpiUUF%2BePUDLF&X-Amz-Signature=303d9db264a2baead7510e5a2016a2fe62de3339341613298ee89832f291290b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDX5K2NX%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEHEV3Lpgbr1kFZ5FVyYlyTagy3XmW%2FOOHTuKCDUbCf4AiAQr%2BSlRlG2I3ewIYy59laz0fft40hvrsACWZ1m0FVrfyqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIML5FxUaYXvGdyPmvsKtwDpxuXnU4UdP1P%2BBtEpf4YhXdlm5QldfH6eeSo857RCWJ3Zn1z1YNDPx%2FRceDuO67yPWE2rsTGVvmE2Kv9m9ZCRnzJpfzDnYe4MK%2FFyElDOt2en1icbxnct1sc9W5A6FmbgFbPmTlJnXS2Z0PW2LhchXb5c5CudK0tETB3dtB8Fr9Ig2XYaCQnRuTPpR7xdGkkzCVrn%2BpG%2Ftn%2BojPJi%2BkAEUmVW6wT5DhzDIJNLmFfrc42qEFNoaE8JgYELpIv73%2F%2Bh0gPB7oNjAtz314b1rM0td%2FvUGIQZYvMEjNIgX9LCX8l9qS4I9YMd3DOO%2FYQ03m2lkqWXDjhbyXpImvaOEb2Es2ZjSinrRv6yKND6ddhoTsoISnaaBsDW%2FiQGeoGtEGpCJTfzZuU8rkryMSlIYG8jCfCTQQ1MyLHeb3xgDcTKyrKio9taqlAyZ0%2B%2BaYl8lK6ZcD7RQEPx8mXakv%2B3R%2BKG1N28ivGCWuYX1xgLS%2FhFVQEe0rgI7pZAyMyFQPZO686cp2klrDs3g85GcW8AgwyahiqzW05JYTYQkD%2FcrdEdt6F%2FGu4xDWo012GRT%2FErqmNO0qsULH3JPBzWMDE48Y9vhha6HkB%2BMLkNMl%2FhchIG2FffZGA0C8G9v%2BFA8gw18WBzwY6pgFisFMlCUwylDVA2wgL4oJivXtgpZDD5%2BWFj6ajN69i3jO0W7mFpJ7kQpO9%2FPmvztY661EKgvBXj1DVGtTGHsm4In%2B0oAD6dXqvIy3429HaX3tqiBGwlCMBKNPaNme3N58y0T%2BPujayBvS06yV%2FzuFQZSslms%2Bhq64r0CtGgoRJu5hoNSHp3gIdnyqfc4hSlPmQcQ7oMEninrdS1sxvpiUUF%2BePUDLF&X-Amz-Signature=303d9db264a2baead7510e5a2016a2fe62de3339341613298ee89832f291290b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TDRPTSA%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T043943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEGb2vxH2F6tP1Zfn9q1Leg1nvSkDaKWhnVR1P3OTElfAiEA7g7s%2Feh3IIEtMp96%2FfngRxVUPdhQbIb3b1WrkW95I60qiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2BMQJmCnlsQyTw77CrcAxqjqOS3QZ4zvNGM5LXtUOj4Ea9PsLEOCF%2FrWH%2B0kNYfplM66XPlDHqn5M0pQxXIYeiArEzClay%2Fewcg%2FTIEaUl5rWLVfr9AwdSfrJ%2BwRy3pMosUgQuG3urO9Kjr1Ex0UzvV4GD7sNPUMRss56zGCIltNxM7DReHj5qVLE2ztMudhtywc1tOLjjbJKeYPzTbChDmyJInBw7cWANTinwcctCnbwkCZj2WUOtL1W%2BkFbxEBnwOdHTauq0uxH8tYOSolTDyIukfJ1rMb%2BxL29m10AgqrfqN4b%2Fju4nZx%2F%2F7m3QXHcOj9j0c5oRQAKOObjMp%2BU9qAShcQjX4AqI1HC%2Bc6LodMovO1JHIKVWqBB9jRtG9%2BSYSQWPnMoUAtzL1c3uA30AHkL3Gr%2Bdbt3SIxtHKat7Z9iKaxJiaJmyXJym5oCqmkR9WNDxjPQhDqEzQgfEHo8WfpQ%2BY6l21O36a%2BBWH13SCRweTEQqwj2BbukjO8AD7W4RVsvLAQLwkGGspJKotSvqjvYToAs32%2BKGUaD0iFuzAd61aJuCUi9yB2fqAc1c6XbKcQKcd3EIVEsZaZpAu4v1BiSaMl9q1aKeA2e9lUiXogvlarSfk1LLxztGgAuQ9IP4XZzQD31uuw13LMInGgc8GOqUBG0Z1fAyXR1j1sHn2nX8Krtz1VCJ0M8QDfWfvpv91nbe4ewL2HqMaJxE2OQcWz3HqMjNEdE9nB9Dle8ZxH9sPAXZdbpOgBYrEo6X%2BBpiRl3g7vXCDDemGfg2zcwBPmar7%2FNHMUQ9wtQxJ1dahKss6M2mVwH2elq%2F4QxIxUUOka3d%2F8NShMDJCMyWC8NkS%2BNvpytq%2Fu%2B60sX1NN0rF20FtjyhasyY5&X-Amz-Signature=5ed70f8b47d8f2f4fd552ecea61db3c0761246c9f3b9acd9496f43c97fa21611&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

