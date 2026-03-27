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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRQNPJHI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCjkhk0ewllVZfTVDAKzPW31xksEVLeTSa%2BYj3ddl4lhgIhAPOeI%2BheG0GePgqj1qq6%2BsPCaG2kDwJTo%2FkUSnfvufWCKogECNz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzrsuLHYH%2F7TwLEN3cq3AMF2wJHKShkPQ2GyXkEEx6tEfKE8qNrGBq%2BnOzqVDki2ySNpGFt2FSlUjQLZSQzl%2Be%2B6FA%2B9lUMtDz4LRsoWiMuy0aJZuyEueHVGbuoRKruI5j4GFZJ76KZt5xDUHr8FrCNb%2B%2B0yTjtrKtPWNRvw7qEqKbxuew%2Fz8h7bC%2FjD1g4ycn35Akz6kU5D0ugauabpXyM1etA13hrf5WT6h%2B%2BDR9Ov8nC0lTOuJbLHqxBCKF8efpUvp5UBfVUIkDQmPyS%2Bh%2FNRqIUwZ1Y5o2fZNUq8sySIjrXPbrQ%2Ffp39vLB38BHOfeh7zMdnEitfSQY3zXOo85JGlEGqWNg88MixvHCfOHD0EiMGT18kyc4Xtfq0qDZhuvceAlgpLsb9FnjvGoIYvvZpf3v3ofJTQWgy4QdOOG%2FFuTcsrgaIrVdAJGSofhWMOfWUKyBXpiXxmWTOzS%2BEniIyWizPlpwoF2HAVj8HbHFFAEWVKS9kIyE2EtrqYyw7PDrgx8KRhNzgsOlUKSt8KCIDiPTO94AZ5ZABbwXq61QU8Ot1kcDMO7S6TVVFRw76s0PW4XLFY4X9Q96tQejC1suA%2By98g9YtsW8l8LYrlj1scXMzZZwqyCcpZXJ8nzr8bfgHL8GY0G7KcAq%2FzDu05nOBjqkAU6St64gRuPECE7VvlJrqD1KO3o0x1se0t2un8mEKxNzWOyBFzMQOfwFNMotY7TIQxcUmirMtSmIVyg4bNF5E%2BJF0V5T%2F9ac8iuOuxiqsNHMYFWY3sehUQANoR%2FWKzK%2F6RcHAjKWb5fpf6%2BxvdAen1llKSa04AvIW3G4jk8M%2FlKJfgC3kDQ0FYavtdnDnknzIVzgOlQhH0X8oyfovbKCm3u15LTG&X-Amz-Signature=1e89e2f43c974d82e2d575a5157ca34338b3c4f9791b35dcbf2be90236df7130&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRQNPJHI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCjkhk0ewllVZfTVDAKzPW31xksEVLeTSa%2BYj3ddl4lhgIhAPOeI%2BheG0GePgqj1qq6%2BsPCaG2kDwJTo%2FkUSnfvufWCKogECNz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzrsuLHYH%2F7TwLEN3cq3AMF2wJHKShkPQ2GyXkEEx6tEfKE8qNrGBq%2BnOzqVDki2ySNpGFt2FSlUjQLZSQzl%2Be%2B6FA%2B9lUMtDz4LRsoWiMuy0aJZuyEueHVGbuoRKruI5j4GFZJ76KZt5xDUHr8FrCNb%2B%2B0yTjtrKtPWNRvw7qEqKbxuew%2Fz8h7bC%2FjD1g4ycn35Akz6kU5D0ugauabpXyM1etA13hrf5WT6h%2B%2BDR9Ov8nC0lTOuJbLHqxBCKF8efpUvp5UBfVUIkDQmPyS%2Bh%2FNRqIUwZ1Y5o2fZNUq8sySIjrXPbrQ%2Ffp39vLB38BHOfeh7zMdnEitfSQY3zXOo85JGlEGqWNg88MixvHCfOHD0EiMGT18kyc4Xtfq0qDZhuvceAlgpLsb9FnjvGoIYvvZpf3v3ofJTQWgy4QdOOG%2FFuTcsrgaIrVdAJGSofhWMOfWUKyBXpiXxmWTOzS%2BEniIyWizPlpwoF2HAVj8HbHFFAEWVKS9kIyE2EtrqYyw7PDrgx8KRhNzgsOlUKSt8KCIDiPTO94AZ5ZABbwXq61QU8Ot1kcDMO7S6TVVFRw76s0PW4XLFY4X9Q96tQejC1suA%2By98g9YtsW8l8LYrlj1scXMzZZwqyCcpZXJ8nzr8bfgHL8GY0G7KcAq%2FzDu05nOBjqkAU6St64gRuPECE7VvlJrqD1KO3o0x1se0t2un8mEKxNzWOyBFzMQOfwFNMotY7TIQxcUmirMtSmIVyg4bNF5E%2BJF0V5T%2F9ac8iuOuxiqsNHMYFWY3sehUQANoR%2FWKzK%2F6RcHAjKWb5fpf6%2BxvdAen1llKSa04AvIW3G4jk8M%2FlKJfgC3kDQ0FYavtdnDnknzIVzgOlQhH0X8oyfovbKCm3u15LTG&X-Amz-Signature=1e89e2f43c974d82e2d575a5157ca34338b3c4f9791b35dcbf2be90236df7130&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK4OA2OT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIHuO1JFKgKjag2T%2BBI%2BMu%2B%2FyQEW8FN6SNrKMxbBu1MN9AiEAhwlw8swvkH1EIbIeCFD78c29ovBFj5ZtrDpDGXP8D9oqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM6AJLQsSkC%2BYkTNMircA8MefUfXodc5LG7nrbQ5BVXD8D2koZoKiyrz6mbyrs6Piew8Im4ANMTzWRZ7CKr7FoccfRPS%2B6Kpd%2BpEYs%2BPajTIj8VjLKosPPkUrlJNVKWmD9ZQEzYcULJ%2B2Ot%2FA8wm0F7d7M4bxPcAsn2CbW%2BYPO%2FsdA1hkGCj0VmFeIJnrpRDHkfU4r0rEL4SoVmMcXksnFTgvsTD82oU%2FBHm6G37ZXLI8Ha5HjiGv5yyFkRc4szQjYN4Bx3j1mnpXsoavfKgJK36L67Yis7fsjwGNBH%2BJB7MGoNFhNZYw1F5EH6vOJbC5c76JtLzSTBEiO7LCf6yPLF2mzC0jxPcL5GV1H4gUgQnzsNqknKInhTyGF4eV0NCtE9tGnK7DZa%2B2YnTG%2BMvKvsYP3B08YdRDMM2%2FLg91yIxRdd3cA4it4%2F3egiZFbAf%2FqLp9uXAN2QIZ0t6OVW0qoWFVXKMFvvttlQ6dxh8YL5aH%2B9wbMiBMAfLcM%2BpWqk70iBqb9at4Ptx49ZTPy%2FO2%2BSq%2FBkTSkWZuupb6E4CDsGP5DJ8oJC4w9qZi5NCpCazAzRzRkvWHlh6CN9rqaVCRvfguBBEpS%2F6qJ4fVksIqLHYH%2BUwdIkrfy%2FMNPwbwhBGNYWNL2lmFMwpvTslMKzUmc4GOqUBlDYjml0FhIKRw3VUfUUVhWvI3yfJuvCgU1kW0esa2HlGSuohV9gwg4EL14rVLxktuk8VYypL8AxJqA7nntTJEHsr%2Bdi%2FEjj%2FMxQpFyiZuB7ZkzY3UAL9i%2BvcR2JuLKxoidG2Gv%2FbKlMufZ5JTVgC1UUn7mSDeAvXQF79VrTiwKaW%2Fs2kxHOcfy2OyVhuBtgRlI%2FlzUKaWBtMdj5WaeHpSy8nm3dN&X-Amz-Signature=1b77370e8de29e2b0fd3673de473beb5beb59de05dc1af5c192ec295d910c0be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLP3MFWC%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIA5fQJ5FQTmPUX6TOYk31dbOAFicNco4Ms%2BVxenze5orAiB72CC%2FQhHwZLOKM%2BwstIioRRWe4K9aOm5PDw%2Bl99E8tCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLwZZ7iR%2BAzCt%2F57LKtwDSwa6z8bpthLC9jnvYWYyB%2B3RKWJHiPw4D6lW8Exf77BZCpTPd3Oa2UKgUCvRdfDDmf4V5n41OzVan%2BQ27D4ePiYTyRAHKbDJR%2FctijvVkXvc0oag9YahFop%2BsDFtzeW5XhcxS%2F9NTwJecwWLSsFT2gD9jUstLPIZddZgBOAEsGGnU3afMk7dDSxZKMSf%2Fq6wFpZ%2F%2F6xqZJJ4%2FlgvjQocN%2Fmr1raaZZk%2Bnz30F7U1EkdyAXn6Tv30HJFg%2BI7MhReCRmNmwkSx%2FFlE9PClR0yZ4NCXxLD6YJIdhNgM9Fpo4j1qaUtg81rHPs3NmzNo58Wgb8HqzyqoYElTot2xSYQJ3L9%2FKPLEzob0yw6UMJCsItcQQ0Ip91O9wD1E8z2Z2zI9A3LsNpOd1dN%2BlXMpdq00SR%2BNIfRiFY99r8%2FdQHEExkXdV%2BWD2REMUXlP0KlBxmEw5OAf4fWGuoTdypF0a2DwoBq1MEIZApV9fTA%2FevYkvR18%2Bv2%2FkLoXEMi5Tkrcr1GkSzzaQS9M5YWO%2B9FQe81Yc%2FsQPz%2BUPXqqac1zGVu8pwG7hlA%2FUfVwg%2BzW6aWICYTUYPo4d6QbRT32qb9XEmq%2FNZk8cqjfB02tGrpsiIK%2Fm1PPfyVECQNwRlHG%2Ft0w5dOZzgY6pgFZPqZ7HHdsGgK9uSBZhpbPFCD%2FCtMKpEvOJmUGQqzjXwAARSkPJ9MQNhBz8WLCOIKp%2BBUd41fOUfHnUMfLtyzFrgTjaKuX6cG2Qadot7wk60EJ0TMYMZHPDHP5hkv6QutM2vn8w0%2FMep87oaj2cK5yb81Zfkksw7iHrpTvT2ZofRj2xmB4bSpM%2F4uvmD9jQJtwXLL3F5G4O6S81FiEZBJ36agtI5lg&X-Amz-Signature=77e39292e45f0c42ab2a073e8d4594340cc82c92b8e1b68e9da78bc99c118dca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLP3MFWC%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIA5fQJ5FQTmPUX6TOYk31dbOAFicNco4Ms%2BVxenze5orAiB72CC%2FQhHwZLOKM%2BwstIioRRWe4K9aOm5PDw%2Bl99E8tCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLwZZ7iR%2BAzCt%2F57LKtwDSwa6z8bpthLC9jnvYWYyB%2B3RKWJHiPw4D6lW8Exf77BZCpTPd3Oa2UKgUCvRdfDDmf4V5n41OzVan%2BQ27D4ePiYTyRAHKbDJR%2FctijvVkXvc0oag9YahFop%2BsDFtzeW5XhcxS%2F9NTwJecwWLSsFT2gD9jUstLPIZddZgBOAEsGGnU3afMk7dDSxZKMSf%2Fq6wFpZ%2F%2F6xqZJJ4%2FlgvjQocN%2Fmr1raaZZk%2Bnz30F7U1EkdyAXn6Tv30HJFg%2BI7MhReCRmNmwkSx%2FFlE9PClR0yZ4NCXxLD6YJIdhNgM9Fpo4j1qaUtg81rHPs3NmzNo58Wgb8HqzyqoYElTot2xSYQJ3L9%2FKPLEzob0yw6UMJCsItcQQ0Ip91O9wD1E8z2Z2zI9A3LsNpOd1dN%2BlXMpdq00SR%2BNIfRiFY99r8%2FdQHEExkXdV%2BWD2REMUXlP0KlBxmEw5OAf4fWGuoTdypF0a2DwoBq1MEIZApV9fTA%2FevYkvR18%2Bv2%2FkLoXEMi5Tkrcr1GkSzzaQS9M5YWO%2B9FQe81Yc%2FsQPz%2BUPXqqac1zGVu8pwG7hlA%2FUfVwg%2BzW6aWICYTUYPo4d6QbRT32qb9XEmq%2FNZk8cqjfB02tGrpsiIK%2Fm1PPfyVECQNwRlHG%2Ft0w5dOZzgY6pgFZPqZ7HHdsGgK9uSBZhpbPFCD%2FCtMKpEvOJmUGQqzjXwAARSkPJ9MQNhBz8WLCOIKp%2BBUd41fOUfHnUMfLtyzFrgTjaKuX6cG2Qadot7wk60EJ0TMYMZHPDHP5hkv6QutM2vn8w0%2FMep87oaj2cK5yb81Zfkksw7iHrpTvT2ZofRj2xmB4bSpM%2F4uvmD9jQJtwXLL3F5G4O6S81FiEZBJ36agtI5lg&X-Amz-Signature=de10ca926626855a4b03f34e92c10d8f49281d7c408cadfb7052a68e4e31c67d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DUYLIVZ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCt5Ef429wQJPRHvje6ZtY5muDLTRP%2FqS53OL5gj5egqwIhAMMUaFVqm7JWTa3aUKlTXDijzvxXh9Uuuv3RJlTMF5QhKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwC4gNWf0hkrKggkUwq3APSA%2FwrVBU%2FOhvMUj%2FwQu%2FmJYtQ3s9ZcROSQZX%2F9Yf7Mav3WYjMVQnCKCjIUBU9kVsMK92BqS6ZriR02%2BiPh0xDeETC0G%2B0teN5sIYvZviZR%2FvFcAwXylVsM2k2tLUzqslFRcnmopZkKMGzFo1gTSbXRa9cesV8xWbJe1r7TtzkCOr4Zmp0GaW%2FJcnajCz1hPrh%2FdTmMm9SuRBO3vk9sK2qu7CHeg1flndoHTTeWmfrnFBie6MNFyhy7%2Buxesv4oV1AvrhQAWvjBMNvmtqfmBktzQ4ntJNFkGIvYp7O39GeRiWi3eupvtMdU1Fp%2BZfY0yH04L%2BD3dQM%2B8%2BlaE%2Brf6KLyIzgbFE8y%2FgAg%2BznEoS0j988lk3Shw6MQNk5ixb8ie4Wo9vYTyZpJcmhGKKygOyWT9bsH9Zr0IB73RIm64YOfSP5c7Fo9yYbZ5bTArTrw1U71KlT0JtJ7cKhDLL%2BSdorl7pP83%2BGspExH1POK6ZyNnBYmfua3pcQxGhQEMybtSCF753KlPT1MlIMxApT4IKJnqeg7xHE4TT4vb2zjMTIXPmYVD9LwV5Ajv34Rtzf8Hi6a%2B8xYNySzJzGrdOlgUEtAZqxywelZfYJ7oy14Kj%2B%2B85kUo1vn5YqPPKmDzCB1ZnOBjqkAT6P1sTRVupUvL3U9O7xgkMOVN0jINdDDJknxW2%2Fp23oWJzeo41ETwQzYQ%2FnDhG8LuydZKjnjUgauubjMdJ%2B0wtFM%2BZ0cDH0QfsWclw%2Fft4kIZNu1XapcdnmIif9nYWkYgIWb6WKY60H5hOSk9ntOguMpyW9xx4i%2B5IBrG%2FHVqOm40UOjHF85ZIWOXwJWtdscwOtodeAI2A3YdnEzDtS%2FyMoeChD&X-Amz-Signature=f156349348da05bebc01663b3c61860a680a9a67cf600ffcf4dff8535e92c7ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646WLXOOT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIGTbVsG9dQsLBkVVdIb%2Bc41doQTOAi6aW5Zu4PUu%2FNrMAiBVH64CXB7kD3GCedWrRrIHSA%2FhogYR88k2UCmQTxcpxiqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiGGLhibSs7f%2FX0NUKtwDVgPeA4uzqWCJnsrNhrJc0yC6h5S7fMmj06wY7w1jY9mv3p4SrYyRKlcHtP3tVGoXslhXG2n4IcmzpQhSN%2FGjUkBw22zEWyaL3DyfBZdK9N1%2FSkAvpT5apWlJXd%2FpHCefb%2BUCv3o1tA26zyX7OIek6N302%2FhWeWgYcrvvAH%2FP1D8CisdSBpdYjllApCXkV2PQyuyJRKXMB3VmWg1HCc9HxvVGtxEKpES8q37VJpkQWJtxLhzj6PZ9sQth0%2FUHWe%2BYAFWF3h72Y%2FihQoxqUSDWqXHhtcMgH%2FA8Au2AxcyByTc47EQpQ8f7Ueb%2Bce0aD58V%2BV7KTl6onBfdXX92MjgYOJjNvOh92PVCER73o%2Fya%2BRlOEgofnNQ%2F7D0kf3QuW99vxJJtg2DRWEUg%2FhQCPe2bqtKJ222Sac5FX2i%2Be%2FBHeaY1nQk0NDZrfcTRDMRuD03IdFbxTIoU0pH6IS6xq%2B0sZbh6I5UxsqzWBfgeg1zXW1QbefLGGo9NbbG1fvi2dHHqztgwMcZy%2B%2F0L4BoIpudJuRl%2Bsd8y3zAuqF9ZeBcsQfH75G%2BTDufZmeroSK6H2diw3ToU8XKHbXWWLg1QONw3Md0IXEIY1MxO6OqBdN5n6eG4FtqwkmIa%2BM1%2FziUw4NSZzgY6pgHrPcwI3ZwYYVAehtC%2FBniIn4%2Fq9DlwFuyTwbku%2F8nV4t7DXLfJHSMDq0rBvpAIjpnSIfH83zXQcqwIklQs%2BCsODNY8zJncBE9TCa5iSfWmGGVPGYa%2F7%2FCNrAmDNXkC63Ob6nEA6SnYBvEekQYdcYgFzPf%2BiwwKGJp2CRk9M8LlRFBAU2aQHrluj75f6Nn7lyE0Btdr1IJbFWccCQOUv5xvaT2NJ6tC&X-Amz-Signature=634362acde53ce6073cf46b77f43601345a1eb17789fedf2c5f148c278a5adfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6ZOVZGE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDgN3DoJajnfT9MMAJm%2BLtpFYEQtG%2FUtVcvxsfJyt0bHQIgbxuP0hXJVnQ%2FiuuvtFh5nwUVp8bEvaICx%2FgKUgS8dz4qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPfRN9Q5G1TtIFiSFCrcA9wJq3FFjeO7ksjoGEyLE9H90nf%2B5T3eCAlqCo2lAaALpZ3g0SA%2FhkfiqnqiE6FFMu3bwJ7ZuCZEOB4sks%2BTQye6p9KvowXIb%2Boyw8qM2ayhdxpEKTo8Hp5lrKjugtSCKT45Gm1UIQgJbS0l4XF6Mt%2B%2BDL2b56EW7yOAuVyjH6zUvyMGshOh93q9kjre%2Bloo9VoySylav2CuE%2B%2FXAoPbSTOkXB7xN1AA5qYiau3bIds4vvdJEX4dxdhNqvTF8nMEkiFgUePPA3tsUDn04eDe%2BWjw%2FGjGmo95zf69ujJBHZuQquCJauRf4s7FQt7EMT1gi5bKEXca1oblJ%2FRhF%2FC3999AYunJplb6IHNhJ9vwx6PO%2BDzYcjJeGW%2F%2BWAETwSc7WcX8Ex3%2FgWGi91CBPUPb%2BU4OUG0qYp%2FpyPNq5XHTz1iA3HRf0ljIej3wc0XdIPn2%2FBxSB1E8N0u7zDQW%2B2AJys3ETZizJx9AiAon%2FinCaNy1LTSqQ9knFFH1fT5cSfb%2FtNHzTNH%2BtoC7UL%2F8WkRqkClEolpn%2F4k3eitTMP3MjysNz4sVioBXPyOpVQc7kAA1jcWKLjYSZW5AdhiMqU%2FXgchQesrNHLkN5Tdf%2FBN%2FA65%2Bh1nBECEZxTmbWBZlMKnUmc4GOqUBAqIlnIIR5knKbDKJBCO%2F3gij8YBPtuOtmYELM5KlBhRwCeINdE6vdUK0MtSL8fQIZNOxs70AyDaf1M6qR%2BkBRKgWmkOuDl1cxh053cm%2FUsfIrHGWDlkR9oTAUsYJFh7u%2BbCoJmaTxU63JfbhZD%2BaTJEQTKq7%2BgeIsKOS1Ke2lebqrkNYWv32FGYLyxnEsD3t4agClmH2GP1DucF4tKbiMV4HP9JE&X-Amz-Signature=aa4797268b9dcdde23a1d1636ae32d70deb556320310f4cea6d799f6624fc97d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624LN7WLP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIGCqn0aLU7uSOBDu3AwMmLuYYwXHO6brO2z5pjjZLGE%2FAiEA3IDad7Q9HvHHV57zAsRPYB%2FruVfZZ%2FbrBkcvJcSMwbkqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPuukylIrhT%2Bzr1TeCrcA7mB19TyAJOp1Qq1MLVIDpCL5NOQio0kJ%2B1kSsdcqvRjT%2F67JLGqo9tYeHMLAg2Q8tTtc%2FYE1cw6ycqwZok3gTEzyiwj41U2soNk7kpzxFo7mabNz93zMqDQ%2FXAd0X%2B12VHhPIR2wINpB8t%2BvzD6OzQndN159F%2F%2BKMqCuHA4GykMBrnsQp%2BwpWVgBo9UgT5e2SBle7O8wP%2FDQYK0g4tOZmo56vFbVvmAA06mQtLor5thapUlSCbn9jcNvptmGZjqzthnC8rBA5VsNuRjR4AFl7w2ut1OMwbIH4Kjlac8zOgaZ88us%2BEeYCDxj0so2SJrxErBltBt4DX%2BujUC8oxaZIMEtq4mdKNbWksViVb%2F9m7Cbg4yYQ9%2BUNUGWThDUfVepcqIajTFjJuyH2yJLQxGCLJNwub1Q8OtuOuqFy3Fz90Qu7k2xMIqK6%2F33lmZG6wmrgOOyAnIJo5eGpx08s9VLUomKdqguxYRYg9KRDgAqpWWRN5Tj4JUViRUy1F%2F46979j8tr%2BRI1uyXYgjdPyYVwRZOhWDNyRTgyPQtBtJda1LN1cuVwysWqnTbVzYSrSrx3SD%2BFkIebWYCukhrMqkvLfrg1Uj4JvZHY%2Fk0WGGrxS8L0zLjRJPJgLwBXiC5MMTTmc4GOqUB1BeXi7axFuEOfVqtlIW0kUutlFdUatDOQ7M%2BGJEUj3Yi0o3G1bwAwlQvhRQlRb1P%2Bu3uz2wHwBF3%2B7sl5jMwDb2ulRWSbRxwLZ4xQxXNykRuefGlIzDTHlpwIDpCjGj2I7uxg6kIH9qaNWZ8WXdTEmMO6jiZDSLkE9o70zgv2NtfzMnjDUdyuJ11B1%2Bb8GhAoryC7kLHcDA5qzpzNizvDpUApwed&X-Amz-Signature=4c0c6b052daed46f1311cd63ac44c2a13a3afa3955b0d791004f6b3ccab01534&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624LN7WLP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIGCqn0aLU7uSOBDu3AwMmLuYYwXHO6brO2z5pjjZLGE%2FAiEA3IDad7Q9HvHHV57zAsRPYB%2FruVfZZ%2FbrBkcvJcSMwbkqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPuukylIrhT%2Bzr1TeCrcA7mB19TyAJOp1Qq1MLVIDpCL5NOQio0kJ%2B1kSsdcqvRjT%2F67JLGqo9tYeHMLAg2Q8tTtc%2FYE1cw6ycqwZok3gTEzyiwj41U2soNk7kpzxFo7mabNz93zMqDQ%2FXAd0X%2B12VHhPIR2wINpB8t%2BvzD6OzQndN159F%2F%2BKMqCuHA4GykMBrnsQp%2BwpWVgBo9UgT5e2SBle7O8wP%2FDQYK0g4tOZmo56vFbVvmAA06mQtLor5thapUlSCbn9jcNvptmGZjqzthnC8rBA5VsNuRjR4AFl7w2ut1OMwbIH4Kjlac8zOgaZ88us%2BEeYCDxj0so2SJrxErBltBt4DX%2BujUC8oxaZIMEtq4mdKNbWksViVb%2F9m7Cbg4yYQ9%2BUNUGWThDUfVepcqIajTFjJuyH2yJLQxGCLJNwub1Q8OtuOuqFy3Fz90Qu7k2xMIqK6%2F33lmZG6wmrgOOyAnIJo5eGpx08s9VLUomKdqguxYRYg9KRDgAqpWWRN5Tj4JUViRUy1F%2F46979j8tr%2BRI1uyXYgjdPyYVwRZOhWDNyRTgyPQtBtJda1LN1cuVwysWqnTbVzYSrSrx3SD%2BFkIebWYCukhrMqkvLfrg1Uj4JvZHY%2Fk0WGGrxS8L0zLjRJPJgLwBXiC5MMTTmc4GOqUB1BeXi7axFuEOfVqtlIW0kUutlFdUatDOQ7M%2BGJEUj3Yi0o3G1bwAwlQvhRQlRb1P%2Bu3uz2wHwBF3%2B7sl5jMwDb2ulRWSbRxwLZ4xQxXNykRuefGlIzDTHlpwIDpCjGj2I7uxg6kIH9qaNWZ8WXdTEmMO6jiZDSLkE9o70zgv2NtfzMnjDUdyuJ11B1%2Bb8GhAoryC7kLHcDA5qzpzNizvDpUApwed&X-Amz-Signature=cc49639ffbb3b9bdd1c6856db6e2c1831974781f5bd4897abb1a661701419490&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDNN7TIN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIGnfWZUy5Oqgzmh85Dm1cdxXoNxT1v%2FWldj68nISpEJvAiAovvYRRMqbfxidFpabx04ciZtNiV7WpTYZMTrxy1EhLiqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8utS480Oq80W3SqHKtwDZy5RGZrErcUsJdTX6Vml%2BzeKBBeRYeA4MH8KvmDZuL7TxIlNVKIRwsX9GACQ%2FN1L39hbV9aL0g6eecLsq435HErij8aofs89h5VdVBjrYR%2B9P62Yas4Rq4wf%2Fsb4UAeBaRDyyUz1hUJTohw6I7YsrKgrJIVCmqJw7ncSIbFmnvq%2F2QNiw5bBXwGSySERCWcLbV%2BOF2AMxoZXHj%2BwZ7KvQk3ZwspoG3QCXDOet5XkxdJrVn54VV36TBz3qvnrGzroXuQ83Nm1fZ2wexRblWi0a17uoJuVHSkwEUOXz8EvKVBNknKw0zlNIXhc6iSjgCV6jdoDMPjww%2BKs9gYVX1f67zrMbP7VCFGCxVnXMdZ4zqHyMqRvt2gkdLuunXjOeKIEOaabIDqM1Olf0lLmfkO%2F1UUWyJKjpbG9lBS2sFMzDAU5I0tkLTcU%2BS69Qtmxlt63O9zO%2F9Cmo3KbC7iNBcNjPOgtcbazJdFnRhY47INW%2BQk309c38FPFz6jFJaQEbNUHeR0RT9m6KMeaJNmOmQwuyFSuBlUS3O9%2BvvqKCEAHiWQRJzt527pT1URU04OAjPhZ6r%2FdMoJNZdW5EisLFMjh6p%2F9btO2fIgZYlt0ProEi47niRghhjtBXibquqow7tSZzgY6pgFOgZK7BrYbvYF3mCVAqnQTy%2FTPI48qRUwwe%2FWrHSo7ZctbgOkuse8li0X01JGffO7WMA7xyYJfWaCIezQd%2FKRRUSfySHmYtAbMs5127a1orPnFey6JpgVEhamTAQAg0fvsNpFUNyzOD3hbfWcrwOG1oeUFGpnCbscPNBzdyaCma0nVho%2F3NDZQi0AazNAx%2Fu8DHS3Y2tNrUBAeQL1rgc2vuN3pxuiI&X-Amz-Signature=6798fff193c515260f30d911550e885fc9c8ea268c565427ec44f341699d66b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2ESJHDV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCunXxt9YDRFZn5jE%2FRrbsNAiDgMtXzbVCv84t1WEfImwIhAN00PmlYwz0HpXpBjnSMRKPW2bHTqDOoDPW%2BtQ7MAU3BKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwLkOrXeUkvMInnxGIq3AOyJArkb67zblpDfuz0eZVupPsuTjFUc8snId6wFbC99ckYB3fb4K7Ryv84%2FvELu%2FLqAjAOcHSWzdY9bRu0xIDnHhBgsKzVYRClb%2F%2FYKjRtnVdT02J%2FBRJ%2ByAW3XcOavJ53IMVbiYMY4%2BKuZw2fMADTbH71cW3HAmaQeM4kvExpugQjnFqKjlL1pZp9rumo8a7dG%2BZpUAy1IuL2MQUQOy2iWwY1boA3QAAu1UIYri3cKB1KgOHLkI5RyXpwIKGEm0%2FGLiqlfjlTMumrrIqZZUV1otZlb%2Bs%2Blnot%2FzPCwz9jUjQlVDvPI3t7FF1nyxjEjjmpfFomoEE7f8yNXGKdtKp8ZJLerfGt4Ogk1UcYLn2G1UGIg94NFPIctljEmqVFINzGmr9RnpxzuKihtiWJxr2WI1AsPiwEUwbUFn4SgsAqN1vDkGwrg5vLBaNozQKzvjoiHqm%2Fhvyp81JydP7EIbUykaNcAuSwqdqn90o1jq9c%2BB8LLcysBKs7IVu3uBqqlRDihv1%2F2X9nnZUFqVBpbZhlO6NmSkCexpNQCPHAdFFCwS8I441VmyYen2QofkBeWvnBdOmfwakPEKT9F%2BsuYP0so2gKghtyCJFmCQckflZHG%2BXh5L9Tos7P5r046jD605nOBjqkAewXX%2FV6HL4JwjHNjl1trqNiyFQbjrqCEvDzWx%2FvMF8I8a8rI%2F5f3GB1ki%2Bkz45A3JiVexPGyehe4kuER7PVupA02CnvyTMpbvv%2BDXWc5146I72EefwHeYiiBWQi0188GlJ4q2rVZdCPeKVEwaFMeUcRdTkONRZRtfbk7OYye2tajDLvVuvwZHRbTOt6JB22gY5C%2BzmWBREg%2FUkRhEkfySae95J8&X-Amz-Signature=fab66e104140f7f5d38fcb1bc764705bc525e214a411ee8ce78ddf32c7317f8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2ESJHDV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCunXxt9YDRFZn5jE%2FRrbsNAiDgMtXzbVCv84t1WEfImwIhAN00PmlYwz0HpXpBjnSMRKPW2bHTqDOoDPW%2BtQ7MAU3BKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwLkOrXeUkvMInnxGIq3AOyJArkb67zblpDfuz0eZVupPsuTjFUc8snId6wFbC99ckYB3fb4K7Ryv84%2FvELu%2FLqAjAOcHSWzdY9bRu0xIDnHhBgsKzVYRClb%2F%2FYKjRtnVdT02J%2FBRJ%2ByAW3XcOavJ53IMVbiYMY4%2BKuZw2fMADTbH71cW3HAmaQeM4kvExpugQjnFqKjlL1pZp9rumo8a7dG%2BZpUAy1IuL2MQUQOy2iWwY1boA3QAAu1UIYri3cKB1KgOHLkI5RyXpwIKGEm0%2FGLiqlfjlTMumrrIqZZUV1otZlb%2Bs%2Blnot%2FzPCwz9jUjQlVDvPI3t7FF1nyxjEjjmpfFomoEE7f8yNXGKdtKp8ZJLerfGt4Ogk1UcYLn2G1UGIg94NFPIctljEmqVFINzGmr9RnpxzuKihtiWJxr2WI1AsPiwEUwbUFn4SgsAqN1vDkGwrg5vLBaNozQKzvjoiHqm%2Fhvyp81JydP7EIbUykaNcAuSwqdqn90o1jq9c%2BB8LLcysBKs7IVu3uBqqlRDihv1%2F2X9nnZUFqVBpbZhlO6NmSkCexpNQCPHAdFFCwS8I441VmyYen2QofkBeWvnBdOmfwakPEKT9F%2BsuYP0so2gKghtyCJFmCQckflZHG%2BXh5L9Tos7P5r046jD605nOBjqkAewXX%2FV6HL4JwjHNjl1trqNiyFQbjrqCEvDzWx%2FvMF8I8a8rI%2F5f3GB1ki%2Bkz45A3JiVexPGyehe4kuER7PVupA02CnvyTMpbvv%2BDXWc5146I72EefwHeYiiBWQi0188GlJ4q2rVZdCPeKVEwaFMeUcRdTkONRZRtfbk7OYye2tajDLvVuvwZHRbTOt6JB22gY5C%2BzmWBREg%2FUkRhEkfySae95J8&X-Amz-Signature=fab66e104140f7f5d38fcb1bc764705bc525e214a411ee8ce78ddf32c7317f8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KNGGYIO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T123249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIFkq5KhZ8Yc8NdcSA97sVCSaIQcBvhHp93rOfQeRkfVTAiBTd7BFFyP4CAvo%2Fw95NUJpR1bZTOf9c3ZfY91seG7iWyqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0AH6867EELZnuLbDKtwDHrch%2FT5lwbjTkktpBewTTcNOzggU3Sheu5CYCR%2FObttxDCwpQmrW9lpi6yALkT9O1cSufo9z9S%2B010wmgxa147ltfX5tMWK902KLajbipXIFb4sVUrmfuw3f6Bdyd%2F1FYUCI18Yva4DhRWKqUuUBuxq%2BPUE80JnnFzy5ShlliPBrUbJYbi38Lr0ezhyckfSjJEJCJ2eGAO5fGftuEf8ZZkGMSjb3HXC6t20m2Qj7ezAdfevzuYZPPARJYrWZQ6%2FJp8sq%2FJTMnwACtS%2FxgZIruPH5CeVCAjgPf5q2reuhE0dUo2Xc1hCvdS3loVEZd85SQm3gbpAx6LG5bzvIBLaJTmtfb4Iw4QARGcRoBfbsfuNFr%2FRXTZaiRP2aXPdbgA%2FZBUVToQ9z1lvtE%2BD%2F3yHSQssuZeIJoSU2Nn05Ba7bUUevotPvN1yNPCCed0T3liToSt9IlkDx%2BHq8rBLYa8UFNKOrLueUSVKE4GJ3JXnfz9Z48EGt7KugQXlMln6KR28AvPB3oqKw%2BAMHJC05eCbqye2AX5DEpwalXysJgC3C05EHCQoEF3qTJJc95QdnyemTYjHcLwY4jFjGYu5Jww7ET%2FUk8g6DAgoOF3chjhR%2FMKZWgstwskVlJtUPC1Yw4tSZzgY6pgFX26dQIk6B1GIuDxXOknHSgPj3b%2FlGI5ZRyngCFkzmgRCle8FdAs9gX3wlMmNR%2FXy4a5EwSlgZcE0wc4bIT9C%2BqlnvC5jKv9siibS0RF098EbXB03piKtK4l35ESDTGIo5AryL%2BST4edosCzpK8C8TxiaxJKAa6Ch8%2B34DF5BoCUT7dApP1AXQ7t5T8Qayxn%2BMhq7LJCwoxssYKncQutuytI6t3aQs&X-Amz-Signature=4fbfa8ab23816bae6f5ed2825ab2dc47e7df6fc2c62549596d0fc58683882c96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

