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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J2ONVWW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDFCp4ZZ9TjInoRdshMZuuovSfkd7KG5TjAPBwlrhX%2BYgIhAMOUSL8OBxre1Wsh3ekWyp3dkWLw0zS5%2FTUl%2B%2BIX9pm3Kv8DCCMQABoMNjM3NDIzMTgzODA1Igyn8R9C82dUmT55Y8Eq3ANOpQwO%2F2fw7uQ4cAcN2Q8E%2B6liSkfFfVDQM6E2S1ZEDCFWdugwL2oLHbbbJSK4AziPmF5TfXW8ou%2FPJ7rUoqR1uPSKB5ii3HKK3xvToJNRJJRRKgNFEiDkm3OvMAsazfAHdKme%2BjDTgMfgDHND%2FEP0JzRRtpuIJxege3Bj%2BTbfH4dvTR0Bhsdw5B%2By94x3leKJWTc4%2B4IrITINN6EFJ4Bp%2Bz8izDFb7o5KNWKa0dFrl3%2FdnoWNpnTDzSUP%2BMz0sN7E1anR9AiOzM%2Fkin1BUoWw32zFQ2jBaBJLr%2B28Re%2BX%2FiosgQED3eG6OCooUydwHEOYPtXC2sqkO%2FTz04yE6TjL6cccqIHEDvxK2tVUtkojRCnCVcjzNr6HEhvhyH6v5%2BzxOIOQ%2BlIdNI0OjYXg721LRzhD9ZVgVMESRh2z8jvHPuvp8VTarFEKE6f2KDeB0y3%2FncauguJMPdnjkaqWzgulxathYu9KBGLIuWdmt6DwXPBv7Qal%2BQxJnDE4IZXGG1YQ3fugt9xcW7v%2Fbv3Af81SkhQ7ZTv0AakVUrvi83Oodtnhhtgs0HxhtpbpfCtfHSAojHtNX29TVvltt7I1RcgLHLXofvCqkF4k4UPYRPtlAeoyS%2F1I120yTETfjDC8lsjMBjqkAVjDruBSxrfRM0b1mlswiiDxrYGJ9GixfrrKV4TdjuY5kFfoIHKemntyLKwuFIg8GB7mgQE05%2B8Mg4%2F%2B6lqlFKi9JILSmDX6VsFVJWyOf%2BNnVUjq2IQWqh8rz9ylm57glHaKsrnErxyRpbOp6Fqi6q2y3%2BDKmn31L6x45GqKYKtddcrBrxdW1LsUpmmRUZyfo89VkTGSN8FjIuKwfNzUdrge%2BOSI&X-Amz-Signature=04521f673a4b5f5639ee3b188032f7deb2e23b31f9c9dcbbf49e82b51b19239b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J2ONVWW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDFCp4ZZ9TjInoRdshMZuuovSfkd7KG5TjAPBwlrhX%2BYgIhAMOUSL8OBxre1Wsh3ekWyp3dkWLw0zS5%2FTUl%2B%2BIX9pm3Kv8DCCMQABoMNjM3NDIzMTgzODA1Igyn8R9C82dUmT55Y8Eq3ANOpQwO%2F2fw7uQ4cAcN2Q8E%2B6liSkfFfVDQM6E2S1ZEDCFWdugwL2oLHbbbJSK4AziPmF5TfXW8ou%2FPJ7rUoqR1uPSKB5ii3HKK3xvToJNRJJRRKgNFEiDkm3OvMAsazfAHdKme%2BjDTgMfgDHND%2FEP0JzRRtpuIJxege3Bj%2BTbfH4dvTR0Bhsdw5B%2By94x3leKJWTc4%2B4IrITINN6EFJ4Bp%2Bz8izDFb7o5KNWKa0dFrl3%2FdnoWNpnTDzSUP%2BMz0sN7E1anR9AiOzM%2Fkin1BUoWw32zFQ2jBaBJLr%2B28Re%2BX%2FiosgQED3eG6OCooUydwHEOYPtXC2sqkO%2FTz04yE6TjL6cccqIHEDvxK2tVUtkojRCnCVcjzNr6HEhvhyH6v5%2BzxOIOQ%2BlIdNI0OjYXg721LRzhD9ZVgVMESRh2z8jvHPuvp8VTarFEKE6f2KDeB0y3%2FncauguJMPdnjkaqWzgulxathYu9KBGLIuWdmt6DwXPBv7Qal%2BQxJnDE4IZXGG1YQ3fugt9xcW7v%2Fbv3Af81SkhQ7ZTv0AakVUrvi83Oodtnhhtgs0HxhtpbpfCtfHSAojHtNX29TVvltt7I1RcgLHLXofvCqkF4k4UPYRPtlAeoyS%2F1I120yTETfjDC8lsjMBjqkAVjDruBSxrfRM0b1mlswiiDxrYGJ9GixfrrKV4TdjuY5kFfoIHKemntyLKwuFIg8GB7mgQE05%2B8Mg4%2F%2B6lqlFKi9JILSmDX6VsFVJWyOf%2BNnVUjq2IQWqh8rz9ylm57glHaKsrnErxyRpbOp6Fqi6q2y3%2BDKmn31L6x45GqKYKtddcrBrxdW1LsUpmmRUZyfo89VkTGSN8FjIuKwfNzUdrge%2BOSI&X-Amz-Signature=04521f673a4b5f5639ee3b188032f7deb2e23b31f9c9dcbbf49e82b51b19239b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RYT55GJ%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIBqDruGiHuy%2Btk3KbNg8z0hS05xMG7AOkhxRxfsBL71fAiAG1LK2tyzuOB%2BytfRv%2BL%2Bz%2F3upqnHeoUx%2BGcAMChlxWSr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMZO2IueuwlkEirl5MKtwDK5KyEsZ4PfNbsH6EvsYztCZ72NUvdBJLy%2FhVnKPDsBehgscEm8946gdCLUb67wUHUgw8YoMGUKlwYni4HtrxjFyXyQmp8g9TgeTx01PoCeAB%2FzHxDKKz60s%2BgPCdW8oD7uKJPaov9289ruwwMCKvljSlevEZLvguVrQ7dmcex4CstHKk2HbH6CyzVcDhTpicCP3jV2emNBeE8bfVW6H%2Fr5LVR5bomCWQNku2omCjqV9EI4ijBM0CQdZsQS7wWzlFgri5lNslD84r%2FQuUHoqibRNLtgtInGqEr8%2B0TdIo5VH80Xpj0LJRuRUH%2BDVBStlBv%2FVAWqDfm62H4sJv%2Baiw4WZCeeBwIG614JMVy2thZfUTCBYM%2FgqgKb7mBM4oPn1f14KZCwC6YcW9z01s5zCmMJH01Smy%2FRYxrYAFYqZkU3bdQCFQXrhZx4vCBKU8XXWMykZeldyKrTPGs3I2WKb40%2FgXbvqVsurdGsjkw06iy1kU4fJGylLply%2FoLzun9tpwCNV%2F4VYAA79oYRHvk6U7yzNGy4sLdwuHPOIHz0tTtwA8U31QtLU%2FuirhfY%2FxepDQexK09DutPwFtliuGscLGm8RRFWhlKbChR5tCyF3EqdDgw3AC5xzjTZHTHuswrpfIzAY6pgGnAeAVfAfqhnwxPGsYcLEh4IcLVbcQbmk6nB50%2BTSqqAlHh2YZDfDDrHHte4b3y09icZCRNB%2FUL9%2FaJsttaxwfU1v6DMnoe0WfYXEjYH204Mkz5CRYDi5QKU1%2BQB1dPUfYnSSn5blO4mbn9veSsYbL0lY81l7g8LKnr5zgNpImnIIzK5DmepUvTcV8LSrqVkGrszoZzZRxlffhBbHQOYJlaLtkUIMm&X-Amz-Signature=2d18b3ba84e2bf8018cdc58f9ed2b97ddda04f42fddb2f0facb21d306d738889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667DLVSXM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDvOwH7O6%2F5SXyrIEdxSoJM%2BU4BNi9rlsiDBwr2BarDegIhAJ3tN4YlI8pei1DVD3f2sHSy%2FMjUdeXMFlIOIeJVJ%2B2yKv8DCCMQABoMNjM3NDIzMTgzODA1IgwytlQ3cVx2MftdKZkq3APshVn7JDWm0nuOVvvQH%2FCalUnoPA3DlRJeRnyWkT6xEFBfXapLTEgE79xOTG9Oczj1uCH%2Fo8ktY5ULb9JVLORRyvYmI7HWiIA02CFNChMdSMDU9NWwTl5yoGxTcF8yPA1xqfMRGnGg5uYd9h5zTSyFAtbP%2F4oNH5xxhOmZdTFVcL7dnMSnAZUnZidrQ6n0ot%2FIeiV7OPkoanU6muznXYBWimPI5HDeUiJ9LmEr7WjfKb%2Bihd2RucAkmWY2O3Qt6%2F%2FKwlgmGoZPkuSTbY581%2Fh0sCHqhM0Y1e0t0cFkW%2BbR92oi5GNhTu5vG1G5X4OKszkRdtrW9UqwDjMjUcAsWpbb1dTvbkdCID584wCUFRKfC5T%2FK%2BpZ3FVLKUYQ6q8soVCMnPmaTvHivuOTN630gXt0m%2B%2BWp%2BVZrLMC2APsIBucCjWMQiEV9q3I%2BflRLgHaEgFD4tVjg0yyy7O%2B3Nq6vHx3l7R6iSqdlXEoNrofw%2BrdB9PfDmJ2mOIyEkVZPSkc2fkfpPciDwOgPK%2Bm3oTjRh%2FRhwOgU6XL03JaCsEGZzPFWdbfB3Csf4ElXtHKhavgTCRByUIsL9gTMkL8orVPKqnI4y%2FyhU%2BStGx9uTDTgyp2V4FP2QDyae7xfVsGyDDclsjMBjqkASqWCz1HHEXVNpfXqIcHGUUVO4flSIM0wnVK1RvNQqXDd939%2FVgeQmSUzPsL1FBgdfXvtS7EliK4j4N28JI%2Bsx4BPhdCroRi0W376jUyNHRnMTUSXOyBfBN8GMAMZ2bTtIO5ArkSZCQ99xUrLe1GM1z52TUM2eksMsbBFz%2B4fJT8a3k6PoBNAaSzygRBvHUKi5HuzyN6zpxVeAt0XpU4Zh1BWUr4&X-Amz-Signature=4da468388697422735681695d5dc7ff465f13b37f0750c73760549eb3fe6c2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667DLVSXM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDvOwH7O6%2F5SXyrIEdxSoJM%2BU4BNi9rlsiDBwr2BarDegIhAJ3tN4YlI8pei1DVD3f2sHSy%2FMjUdeXMFlIOIeJVJ%2B2yKv8DCCMQABoMNjM3NDIzMTgzODA1IgwytlQ3cVx2MftdKZkq3APshVn7JDWm0nuOVvvQH%2FCalUnoPA3DlRJeRnyWkT6xEFBfXapLTEgE79xOTG9Oczj1uCH%2Fo8ktY5ULb9JVLORRyvYmI7HWiIA02CFNChMdSMDU9NWwTl5yoGxTcF8yPA1xqfMRGnGg5uYd9h5zTSyFAtbP%2F4oNH5xxhOmZdTFVcL7dnMSnAZUnZidrQ6n0ot%2FIeiV7OPkoanU6muznXYBWimPI5HDeUiJ9LmEr7WjfKb%2Bihd2RucAkmWY2O3Qt6%2F%2FKwlgmGoZPkuSTbY581%2Fh0sCHqhM0Y1e0t0cFkW%2BbR92oi5GNhTu5vG1G5X4OKszkRdtrW9UqwDjMjUcAsWpbb1dTvbkdCID584wCUFRKfC5T%2FK%2BpZ3FVLKUYQ6q8soVCMnPmaTvHivuOTN630gXt0m%2B%2BWp%2BVZrLMC2APsIBucCjWMQiEV9q3I%2BflRLgHaEgFD4tVjg0yyy7O%2B3Nq6vHx3l7R6iSqdlXEoNrofw%2BrdB9PfDmJ2mOIyEkVZPSkc2fkfpPciDwOgPK%2Bm3oTjRh%2FRhwOgU6XL03JaCsEGZzPFWdbfB3Csf4ElXtHKhavgTCRByUIsL9gTMkL8orVPKqnI4y%2FyhU%2BStGx9uTDTgyp2V4FP2QDyae7xfVsGyDDclsjMBjqkASqWCz1HHEXVNpfXqIcHGUUVO4flSIM0wnVK1RvNQqXDd939%2FVgeQmSUzPsL1FBgdfXvtS7EliK4j4N28JI%2Bsx4BPhdCroRi0W376jUyNHRnMTUSXOyBfBN8GMAMZ2bTtIO5ArkSZCQ99xUrLe1GM1z52TUM2eksMsbBFz%2B4fJT8a3k6PoBNAaSzygRBvHUKi5HuzyN6zpxVeAt0XpU4Zh1BWUr4&X-Amz-Signature=9fb8aad97bf3dc9cd06815e0a5b48eee7dc6327b101cef6ded5769b8b2cddab8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636FEXLU6%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIDwYmXYZR6QrI6EFQl1O5RQAO5ORlYe%2FcnBgZWzXwfWpAiBMkHkxBUpaXxFUg%2FJrI0UUBkjtWNeTosW2D4loxpr25ir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMnKqVMDDIcvnWuNRUKtwDrwISfnKAE%2F9L7IEJX2iiJyDaljlRG8daI3Fj9ndWGT2xqoxQFX6wmskG5ReexkioHAoPLhAu7LDtytZGVV3ec%2FgQofpYOZCYhVw598m4SJ%2BGNeMiknTTgJNYt4Z7Twrbk5g9JmwvH0FO%2BrbNBK1qY5iB%2F8mXTnOimG9Gwx8Aps7wv02TIvErxxxqcbRaNmKsQeOoNCDwfUzEYaAyygMV7YZ%2B76jkSpWZRinzJLiLUIvDfiCgNaGaK7%2FdvD8row7%2BPiNezJJl9pLBmYcoGURwXAhB6D%2B1uPK3jqbV6JhzOWFOljN8frEivBjMIlh%2BiX62CkQyf5LKQNPCjF0MTOihF1rH3AQgkVpMtYE8Ar80gCHb1iLtqZtGCXvczKn9gD9SbUuckT7WlkS3lygnwufT3%2B6gWMpNfwxcNsZagFKMDmUv2y603Wm6mG5izN7GAihGG1a7cVFxxgxFUbsQAqmbML3T5tzwmGJxFnei33ruPG2%2FxuQauxPTLXHAc4UmH2yzavx57O3bTXT4l34nUn4nx%2Bi0Qx5CgKrVISSd9SnJBu%2BJji0YiAQoRN7%2BwzL%2Fxu05%2BuCe%2BL89QXX7ZlNLOWabNdVXWnTHwh6G13qaVRCdrnOErIY44r%2FDEpuKyKQwjZfIzAY6pgFxXsi6mTBSohBo8ZOSIo%2BYNCnIeWkasITxEQolfnJBtgcUUIYWqPfiFohPAc8ssNBuHmvxnXeoGlspNhzzxF8pjJ7%2BHGA2t6t0NU7obvO8J%2Fvocz9r813QNy799FBH0%2B9%2BZUrLx6DyJ2ZLCYW8LOOIWpE%2BGCh9tlcfzEppKqgoKVenKgy7avkAQ1YEDxOB%2BTd2cvYUusB8RMNGpTClIiMjoaI0Pc33&X-Amz-Signature=9a26fef934fa41e15563f5805d9742539c6c804f7b474c0ed4bb7ce42002a298&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDQXDXPW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCWSvnXRbp3WpKlgVhvdTfU7mOpD%2B5ZXytT46pYmmkcDQIhAPzw6PClqMaO8QFCKGF%2Fw2khDGLRHgOsC89lT4l7Pf4OKv8DCCMQABoMNjM3NDIzMTgzODA1IgyPv70cBaR5%2FMFBjHgq3AOLiFNqxWMaCPDjWZzg%2F3wutSGYE8L22M3Je5IpTehMrlHNMqhBAVvn%2B7UF4%2FeViz3W9X8TOAuVW927F2XMZH%2FUMaOR1PuObEwKoSPTLkjGV3EVgr4eczY4O9YP51i3PResOGokMe3CNYHHkTX0Wg6xbf6Maex5VgPxERpL3GRDq0gRmuPKZCiuFuzDDLRJJ1C9lnpQUfd%2BgYOUqQ9lnrdS5URil1%2FUgMkmqf0%2BqRjUaLa%2BS1xbE27PHmm%2FberGCLPajrWjCyFiZTsKWjQq1H5zDD2LAaKlHyETPo0WaJcLvFRnHw9i6esUSpIjqVg%2B88w3k2JlBYvHCAC6ezNVSAi07BH6RXoSPkcZOziqy33Dy293SDW7hhqLJEVQ40OI9m5F8D8h4bGMCRPW9BEu6wxm3BEOQWogZBxfYZehtCkGfTR13eeHW3cmVU%2FNI49UIkUnXH%2B9mADC1Zt08KtA2HFD5xKwMwKoDlAE8R%2B2kDhOU3JOBVNNFBwWmxXDgXveEA8AAppgBgK0Be0lua1EucvtKhghtfLLeFRDQbNpO%2FDXvEKlszO1s6af2gpXMBDC3sLsWtMtlFmg9Jec50De6Y%2F33250b%2FZBxm5P3IgwocaY3SjclalpbPQR7ac%2FlzCTlsjMBjqkAXp8FNiENA%2BwN%2Be26RcfLkMCAnr2eANqW8cwAhp6RnMG%2Bi6YYNqWkGKyuF0w5nONs2WWSKtnXKFW4vTW6hQuPEiwxk07ElumcMHuc9K7ko8Hee3BsmpTdAF%2FQ8KR0BDTmn%2Bmpup%2BvgcKkOTNIqx1k%2FHM5cP3KLSssteGOECCoW6KFmlLJsha%2BilDaGKt8tCSCBieOH23jNizCdeuukD084BvTGQp&X-Amz-Signature=966eca61e87080a46dabb524539a2429f163522ed199927fa7681553f1319168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFYCZZTK%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQC%2FLe5vtnCOx4P7I61yTtlaWxp%2BzT93RPaFy6LQ1oI63gIgAiBJxH9A2nVS4WJ7i6Db07wVAZwv3v253G20cX2LuEAq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDDJU%2Bk23jopbgUtuPCrcA7fLMoZeCICmAsT%2BDNNZVMMEzhyujfaFtQVw0Gv5wSEhF%2FmqUuqa0CQrcAr%2F1ByQj97mV5t8DrMOSj5aORinECZnTj60Fs%2F9VTFQW%2B70aLA9gfwqL1cSE4GY7B1z%2F3XnBP%2B30ruIwdigTZQfgw8TzjrAz8C7xwJMXP7tni6ZS4QonM2PpPrJBs7ArtF302%2FhvxYqhcqgkaQCnSR830C3JgmMXXJPbsIF7n1SEEF3Gv0PXqrVISleHf3jAjSqwjynfhycJ6MCNHopiJHvhJyho8TnyGdXd9yXWHw0zDCwJEgM0nqB2qqWVYFkZZV2kThT9cByR%2Ba4ltV9Fvrr%2F8sA37EpB9qgYF3xZ09vecgSzqfTrOhKEXbT11Cf7tXF9oz720PT5znoucnDcy%2FST5UP50hqys8j%2Fc4GtV2XQ4csxtrFpP6mvHc0MrOAgg%2BAJ74bu%2FI7MzMx7poUeD8mN8S4%2BXTs3rcauaHLyxLubMDjMagmZNuECJoyD65glfqrlyL6j0Xgr8%2FucllpS2qqcYo%2FwdLEz8qy%2BvW00PFCTbBZhfOKz38ds84S13efKpQ%2Bq%2FPo2aqXN9BTiZjN05W9UcuW%2F1EvshpfjIWG05Cv%2BHlZ84GJ04GfQBlvPTWc1QELMK6XyMwGOqUBX1Hm1cuDa5Z%2BlqYPgIJmanYBVPFJ3KYYB24MC4qf3ur7KQTFbk6iW2cwDykwaHMkhErt%2BTvlEtYBZVLi8Z0zVL4%2Fpd9qsSEsReSe2xl4Pmz8wdDeQSmNGSs7OSaNRjRcdAs5Jj7j%2B9VA4zq%2FtcQLBxa5QW1mebs2CGK6Iqx%2B8ZYN%2BWOWSkK5n%2FZ2oUrjJwFnBiqCnko6wnUbov0YtsaqpKFa6Je%2B&X-Amz-Signature=67d64c91de397e84c6b91de18a9add6c8f09f86b01ab45828f769aad9a910517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WOCIMML%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDZW4sonzEkdx9ZlgVMFG2xGXoBL%2Fz27oe8xayC07P1YAIhAPRwdEYxMZjXDJlM5YyIaQQo0WxEipkc10uaFkM2URbLKv8DCCMQABoMNjM3NDIzMTgzODA1Igw2id3KA1dLnzcSgi4q3APVs1HNTE%2FFQkc7zUDeqU5GZVWgV7maRQzKE6i6xBOJJViDrT0JCT%2FsSOuu2b%2FAkETgFu0i6kxXTC87TWNCE0u%2BVzfXs61AYIbBiQS372G82cqnUJNgSFjM4K%2FsYeBz0P9dCiQlXn%2BBBdoeuY%2FL4W8DleqVSurDym3kkUO%2FRFI%2BSHF0ISxRtYcX9pzE9YVo3hGFCDwlX%2FPwgpB%2BOEzz0oTwhNAw0r9uj%2FLa63j%2F5nk4YLqXnWBvWlzyWVWbSzkNtqQA%2BMO64In%2BQoC5RYxQGMwXzX2rs8%2Bylt2yNbjOcqOGsDc3Yz2ZvLdf7r0V%2BUFVtdjkJkqQHjrVSQGji0zL7KkiBhjJIUSRcDV1%2BHuSy4mAb0kdVW0YPGOgX1nbHRDFLaJA1zXWSNmWA%2BrjBdscDFWnJ797YW0VfKYo8hcJYDeSNIAmr9vt9SRzj9mq%2BZjarzlo42U%2BP3dWBuMVbYD1tTX91fQdweGp53n%2FefvcgCXW8mIZL4zP4kCyj1CIfpLp%2FqSRbbJmDusMyH%2FMkDhEyUp%2BvtPzWcAPI5YLShI6F90pen74g0tHC2u%2FWKBI%2FcNeYvDLzZsnuFggl%2BHv6Ivc3GUEeK0uUz5Mu8g9Ftad7YuYSUxbCUT372sqBzFx%2BjCNl8jMBjqkAaYTxzc66kWV9zGkkpItRS0cHBLHs4o2Q2dmNIy9s5khQbCe%2BzbBXVwoAUuoumyCendMaEd9yFn6x%2FJZFwxSu5GhZ0kGVX3wLDSSBBjEMNqnAOlCqBliq5TeqQpXWsxs69tYOnN1tg1tVnPs57pfQwzQ9O1sn%2Fz6Mi3MXPAG2S20Ga2i%2BU1NLZQOpSwu%2FG8L%2BwonW7IQUTjPhqjQJvcDxOmUZPiD&X-Amz-Signature=ecceccf0cf36e8004423c77f69473f1141e1c3513d10e85413332f8f8abb7436&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WOCIMML%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDZW4sonzEkdx9ZlgVMFG2xGXoBL%2Fz27oe8xayC07P1YAIhAPRwdEYxMZjXDJlM5YyIaQQo0WxEipkc10uaFkM2URbLKv8DCCMQABoMNjM3NDIzMTgzODA1Igw2id3KA1dLnzcSgi4q3APVs1HNTE%2FFQkc7zUDeqU5GZVWgV7maRQzKE6i6xBOJJViDrT0JCT%2FsSOuu2b%2FAkETgFu0i6kxXTC87TWNCE0u%2BVzfXs61AYIbBiQS372G82cqnUJNgSFjM4K%2FsYeBz0P9dCiQlXn%2BBBdoeuY%2FL4W8DleqVSurDym3kkUO%2FRFI%2BSHF0ISxRtYcX9pzE9YVo3hGFCDwlX%2FPwgpB%2BOEzz0oTwhNAw0r9uj%2FLa63j%2F5nk4YLqXnWBvWlzyWVWbSzkNtqQA%2BMO64In%2BQoC5RYxQGMwXzX2rs8%2Bylt2yNbjOcqOGsDc3Yz2ZvLdf7r0V%2BUFVtdjkJkqQHjrVSQGji0zL7KkiBhjJIUSRcDV1%2BHuSy4mAb0kdVW0YPGOgX1nbHRDFLaJA1zXWSNmWA%2BrjBdscDFWnJ797YW0VfKYo8hcJYDeSNIAmr9vt9SRzj9mq%2BZjarzlo42U%2BP3dWBuMVbYD1tTX91fQdweGp53n%2FefvcgCXW8mIZL4zP4kCyj1CIfpLp%2FqSRbbJmDusMyH%2FMkDhEyUp%2BvtPzWcAPI5YLShI6F90pen74g0tHC2u%2FWKBI%2FcNeYvDLzZsnuFggl%2BHv6Ivc3GUEeK0uUz5Mu8g9Ftad7YuYSUxbCUT372sqBzFx%2BjCNl8jMBjqkAaYTxzc66kWV9zGkkpItRS0cHBLHs4o2Q2dmNIy9s5khQbCe%2BzbBXVwoAUuoumyCendMaEd9yFn6x%2FJZFwxSu5GhZ0kGVX3wLDSSBBjEMNqnAOlCqBliq5TeqQpXWsxs69tYOnN1tg1tVnPs57pfQwzQ9O1sn%2Fz6Mi3MXPAG2S20Ga2i%2BU1NLZQOpSwu%2FG8L%2BwonW7IQUTjPhqjQJvcDxOmUZPiD&X-Amz-Signature=5631ac06dc74b3fe11943271af57de7765253528f7ddb9bc174846ac999905d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WEAQ6T5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICwmrN3YGLCBnseCxhWULatRHg%2B%2F7j3yF9i0TJV0D6FRAiAHPlkUC99Ccw19weXM4cdsBaRuQUcT7SyHn4dDm4PaIyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMp6261xNWLYmgw4cyKtwD0Ij5QSAZN3mvd6ntjpkn3GyQJZbo2%2F5CLfCWQCIgTd%2F5b%2Bfntfg14hrhyO%2BkNUI6hWmc9%2FDX%2FLAhicCi9NZqwizPfCWHT1Z3ThsmztJhwzCd9vwfWDGQi9k5lUgTKCKVnqMRHgpZjDzlIxmfATHve8rPtA5ZfBlHQlAXYnC8yuDPkYPJSbWIYuGOTETQDxVWu%2Foil%2FXrOl74uw%2FLHdAUXD5WMp0GFJoMg1OTJxRaMUB24w1az9BpBb0tQP2qpPbpStShxJRpp9WsQ4Bb42QOlPGY9DYDvrA8TScbjNI9aPws7R3f1pjvWLRbyQRdcBytAXW4WmbGjYL5IyPQqJ85Nt5rup6rQF4Ppkw4lo%2BFV2CO9vICxQYXxRP4C9eyyC9pUH3%2BBvt0quI%2F77IwuesbFiFQKhckEcGSTWrlMDqWfU1n1fx%2BA1%2FK37y2OxMKaEkbAxmIWvCt%2BLXS%2F16BHEDMXahWW6t%2F6DgGsnnBWYWN64C3L2eEJRUzyCCqW1gy%2BvWECLJTdPFvN3G3KL57ZYADKC6Ix8RgZ0hDxKhpHSgENE7ztm4MT2idi0HbRwJjPaJ93Ca8okKUhGnitr33yg8HJlBq0D5HargpevbWPYMZ%2BTQuVTzRC4dZHLQKJfgw85bIzAY6pgGXs9MZolj8cpv3q7VyE%2BepkF1x7EDNiDOtVAxXg508SQvpilhEd1myOK9Nw2QDWrbZ0qbYskJHrTAi%2BbK6AzcV8ZLbqP%2BewpS4QWgfEZbZzwtVyFP09ZUebTtCTeicwUjXsSMUmNVom19mp5kEOVeWufoThQpx0PDM%2FEF0DUJMDGAIpDrHyZBF8i%2F4zzFakyTzULMO8SxRHQ3hLITONEZY4iyW9Ic3&X-Amz-Signature=e3c2d7b13ce87a40fedaa686f2fdfd8fa6ae7b8e46fc3e01646e036fd262dda3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGJWJN6X%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC4lKRL9Btn3sS2NJg9G9JFzhVpZqGwsyFSXRqM2kan9wIhAOJu8QtCxB2I0YFftsr1GeCpoVNFKPmQzDMFQY962GwDKv8DCCMQABoMNjM3NDIzMTgzODA1IgwVvdBNQ%2BoS1kangA0q3ANNoQh93gGcOQkbI2Loh%2FzUURfPt0Xuw82anx3yv7Uw6K5%2BvpoP5zFAoVs67ekoRTNo2LjBvMDVI80EhCxafVgwUl44SeUBaaY5wWayrLs7T3pVptAZpFypT%2FZbCSMNlWM8uns1MOr596iPBDwihBudC7kf5Rgl1rLiVeVJoJcCdngdI0ST1rD80nkJ9l%2Fa952%2B%2Fy8R26hM%2B6%2FgjMC6Mmh2OavUUtKVFyJuK8MZmhMA00cyGUlDzfEjcaZ0NHQ%2FOR6x8vXyGfzrcdMb4eplLD7mOKq6pdaoFLXCibGzHCjUmMcL9q%2FsWmUxPcG2dqP24N%2FyaOeVZcLkOZ0qZrPasS8D%2BjrhHTMkc6snUmkPgl8tSLtot5OFwqhgDPwnGnONiXpUdIQDt1wf3ENtP7cMy66o1Yj3c2fSaXjhC7B%2BGDt%2FuD1h6OW%2FtSRM8GavIkEk84Iq3ISwNByW8UI5WjkOJCdXJ1dwo3ID56AlIR%2BFoV6qsomxDC6JY286fLJnwTCYO%2BdKNMDO2x4lFLfEaZMBTevjoZv9QG6idwc%2Bz1rQOiYBUbzHll7hrv5%2B1g55Re9QXs68nndR%2B6qMDV8HgaB3a%2BJI6nJmdt30jAfKnTddAyDuOUvPMTRi4lAjZI9b2jCClsjMBjqkATL88F0980oiJzrMC03sJJEBLqmGJ15dU7JBOdarqow%2B7cb28zVtjRAnnYagn1uOusSUwtuGXKptoHzItcZTHm0OFeZKzstO8KMi92ei%2FDAZtowRRHBmZesSVPAFY%2Fr1RU7lUql0nlOL1mPZ6V%2FjgVMv6CwHqURlfL%2BVO3xvvX43UgLcxckfBpj1pkbkiYEzl5cUNnn87mro1aLXStqFkWKc13AG&X-Amz-Signature=0723d9929ba48046988cf83e13ea30e3b85ef2f50417835f9cbb7bf332eb601b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGJWJN6X%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC4lKRL9Btn3sS2NJg9G9JFzhVpZqGwsyFSXRqM2kan9wIhAOJu8QtCxB2I0YFftsr1GeCpoVNFKPmQzDMFQY962GwDKv8DCCMQABoMNjM3NDIzMTgzODA1IgwVvdBNQ%2BoS1kangA0q3ANNoQh93gGcOQkbI2Loh%2FzUURfPt0Xuw82anx3yv7Uw6K5%2BvpoP5zFAoVs67ekoRTNo2LjBvMDVI80EhCxafVgwUl44SeUBaaY5wWayrLs7T3pVptAZpFypT%2FZbCSMNlWM8uns1MOr596iPBDwihBudC7kf5Rgl1rLiVeVJoJcCdngdI0ST1rD80nkJ9l%2Fa952%2B%2Fy8R26hM%2B6%2FgjMC6Mmh2OavUUtKVFyJuK8MZmhMA00cyGUlDzfEjcaZ0NHQ%2FOR6x8vXyGfzrcdMb4eplLD7mOKq6pdaoFLXCibGzHCjUmMcL9q%2FsWmUxPcG2dqP24N%2FyaOeVZcLkOZ0qZrPasS8D%2BjrhHTMkc6snUmkPgl8tSLtot5OFwqhgDPwnGnONiXpUdIQDt1wf3ENtP7cMy66o1Yj3c2fSaXjhC7B%2BGDt%2FuD1h6OW%2FtSRM8GavIkEk84Iq3ISwNByW8UI5WjkOJCdXJ1dwo3ID56AlIR%2BFoV6qsomxDC6JY286fLJnwTCYO%2BdKNMDO2x4lFLfEaZMBTevjoZv9QG6idwc%2Bz1rQOiYBUbzHll7hrv5%2B1g55Re9QXs68nndR%2B6qMDV8HgaB3a%2BJI6nJmdt30jAfKnTddAyDuOUvPMTRi4lAjZI9b2jCClsjMBjqkATL88F0980oiJzrMC03sJJEBLqmGJ15dU7JBOdarqow%2B7cb28zVtjRAnnYagn1uOusSUwtuGXKptoHzItcZTHm0OFeZKzstO8KMi92ei%2FDAZtowRRHBmZesSVPAFY%2Fr1RU7lUql0nlOL1mPZ6V%2FjgVMv6CwHqURlfL%2BVO3xvvX43UgLcxckfBpj1pkbkiYEzl5cUNnn87mro1aLXStqFkWKc13AG&X-Amz-Signature=0723d9929ba48046988cf83e13ea30e3b85ef2f50417835f9cbb7bf332eb601b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMYKLLSD%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T191607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCewklowXS%2B9Df53rf%2Flh5zF2m4Ei7S7VVOEjxwPwXswgIgWZla91mTIURDDgh90rbw69idqnOxS9i9pnrBBerFQIIq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDNgRyOW5IYIKP4OLrircA15A1Okl5o6%2BYmvLhiWS5ifEJp0IXfaQ1j5HUIwHyCNa3rzKwLalPgsuehmU4h2ZfGpLvPOMBQYMx0yl2n9S9yhVFw5UnnhRMW2r1w4MEGvDFtBgMO0leAt5WEcn%2F5n4uhi1fcotC89oMWuUhf6%2FiFJz%2BMLCzX1E260LFTBexoyBperN%2F5C%2B0r3paIMwWF3D2Rr%2BG3ZQ4lP7lyRK0IMpozvJ5YoY6Lna2HiSCLgvLfhdZEl2B1kss2TwnDKqAdEq3qhaScKGYJJjxR%2BOqh9tI1xhNVyPPb2%2BkM%2B0Col8ww9loHaM0RwZagxfJFMysS%2BrBaCmBx2pxjtPrCuylFXKHmOxJbWmUpReL0n4Hmb2Sl0MJhdiNsDpgAGM3cYrh0OQc00l2Jl8twAja02iXznw2j2nb3icWNTzSBt%2BXb8%2FuMu%2B8LmSK9GYOHyaa0DbGO4Q91wX32cqFW7jevT6X2Rvb%2BsgS7%2BgMbBBTHvtWLvAae%2F7rRcnS6o%2BXzMJDKe%2FC5VmbALpja1xwDwY0hAwwUmuRS2fTqngEmDLQv2pPvWB0h2bqesDpCevF2pK7E38yIkpCZg4jG1%2BYcaPyx%2FWXEFLTJtjNuh6FQQmLvxZ2Lud3KV37uY3WvWG9B%2BEn0%2B1MJSWyMwGOqUByC12nXIurX1gKAlxXRCE%2FAdKJZdJ6RNZ2zl0e2haeqEt2Y2sME3NoYtq9sgvCLD3h%2FaXLLPSdan11KeP4Omhwuc9qXLI83f5swfEzDneyLQABo0%2BfKW%2BH1r5xM4F9ytKscpOOnf1waE2u7LHWytwCibFEK1f8TOHn54EdEvF0qH%2FZvYf7gdMEq0stWTtHujhzSg2M2ayPiStI6JVgrwBbqbT4HdS&X-Amz-Signature=043591a40bdb8de973f9c39efd3ec1be3182aef11504db8d7a81a9cf18c73e39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

