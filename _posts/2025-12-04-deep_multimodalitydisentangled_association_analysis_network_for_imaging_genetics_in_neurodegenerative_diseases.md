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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQO76TPU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIAo7TsqkK2x9zz4n7KFf%2FySP3xctZepGmgkC0qoqRMhJAiA8Zqa4keRfE0wv%2Bjjbk3HFvthlgjfzz0YnfAu3fyrzZSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIM282oFxZ7akjAN9qGKtwDYc5KP0sL8L8Y2KScr1leqT%2BtD9kAL%2BbJ1tPTQlWVUv3Dm2FjBenAiOo921JDwxGs7dkGJrcZ83hFWe992UA8w3oKlkDDGh0SnDuAk6p16Mp1DTpbsO7olG5KtOahuJGZsICBRyKMkMwAhNBAs%2F2qgcqlBQeLZRZPUJLNAVZN7OvDNLq%2BO%2BGRUE6AOqw%2BWkeNEcGFA8QlvkvAWJyg0Ep9rL06%2B4W53fepKTxz9OL0fjwFOXUG%2FMZff%2BqYaAYVS5hF1uOd3DoLHoBSNo5XGt%2BX1cBO%2FDCCbPrYB8iiihs6ooXQDIkDC2C6R0DiZfH8HHTy9gxfvgHB1htxQ%2BrmGMwSYgN%2F5VCszE5pZEDwYUkjN3X67FDSEUqpoDfp7pi%2BsmBTZ1Mlez5o2zNiWDpUn2I8N9kuDVcxxC9ZkRFVw7hJ0xAYTl0bgOZ2fQISxuHemkEdHkUvFvCG1PLY3j86KAyYlbYc39PaLVJBZ8OLg27LKr0SinkaXgScaT%2Flb1l9giCFTWOlwoc3nsGPSfML9epRBioc9%2BkSrwtd7gJ%2B7arm%2Blwn0Bbb1r9lQdHL7FYZWjy8JJLV2M%2Bcfho78nzOpRkva56IPBYnSE0X%2BwPuqiAOU9aPyC0QU1BTu%2BGZlGgwrOS8zQY6pgGHXndyE%2FfED9QmQI7AUDRp85CHjwIJ7gW5%2BWTCaLT%2FNUVvvRANfUEwnQ3toKrg1cKrOn%2BLbzHdXs9i2D1QWL9A9wTOmUZ7WnQ9jhrAiY1U5LbaNnz6CsT%2F41HuSyXq0iVen8%2FChtnYs%2FsmQXsxC38mFftyBSkF0vOmejeg64WUjOhnSuDv9AXVR%2FI1jpBquHw2TZlBZO1E6c0VBXehK9eQQxkzyQMQ&X-Amz-Signature=6a6f7137d68caa7a1cad3e9493306abd45fd2afa9ad138b2cd89174898ffb8a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQO76TPU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIAo7TsqkK2x9zz4n7KFf%2FySP3xctZepGmgkC0qoqRMhJAiA8Zqa4keRfE0wv%2Bjjbk3HFvthlgjfzz0YnfAu3fyrzZSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIM282oFxZ7akjAN9qGKtwDYc5KP0sL8L8Y2KScr1leqT%2BtD9kAL%2BbJ1tPTQlWVUv3Dm2FjBenAiOo921JDwxGs7dkGJrcZ83hFWe992UA8w3oKlkDDGh0SnDuAk6p16Mp1DTpbsO7olG5KtOahuJGZsICBRyKMkMwAhNBAs%2F2qgcqlBQeLZRZPUJLNAVZN7OvDNLq%2BO%2BGRUE6AOqw%2BWkeNEcGFA8QlvkvAWJyg0Ep9rL06%2B4W53fepKTxz9OL0fjwFOXUG%2FMZff%2BqYaAYVS5hF1uOd3DoLHoBSNo5XGt%2BX1cBO%2FDCCbPrYB8iiihs6ooXQDIkDC2C6R0DiZfH8HHTy9gxfvgHB1htxQ%2BrmGMwSYgN%2F5VCszE5pZEDwYUkjN3X67FDSEUqpoDfp7pi%2BsmBTZ1Mlez5o2zNiWDpUn2I8N9kuDVcxxC9ZkRFVw7hJ0xAYTl0bgOZ2fQISxuHemkEdHkUvFvCG1PLY3j86KAyYlbYc39PaLVJBZ8OLg27LKr0SinkaXgScaT%2Flb1l9giCFTWOlwoc3nsGPSfML9epRBioc9%2BkSrwtd7gJ%2B7arm%2Blwn0Bbb1r9lQdHL7FYZWjy8JJLV2M%2Bcfho78nzOpRkva56IPBYnSE0X%2BwPuqiAOU9aPyC0QU1BTu%2BGZlGgwrOS8zQY6pgGHXndyE%2FfED9QmQI7AUDRp85CHjwIJ7gW5%2BWTCaLT%2FNUVvvRANfUEwnQ3toKrg1cKrOn%2BLbzHdXs9i2D1QWL9A9wTOmUZ7WnQ9jhrAiY1U5LbaNnz6CsT%2F41HuSyXq0iVen8%2FChtnYs%2FsmQXsxC38mFftyBSkF0vOmejeg64WUjOhnSuDv9AXVR%2FI1jpBquHw2TZlBZO1E6c0VBXehK9eQQxkzyQMQ&X-Amz-Signature=6a6f7137d68caa7a1cad3e9493306abd45fd2afa9ad138b2cd89174898ffb8a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZYJABGQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJFMEMCHyGOr3gDarRxUioOp%2BbMWRnXbgfI0GwI0tztD3r8r7oCIGWBEKgjrsmyqEOeK%2B2d3G3v0pj0FRXz5szs0iZqHFD4Kv8DCDYQABoMNjM3NDIzMTgzODA1IgzlJ2S7OA3EtmH9fFYq3AM93fKv%2BQeeC7oam%2F6TPQZyDDcicemF9bVyDqyWw%2FMahGynWLU4c%2FY3WuMTskqQedUbryi8uVdtlQvmggt54VSMxLLh2%2BszIh%2B9IVZza4KjBhxhCyvufE5GUhZXT55zZkNk%2BpugIbeUi6kAc%2BkmLrCrPzYGcm%2BZflYuqrUnAPI7ot2xEwKm2gzEkkM%2FTpl3SEmDCXhMsDUJRUIP8QPyEfhPLITV%2FKa7J6R6v91GejeN9JjbTLU6dqwq89iOVw%2BlMJCnghuiLAK3OCN9LrJ1Mjj%2ByA9f4pRDPKE0PofyLDr9o0tztrxKweeSWYbZPF1ghiOGKxAGU%2B%2BjAnaIvqvh14m%2FRZohcf5hVu6JiUIb%2B6%2BYE9KkAltv6VL6nATSTbKH6DGgUeVNik15p3Fg3641SiR8zt7cQqfwqKgGv0E0J94J0ouVOKhYI5qEiFgHhFzAF%2B66xoGE%2FWBCQPZpnFGFdTPhaBfMg%2Fi0jDJbquBxfIA1Tfw42jBW6N%2FbPJWOKKSEsZMhkpRrCHcmz3b9HRVOAjMuENfQmWRB%2BB%2B0wdfFnoDzswoLKGoL%2BfGdHsNY6kCHICvRYITGvE2aZqkRx2kVAMqGq5I809kKAxkga4JliWi2B125eFRx1EGkPt5BPTCg5bzNBjqnAX7NoF0P%2FaR9av5AuUOSCA1gPZVrfBYi8XqLPbVJPNjIOW0tHtxnd%2F3GDFcoUwM6rI4ev8OqO%2FcpBVDzoqpqhYBjQFXOfDIsG%2BguhncI1QKQJU9m6adcx9WADqfoXayi5BrNL%2FnMP%2BujFGQmVmSCaReDhCBzY05mIUBA8fpYY6ya1ijPk6K3kgM2qJllyVRkpUOkS9bkE%2BV3lvj6bGu%2FPb70sTWooI4T&X-Amz-Signature=af1d41b53cbc6b80111089d4fe1e8e67bce0f12659dfe30e4855c803a5742154&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OBR7C7Y%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCoM0H%2Fclp%2BfHjvt6W4XHhfaRbOSI2UN6BlOJ1jnwkUsAIhALeCOQ88o8wRqmSeMii1HBeGry%2FzmVro89PLAB7%2Ft3jPKv8DCDYQABoMNjM3NDIzMTgzODA1IgxxFto4sG%2FWi5KwGRUq3AO1W6EY7kX%2B4xPPS3LDoq8lu9j%2BVcSZfzktXkEplyjr7eKbwexNLv3ht8FNZnvstrXMkHriEAJg4HUQB5PxlP53PVNqmPabGhZkT7S5hqol9PI7vaJh90B4gbeX6LcKIPwOmftnsNjt7vAsKiJh0jdriv1ijsUt5QDjYuzVDxKwFmcge0X1e2bS4tur%2BMUWe4oy8ZSdxmhuiLQhxpIDHaoKXo42V3uTtStLOy7sOGLzU1F4LLg9AgJajYBu3wbMWmfEIqe9p0xzqiBUHQoxK9abVIC2CB%2BEErrrTmh3KFSICwvgM%2BTexMKGA1BkW70K%2FrlvUuk0kuj6Ih7nIALUxEyKGSC%2BTh%2FVQBYJGGChlRNdCnpQQj4N6TRaWtFmLNDoL4QtsCP3dulVqYaRQTt4%2BjmwuI9aRrvPUpU8mx%2Fhl3BG5HFaz4Lt4bKtt4JpGSGsU2YUH%2BAqRXE9ZQwpEeGKYI7%2FSMse8ZhtcHdcdQg1req%2F7vkpyVjzxEwNnfzgTvcLgf9bG0JmLqiGhlcw5vxeRe%2BNi0POOvmysSr2A9Sj0HINxF0I8b11bQd0TJ6cFzqafytab5dPUmrs1nDAx%2FReIQ4b%2FT3BRu9gGrsnu6nDE6MNGtajqMlew4WzSPvrGzDl5bzNBjqkAUxCaoqqG1wFINQkDJlmFY9NOsd62caa6rqMBmZIzGFxJc%2FbiJgwLkIIRQaQiUQ%2FxbKslNJDs%2BKohdOZwMwPor4rrkTFohCcaVoCiEGTJeFdzskhCsKWyj5qjFA5fcdt2%2F%2FauT5bBQAZmgiVQtyegnPDSB8cL5jAjEiEVTL49jR44q8sosBb5EpAEOuDy9TCbxvueQt5C2c%2FI8N7dSg6ukC%2FBipC&X-Amz-Signature=d53e6a3d0e19aa00be6517c56b51318aa42092540c62dce0d586afb73a787df2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OBR7C7Y%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCoM0H%2Fclp%2BfHjvt6W4XHhfaRbOSI2UN6BlOJ1jnwkUsAIhALeCOQ88o8wRqmSeMii1HBeGry%2FzmVro89PLAB7%2Ft3jPKv8DCDYQABoMNjM3NDIzMTgzODA1IgxxFto4sG%2FWi5KwGRUq3AO1W6EY7kX%2B4xPPS3LDoq8lu9j%2BVcSZfzktXkEplyjr7eKbwexNLv3ht8FNZnvstrXMkHriEAJg4HUQB5PxlP53PVNqmPabGhZkT7S5hqol9PI7vaJh90B4gbeX6LcKIPwOmftnsNjt7vAsKiJh0jdriv1ijsUt5QDjYuzVDxKwFmcge0X1e2bS4tur%2BMUWe4oy8ZSdxmhuiLQhxpIDHaoKXo42V3uTtStLOy7sOGLzU1F4LLg9AgJajYBu3wbMWmfEIqe9p0xzqiBUHQoxK9abVIC2CB%2BEErrrTmh3KFSICwvgM%2BTexMKGA1BkW70K%2FrlvUuk0kuj6Ih7nIALUxEyKGSC%2BTh%2FVQBYJGGChlRNdCnpQQj4N6TRaWtFmLNDoL4QtsCP3dulVqYaRQTt4%2BjmwuI9aRrvPUpU8mx%2Fhl3BG5HFaz4Lt4bKtt4JpGSGsU2YUH%2BAqRXE9ZQwpEeGKYI7%2FSMse8ZhtcHdcdQg1req%2F7vkpyVjzxEwNnfzgTvcLgf9bG0JmLqiGhlcw5vxeRe%2BNi0POOvmysSr2A9Sj0HINxF0I8b11bQd0TJ6cFzqafytab5dPUmrs1nDAx%2FReIQ4b%2FT3BRu9gGrsnu6nDE6MNGtajqMlew4WzSPvrGzDl5bzNBjqkAUxCaoqqG1wFINQkDJlmFY9NOsd62caa6rqMBmZIzGFxJc%2FbiJgwLkIIRQaQiUQ%2FxbKslNJDs%2BKohdOZwMwPor4rrkTFohCcaVoCiEGTJeFdzskhCsKWyj5qjFA5fcdt2%2F%2FauT5bBQAZmgiVQtyegnPDSB8cL5jAjEiEVTL49jR44q8sosBb5EpAEOuDy9TCbxvueQt5C2c%2FI8N7dSg6ukC%2FBipC&X-Amz-Signature=fed88b2cafb1efd4f23042de321bffe65561721cb3f04eec909697de40c50f2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJONELZC%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDGD3o1ZzDbgLSI5UcTJg9oJ7OLLKDv7cEG0iVgF3447wIhAJ3sGU0KsUaP42YMbb91C4K6NBxrCpSTqO3CxiXP%2ByL2Kv8DCDYQABoMNjM3NDIzMTgzODA1IgxoK%2BjyZzv56fqXCsoq3AP7VcMzoXBccq2RxtAy%2BNDeOD2d8EGYKJQ4iWc1ijmp7ifPMehb8QJEoAPwCSW9XoTkn0ocS1BcwHGIKvLgRyUaSa%2BQ0JjhZD5UYmrFmN6yjgsGdhwHa1AxjLERmNuZm2PydUd30DzTROTKCgt3TE2KmZNuITknQ6sFId%2FhveU1nNyUcybrAu9buJB66cLzJzpyeQElITNmYTsnw8qMSjD0db0KUL9Zok6un8SHdpSZX7e4lLbyFwKMvUdU8gvwNQn1xe9x86vAYPp%2FL%2B9NUnU%2BhTfmSQqnEStUAHdHruZpSihPlwKaK2bc2%2FVvOIUHtDI4JJ8X9WW1e7lgFZX8RhP11R0L3e%2Fvj7azxsZMRe%2FADwVtKmU%2FUrZFEXgkLweiMgUnfciHgXqArmL4GKGp5YnTFbPA39SDOv02Y4wTg5WqWQQvCAGCIuysUVVPb6aQ48cu3OLQIlhviZ%2BoUqOwmUtOdKrEROV%2BhuWJodlT%2FEfvzuNYzTqd43CKrJwvxWrKkWGL0AlQBmRzPRDGAmyu%2FDeCISrzY4TveXilwjQXfGV%2B%2BA3V78To2cnuzN1ft95kVAP6j09zgxqQ2r7%2B5yqOr39Vs0CVeSBNgeMasHmYs3a6jjkpD8r90sWEFew0rzD%2F5bzNBjqkAdw9oBBaCZ4yHHOYULHAQB8OiotqWRwH65S7mt7YAEZ%2BGwr4gTr1ERPxNgq4OL7kTBhF%2F6QVQp0XbGujtje4EDA3sV4a%2B5n3twFZUiRvluhM5I9yR90mDuTgxFKYlWgcSavL3%2FvI3jzdlOWOEFVhXNJv7gWIU1y7Nwv%2F18D6cwxmVCAXZTOOi3iYBhHeG4JVpYWyxY6crP8KwODXPgVtyUHfmMd1&X-Amz-Signature=c550cc5461bfba7acb2179c5e9e8a50c18ba8acf4e3f2e9235e5b48c985df8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJMCK2I3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIE57CQtncWosoV6LsfWeGHqsTq4sidY2l3rDt7kh6KG0AiA5odUcNtddN2Hg9jsHNZjgU9tWpnRF5qE3mZqgizF8iyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMZ7PJTKzfU3i7sO%2BOKtwDDgH8v03Xmuf2mpQQEZeIWMVFAUr7xKeXsH3NAJG6Dy3Nqb0HFPklA%2FlPC%2Fm42k4YXve9jzGSbEhO1bqn9MIDnth%2BaiHTU9Ue6rTJAnkXdZ4u6OKDyThM%2FUCBebWZSXZFpzgS5Gw0dMXVXPQxVg1iqZ%2FKqgMakMHQTG2BTpgjFeJdsy5YJHM2P%2BWqA9EwzZMWZS2R29yPaPmOdw1QwqBrmZHax6qpLfLgos7eXQiSNbszcmLzfht0CC7jrodupf%2BVsaTku%2Bq5Be2Rg7g%2BhG7BgTFMJDhzPdkdCdDYYUgvM9b5KjqoXSHQfDjNqQqJOiIDv0ITmaHynRezI7xRF3IRfv3JEeoX1vvRCZBwRMpQmhzoGdWr8XC52BGyn5G8ZuGl1ThgDpzC%2B0P57WuwpvIcseM0QtkHAkX3%2FcVa0SnT1POH3h5AMXy9s4BO2fyH3yBQ2fVNvEJ%2Fs9%2BeDTAdD0ZRCEVLgldtWhzd1uR%2FGrqWxpZntmgVFX7SLwYHBesrc8UsbEUnqL2TpVMIx1XkMiK0uSUuBjYnRJV9pr%2Ba9g47IgjQ%2Bw69Fp3V%2BhHy1GuP3C5I4qcJpaC8x%2B0tLQTvVo5DXZdUSqqvAnDq2wKNr3gutWS%2FzDduSZXhQ7zDr7Yw%2F%2BW8zQY6pgH8cNZ%2FZFvaUeXapBLsouKj9162AlcP%2FhVZmnKtnDRkdeUGv40iTVGBpJTdEk0det50b3aLowkgf12ndIMlFiyehhS%2F62r6FeZujrM9MvpkuPdRSdbFXR%2FRsTWNQcYL36oKtaQArId1atUQqHRo4NH%2BSWCgxd%2FpsqT0eRL7RKsVpDUqXcncQALNuhzC9lvebyzAGrw8Hb5oCHhksOyDIQHbsFP7ZCgk&X-Amz-Signature=7ce6e08118d3bded47ea40af882c47ea396f5702e1cd4fbc0c0573701ee914fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAGHNW7D%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIA3hXPR%2BKvGIh9VLBI9It8HLCINsvfrAemX1QPyRXfViAiAkJFPV1AcCQNQaDzCQDXUp0o3CrPKxK3EDXTUJRAplWSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMHIaP2rRANzhFINFZKtwDVIcCKn4hwxISnOwL4pNcffsu7oaoHmeyzMus%2FuN7iH5KKuofgJOXcvzN8gG%2F2VBZeMMatYPo87JpLv9rofw8K0hkYpByZZqOh3kmzRIS8AqwlycNA8AEjIWepguUU%2BfIlSIuVD6Z7XwZZ%2FL1fH3nD1g%2BuD%2BXbFfr78f3ah%2Bw6a3INyxeYDn5yT2xtZ8WAfyxB21PK%2FcstZCdqfLfBWmWvocayYy2O6nvcPDmzxLElBXcmlA90xIkTKs2cAmBS5MFNUnHoQC2YOuNND%2BzVn%2FasTktUVTU9A90wa%2Bfr505NYx%2FySjCJl30GYDBZA%2BOPdW0G3VNlzh%2F89Xk3zlXfnH79A4dAEjGcMGuDGdduTQlxAykKMAxfY5%2BzHojokq1Dc7hQgmKHsExbC%2Bp%2B81K0AYw7jPwqy3cTXmLYQ%2F5VMn12Q2DF9VQZIh9LXwmRgMkV3Lc5CZngYdV%2Bk1oqxP1ALh2ZtvOWBuFRIfVsRxdHZV21%2FDb2SmE2mGJM%2FgHKObdhiI%2FN%2FOkX%2BqemN6Ypz4w2kcfQggFH7YGI6U2Z8zhC6sXx4J4yiwD9H9BcEQpOFFdddTiHUKPxCP0VTNBs5CsOaVWy%2FInolDvrHSmshyL0d2%2BBEJ2jAIlnYhdxZqoOt8wseW8zQY6pgFKvq8gMd3PYklxRbTi6VP6LYYUNe%2Bt%2BuzgrVUvxkyH8z5cP%2FeRD7ChAIsNiLtajSfUdFBMt33EZ2dbTNB3kP8C6TkclvIO9O4bwhYBfeiarfknyHjBCrMKmytC3hjwb9hesxobNiGsa973oyo9mOecVyhoIRQJ0Nt%2Bszx0%2BEQQo5vJN%2B49KcqkMxdLe41QFYA857Po2wfHnmN%2BjtPXvLmESq9hJ088&X-Amz-Signature=c986cd5b9f2cb85f027f6a575625443bf4d9f111e69ae4c6526cc8cff114eafb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAGHNW7D%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIA3hXPR%2BKvGIh9VLBI9It8HLCINsvfrAemX1QPyRXfViAiAkJFPV1AcCQNQaDzCQDXUp0o3CrPKxK3EDXTUJRAplWSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMHIaP2rRANzhFINFZKtwDVIcCKn4hwxISnOwL4pNcffsu7oaoHmeyzMus%2FuN7iH5KKuofgJOXcvzN8gG%2F2VBZeMMatYPo87JpLv9rofw8K0hkYpByZZqOh3kmzRIS8AqwlycNA8AEjIWepguUU%2BfIlSIuVD6Z7XwZZ%2FL1fH3nD1g%2BuD%2BXbFfr78f3ah%2Bw6a3INyxeYDn5yT2xtZ8WAfyxB21PK%2FcstZCdqfLfBWmWvocayYy2O6nvcPDmzxLElBXcmlA90xIkTKs2cAmBS5MFNUnHoQC2YOuNND%2BzVn%2FasTktUVTU9A90wa%2Bfr505NYx%2FySjCJl30GYDBZA%2BOPdW0G3VNlzh%2F89Xk3zlXfnH79A4dAEjGcMGuDGdduTQlxAykKMAxfY5%2BzHojokq1Dc7hQgmKHsExbC%2Bp%2B81K0AYw7jPwqy3cTXmLYQ%2F5VMn12Q2DF9VQZIh9LXwmRgMkV3Lc5CZngYdV%2Bk1oqxP1ALh2ZtvOWBuFRIfVsRxdHZV21%2FDb2SmE2mGJM%2FgHKObdhiI%2FN%2FOkX%2BqemN6Ypz4w2kcfQggFH7YGI6U2Z8zhC6sXx4J4yiwD9H9BcEQpOFFdddTiHUKPxCP0VTNBs5CsOaVWy%2FInolDvrHSmshyL0d2%2BBEJ2jAIlnYhdxZqoOt8wseW8zQY6pgFKvq8gMd3PYklxRbTi6VP6LYYUNe%2Bt%2BuzgrVUvxkyH8z5cP%2FeRD7ChAIsNiLtajSfUdFBMt33EZ2dbTNB3kP8C6TkclvIO9O4bwhYBfeiarfknyHjBCrMKmytC3hjwb9hesxobNiGsa973oyo9mOecVyhoIRQJ0Nt%2Bszx0%2BEQQo5vJN%2B49KcqkMxdLe41QFYA857Po2wfHnmN%2BjtPXvLmESq9hJ088&X-Amz-Signature=4b71632171a5eb66155737db054a42531a3b2b13d44ec842f774f2e273db2707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XQPQJEK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIEfe6DM%2BBLFBZW%2BEmw12pFIUf72nv3UBAdJC%2BmU4lOAaAiEA9alDFyUZQ5w20hEeCMjcrgOrpM3TKYMTDiGyecJLhVwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDDZpYyB7zX7FCHuXCyrcA2n4pQtnn2sfWLhd7uXRQ%2B91WcmSNnsOaJ527dmkjyCDNjRn8s4dYHgfVKrxx62P7xfZH7gFv4iV%2FkRFAq09MSoYSbc0tzUgZssjdq5P8hD9gZ9k4zfQKTCMwP71cJRJidGHqpLfBnkkuQcIuiosPcJYijr52SNNC%2F7u0g6FlL5jpd8rLhM0TusdmZIjMelqXZVEYM2oZUdhhNWb7d5qojdZoBAL2v7ieMqZEqKvsCoxxeXNGcOfRPZDoMpRlUMoTmRiQQka6yCehaiz9YvDFjuumyMSdXLna0wMoIvd8UZ9PgzT8QeQeYdYe31RoGZqJDcUKYkhk0SmuZpCLhV5b6fETSHzSq4UCy2j9hRTbAMZTwNpMu%2F5uyBqitJPeOCrEadh3JRoNhvbcNut9a99cYKPq6iIRa2%2BTR3jCXA%2FSvaszvFQl4ks8a%2FhAEhLJ6GpJLBzVKskrdtHjHJbtrSs9o2MfgQlnEtaaWNp16l%2F2xaQSt0EZBIL4UJlD9EJvAuMFFCUbftxYZXYyKK7Tpgj96zCsjiEOoo4rXWaE1%2FBx3sJNQEMv%2BgKFKsLfuVYaym3ebpQqDbLwA9k7phyAh30OG9GDSzK8Jy3XwOA3bSGfGv5LxDA20%2BvguusVNalMNvkvM0GOqUBZy4usL2YhwfoQ%2FoCCnWG6QW5tY%2BIosJp10xbquFNYnswdTuABTDUW3em70Z0fY64BFyJ%2B2Jzy6vo2bo3Qwze0cuNHvxkH8eR0dyfBV8LGcMDVtgswDmaHkKP%2BK2NUyi%2FWfIK10dwCCU1jjqdJ92jc%2F6ntO4FbdZwt1aPCo9SiJwcMzIeWdbzw4z%2B6%2BjEb4vzj9XmMxv9YUlvb8ADY4DXhnUZeYwO&X-Amz-Signature=1006014542cafc97bdddf94de93bbb4b47559e33ee5bc151a5ae2faa1e861151&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BQT6UIN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFth48c%2FdVLnXMCFs5ESU0KQILJi3w2uBAKxwUMUBvVQAiAurenmp7ah5G7usMe6vB1ZGkouFec8vhubuNVXxDvOVyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMNDMUMPAuY8KMHaDpKtwD%2FXZ9rtaE3ILWZrCODc8ydQ3n7I27Gy5pTkAFyVHBN3iDpub1J%2Fc6E%2FBE2C%2B8zUbiLbDOPtOZXqeb%2BnnJbZeg6zYBu34pj182f1C65yJTiqkiLiXvtGfAq3zzJlXq0y%2BLOvgKZe6z6t0IrGBB0KErAb9GFMHQtb8feF1Yp7BJPU2qMSS%2B78gpIhQQaPkNeHV%2FGItSfGnNpFSVmucDPNnAFdrh2Cro5u%2BZn14PBhoL0VvfvM%2FFOHCJWJrrZxSlUdLw6q4qmIH27IovtXcw6Searp07EglWMFdObAA24Jxw02xBf8csFFDkncGcLs6Bnso2pJNFAuhx36iNsKxZ1LRPBE7iQ%2FdJedBx5EvC9jinzgfYP50T0uTCEJmuUBoGSNKnjoEsesIa7ekIS7F%2BZe6J4QHmmSNfI2bhEOvjGbdMCOt92smVTFtSEzIVZfuZH8KZ1vLYVS4Y2Csu2oSCM%2BvfmBny%2F%2F5X8ZouL3VB14uBwMKs5PGhWnhbk87FfVJ%2BKl6m2WNFXpnWo6LCFAU7%2FGprX%2B9taceD5ZIeDhxqivKAPsAU2AItTpe2aLIVsl%2FGQjORFBPKicYNWudULahjjdxoLPzjS%2BllRxC1IRMCz8deE5iodqX6JYJDkg%2BvymkwkeW8zQY6pgEqxED6X8YAo8aNjKu%2Fjtm758Hvcob5Ug6U17gXIJ7P2DxvmbfKGmX3ujLrqcKWOD32IjcJq%2BcHmlyI7ijhqhpZ9WIgmQN8zJ5sgQ4FdCyWJXh%2Bd%2BGbvk%2BwuO7UtoiSUlMeP1LYa5w8O%2FCT3EUVqblSAipZsWiOMJbt0nd4klY1HDu%2BX0Dzel88%2Fa5WOTp8zT1kpwTOTt6LglUu%2F3igP%2FWETNn571BL&X-Amz-Signature=4fee3fec2d5d44861b1667efb59a97011ab4c114fc68ac9964438f10a133ac77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BQT6UIN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFth48c%2FdVLnXMCFs5ESU0KQILJi3w2uBAKxwUMUBvVQAiAurenmp7ah5G7usMe6vB1ZGkouFec8vhubuNVXxDvOVyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMNDMUMPAuY8KMHaDpKtwD%2FXZ9rtaE3ILWZrCODc8ydQ3n7I27Gy5pTkAFyVHBN3iDpub1J%2Fc6E%2FBE2C%2B8zUbiLbDOPtOZXqeb%2BnnJbZeg6zYBu34pj182f1C65yJTiqkiLiXvtGfAq3zzJlXq0y%2BLOvgKZe6z6t0IrGBB0KErAb9GFMHQtb8feF1Yp7BJPU2qMSS%2B78gpIhQQaPkNeHV%2FGItSfGnNpFSVmucDPNnAFdrh2Cro5u%2BZn14PBhoL0VvfvM%2FFOHCJWJrrZxSlUdLw6q4qmIH27IovtXcw6Searp07EglWMFdObAA24Jxw02xBf8csFFDkncGcLs6Bnso2pJNFAuhx36iNsKxZ1LRPBE7iQ%2FdJedBx5EvC9jinzgfYP50T0uTCEJmuUBoGSNKnjoEsesIa7ekIS7F%2BZe6J4QHmmSNfI2bhEOvjGbdMCOt92smVTFtSEzIVZfuZH8KZ1vLYVS4Y2Csu2oSCM%2BvfmBny%2F%2F5X8ZouL3VB14uBwMKs5PGhWnhbk87FfVJ%2BKl6m2WNFXpnWo6LCFAU7%2FGprX%2B9taceD5ZIeDhxqivKAPsAU2AItTpe2aLIVsl%2FGQjORFBPKicYNWudULahjjdxoLPzjS%2BllRxC1IRMCz8deE5iodqX6JYJDkg%2BvymkwkeW8zQY6pgEqxED6X8YAo8aNjKu%2Fjtm758Hvcob5Ug6U17gXIJ7P2DxvmbfKGmX3ujLrqcKWOD32IjcJq%2BcHmlyI7ijhqhpZ9WIgmQN8zJ5sgQ4FdCyWJXh%2Bd%2BGbvk%2BwuO7UtoiSUlMeP1LYa5w8O%2FCT3EUVqblSAipZsWiOMJbt0nd4klY1HDu%2BX0Dzel88%2Fa5WOTp8zT1kpwTOTt6LglUu%2F3igP%2FWETNn571BL&X-Amz-Signature=4fee3fec2d5d44861b1667efb59a97011ab4c114fc68ac9964438f10a133ac77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LLVOAUF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T221521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIBk1SBuo4SpZL6PwOPrbkX9M1tSywHS%2Fs20htG39vt%2BkAiB6j60h7Elz090w4f2xWt%2Ba3BL7B3p5T33JcXdj5%2Br9Nir%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMUifMZ0z6QwITUZPSKtwDeXf9W1ys1Oaf4x6UWWVAehn2QxdEVrAyCL%2Bgju3Js8qc4Ufie9MBTrmR8PJfT3rNxHiIHkns6v83estHnQpAafnPdxW8qCbhgUsFLm8cXixs2l9X0y9nPWm7yyHX8deNwSqpW%2F8p7buZV1tIsOVPqrK1nkGioqlnGxRKcAZ4VYgcqFAW%2BiLdp%2BFiAP8uWbFpXeiRDd4kUjnRchxIYmQA12BstQlG%2BUCh1%2BhY0PevzENwFDBiW9lQcRUxOD29s75Zr6llIRCV0ZZHWrsmVkS%2BrbhLvqy81m%2FrYZseZw%2Fclk6hKyK7QLG4oiP81tZ%2FJ1LzDN7zHrqExR9oMSXMAJnWXuWmiL3yHzDfoAO3LBCN7osmKhJDHN8ZWC4A0J6%2FxmBaKkcRVRN9TZGbq5jFyD0r%2FIpxGsk6KnUrS%2FvCOvDlo9SYRzS5%2BTBRnRfTqPuF%2FtgpMt%2FgAD86IlBSQAnsyk%2FrA1Ev4mBVM%2BPnYCUvBvxV8uhi9%2FS3%2ByqnOKnW3jqOHcTEode4Fn5OONUxlOTcSWliAqgS%2BHZ5ZdFDmu8G9TkK5MQH60JbM%2BennybX99daaiFiVOQsd04wYsmXZ90g198%2BprLdwm9e51HHmHvtZiSASJJXUaWWcPKv000vXmgwhvG8zQY6pgG1uJM%2FRXYoVTmsYM4PkukewNW9WJSUdUsewpdmnEXn%2Boad9xJLb5f7FUJwg1DD0KQgXdriaWBszJb7kVs%2BjUEGOXSHkdNY59WSFRfobXd3SFyq4t9s24Mduvtos%2BKsH0J5789U2gKR0M4%2B0exC7j2PciPqamE%2BEYfoIFOoEuFK07nweSppJegDD%2Fv%2FJ9kyzBzgjiwvFzr4mQaXzVt%2BLjq6pxvGSFhJ&X-Amz-Signature=ae6357c0bda3435099e8ab811b24f4e31f9e408f0f3599be5ee3d14a32d2c99b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

