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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FT5BPWQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGlHb9MyzL%2BTD4XMCABy6Av7EihJj%2BBbxTa%2BkBplNlZwIhAMOulL5vuXgZXVCcuaxXMq6dRp%2FyXj94QsYh0HmOP2KQKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzw2Wv2M0lEHwfZRTQq3AP%2F8l5zCirepBx2V%2By1B%2FxGJXU6oP26TWe96RH8%2BhXi2VHsSYdb8sidRaCI5N8mQIQaOp0bghNCMe%2B%2BpgO%2BhBgWI46ioKQeKO0VnOtxeh%2FCKcdie%2BxEn%2FAdZzngEqcReU4hISRTjjFmjOy%2BZ2OMXyLlvvk1UUlgPlUhMbk5jh60%2FwjDdbL6Z0YodKmbvzz0oM1%2BcJJ1nVhOB1lZU0Vr%2FMXPO%2FXWphdBm5SUmk3YKgwTHGvnyJ6uUsDhFa2Wqti0dpeiePnceqw5XwHj5zvxNZKaxVp5%2Bc9hqmhFA9DW6SYqHTTlC1638KgHzB6MQzNhK%2FS8eMX17mPd8TAYXGZElgCJkZXi1K%2FfcjsTUCLp56jPOsSCCcg%2B8ABSAWOJ2ppUtIEILI%2BjbMxwid%2BLy%2FfPjz6rfame8UQ7oz8AsstzYBU0GiFMX6NXxwIcr77qe%2B%2FvyB2Oc68htnxjTp4IPOpkwFk%2F26xqbFQuWXHSTwbNritDcaCpvRGG1ZpAv%2Ft%2BoOWgs8PHOJmXL5KEQsUxi9%2BqNnmSKVDVk2ZkhTEjsY8J68Cce1QUXCwkMv7XhsuRn%2F345i3At2PW62wc60nnfz0nTyNI6mdcziO8aQw2PikJy9bgTwAYgEgJG9uN4a%2BqyjCJgvnOBjqkAYkFVkotQ6MhIczUChsYuEhefWC5CXQBrUoCP0YBb6lwqJmw1KQo8tPd%2BQLpMSirPUuMYqkUdwI5J77PpIKHXfOQ6LcExsQEZ9RSyMKk3artajZLzjs2wIpG9QOJaUA2VOsCMWzBh4B%2BNhwPbxxXlOcYNHSFNsG7Yk7yV9D39wCB7MgSbzsuYLbjeZkhGrlsd0z6UUUyzvcsvVUfK7i3J2XLk8f%2B&X-Amz-Signature=814c31fbbae3902a9732e605c77e663d8b2ed6a6d347d39543805a7c007ea012&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FT5BPWQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGlHb9MyzL%2BTD4XMCABy6Av7EihJj%2BBbxTa%2BkBplNlZwIhAMOulL5vuXgZXVCcuaxXMq6dRp%2FyXj94QsYh0HmOP2KQKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzw2Wv2M0lEHwfZRTQq3AP%2F8l5zCirepBx2V%2By1B%2FxGJXU6oP26TWe96RH8%2BhXi2VHsSYdb8sidRaCI5N8mQIQaOp0bghNCMe%2B%2BpgO%2BhBgWI46ioKQeKO0VnOtxeh%2FCKcdie%2BxEn%2FAdZzngEqcReU4hISRTjjFmjOy%2BZ2OMXyLlvvk1UUlgPlUhMbk5jh60%2FwjDdbL6Z0YodKmbvzz0oM1%2BcJJ1nVhOB1lZU0Vr%2FMXPO%2FXWphdBm5SUmk3YKgwTHGvnyJ6uUsDhFa2Wqti0dpeiePnceqw5XwHj5zvxNZKaxVp5%2Bc9hqmhFA9DW6SYqHTTlC1638KgHzB6MQzNhK%2FS8eMX17mPd8TAYXGZElgCJkZXi1K%2FfcjsTUCLp56jPOsSCCcg%2B8ABSAWOJ2ppUtIEILI%2BjbMxwid%2BLy%2FfPjz6rfame8UQ7oz8AsstzYBU0GiFMX6NXxwIcr77qe%2B%2FvyB2Oc68htnxjTp4IPOpkwFk%2F26xqbFQuWXHSTwbNritDcaCpvRGG1ZpAv%2Ft%2BoOWgs8PHOJmXL5KEQsUxi9%2BqNnmSKVDVk2ZkhTEjsY8J68Cce1QUXCwkMv7XhsuRn%2F345i3At2PW62wc60nnfz0nTyNI6mdcziO8aQw2PikJy9bgTwAYgEgJG9uN4a%2BqyjCJgvnOBjqkAYkFVkotQ6MhIczUChsYuEhefWC5CXQBrUoCP0YBb6lwqJmw1KQo8tPd%2BQLpMSirPUuMYqkUdwI5J77PpIKHXfOQ6LcExsQEZ9RSyMKk3artajZLzjs2wIpG9QOJaUA2VOsCMWzBh4B%2BNhwPbxxXlOcYNHSFNsG7Yk7yV9D39wCB7MgSbzsuYLbjeZkhGrlsd0z6UUUyzvcsvVUfK7i3J2XLk8f%2B&X-Amz-Signature=814c31fbbae3902a9732e605c77e663d8b2ed6a6d347d39543805a7c007ea012&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VDCRH26%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6GXfcEhdNYx8rC%2BmzUyMIFvPXXpTsq8EZHnhI%2FG3l4gIgdRuCTNnS1l1HOV83gUt%2BAwLa0EvDareJlsQYX9Awh78qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHkwrinvmm7dwWOa0yrcAzEJiUQ68eKj%2B7cKr58lKQzbdd3do0x4W4HXQHEaXrb2bDItYV%2BxFypuzTSRZeHR9NWAoGrN8STvzx%2BYrx6UstBqOJDsdoRyqr11HtveWua%2FFsCP5fMV4fQcUvcGLgAMiqHgIPB6lGzhs6bnjbJGoF3ZMGhu6VTPYcD5NNonSD9q4VcraZU1Hcjmqt8pKvy%2Fp6Dc4%2BcsFBrkx7RHzoRcyxMa6y3GMC3gCNCth5DrNTEtvV4WdHE%2FNAgB4So3cvd%2Fdna%2BGsPU4aqK4%2FBz2RINPLF1Hdy%2BSZb4zOJ5r3W%2Bxbf1JS3ElfjpOaIt8Kk2hAg3XwIHo1sRWE%2BKdWYdnO3aA6jn2K137JBeBjvU%2Fro0f9h825OX5SFhfINtNpV4pKU8txtx9lhGyjn0wfniHknAc8c9tOkEBGDELL45YELlkwjpRDeDbF9BjsldpS6Bh07RRHsMX0EHBtaPwhjfnAhHRg8vNFkT4%2Fy0KJgxHx3Yf8pmKh%2FCsA%2BwV1UJY3Ba2OUPw57Gfx0wvt%2FBm4xe4f6XbUyWX%2FaMEKrpRQIGBhVvVEUlj0QOF0jxzswkCp5CJ12fGAaVrQctUa5qhqw6JTLLLJhYFVlWQdWGiLG%2FEk645XrJs%2BuEC5%2BYdwVR%2B3UqMMSE%2Bc4GOqUBkJLjOG8DcwVio2zA6tGuyaSVb2dsgQA6rEiweDOyMoqDtkP9v5hh%2FX40ItGcwaNizbcpU5Ub3Zvb9aGSewmcNVboOtzSteuPKWVN0kVsYL6Miqe3EvmEic99%2BHbN1QqX4hzzKyr1ks5kN4GafjRTM%2BXIY6wcG40E1nzIrtLCPdNI%2BxS89cwKiVgqq8pS98Tn5kdRmJTmVrDKBlkLbDyrLa4d2vmH&X-Amz-Signature=093d3c7f10aaa805db5cfb86b661ea3aa08483bb473360ccfeea32105c28e673&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VBD7SPT%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBuj8fTHEmKoXKFTWAMWDprDtiEFtrTpKaonCpBvnaMgIgaaisQiGdWJQRGHwTxm7%2FQygk18wuIuqqhM74r0TnjTEqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7uHyONfH%2FgV%2F5CKSrcAydQLQlA6F9u73PIeL%2FcZcz96DQntV%2BVAbDFbKOaizjjP6GGdHcGL0JmcjJm2gjzcw4MKURx8pvXNqdqAdcDkLxq7xFsGy8eCn5u%2BLPbDi70ZiD3onEykQmSM9uUYgmGowSn7DMsZk7IfEczG35gUQWl3%2B0HTnZHUc%2FtccGyagcjB67yyX3fhqSpsOuS4f%2FE%2B%2BIqs2hb38saleJdziOcO8tXySDYxZK3F3VrbIKtqVfSKIQUk%2B8cvFA3V6TUN97%2FVmE%2F00qRZoWNcd%2FgujOXyQXsbSzHlSXpfoKOkWMvEl4SNoj2jAGvRQ2C0H8hiLCODnN7rDGYwjEYkJOZgbr9NiDUR2JJ9eFsBEsgkAaslaf6cJpzSjoK36cOg5T2GLg4eqQtC02N%2FnDI2So4u6yvQiGQ2Y9ly0T8t5DOLPHSIX8zb8j6JzBzT6S0PFlJ4sO25yDoF50xOw78RQpTK5vm7Be0VP71s4gCeyRju0KVv6715qxs7XhpUnnRBo7CeOygSXGBXBFnB%2BfDrWu%2FWfdul%2BeF0BeAebwCQnwVPol%2B4RqvZpCefcuCFKiPnKowiAtItS8suUHQybd3dBTwqf70qHCvxzVYAZ3e0Q1t73HcGoSDXWjQjdHdEn%2BUZknHMPqC%2Bc4GOqUBCzVanzYR8jrddJCDiV9uBx4m8NbW6l%2FyMdhGJBCTpGwzdbGP0nUvvGWcoljvNW6wGg9MVlhwO4UL8znJ%2FB35K9jUnqZpIaJ9SsSBJZOUQm7oC7g72z8VL%2Bm21TOp0oWC7R5tgsINI8wc82ThcsEIvIZSbUoHCFftREcgRvbANZQpjGsclKjMupoX0ojnejYk0oCtPENAozUT4miXBnM3307fwNNj&X-Amz-Signature=46dfe95e3ad5fb99bd312a0d44ebf4d723b3d1d2bc4747cbbfcc97ffa91141c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VBD7SPT%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBuj8fTHEmKoXKFTWAMWDprDtiEFtrTpKaonCpBvnaMgIgaaisQiGdWJQRGHwTxm7%2FQygk18wuIuqqhM74r0TnjTEqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7uHyONfH%2FgV%2F5CKSrcAydQLQlA6F9u73PIeL%2FcZcz96DQntV%2BVAbDFbKOaizjjP6GGdHcGL0JmcjJm2gjzcw4MKURx8pvXNqdqAdcDkLxq7xFsGy8eCn5u%2BLPbDi70ZiD3onEykQmSM9uUYgmGowSn7DMsZk7IfEczG35gUQWl3%2B0HTnZHUc%2FtccGyagcjB67yyX3fhqSpsOuS4f%2FE%2B%2BIqs2hb38saleJdziOcO8tXySDYxZK3F3VrbIKtqVfSKIQUk%2B8cvFA3V6TUN97%2FVmE%2F00qRZoWNcd%2FgujOXyQXsbSzHlSXpfoKOkWMvEl4SNoj2jAGvRQ2C0H8hiLCODnN7rDGYwjEYkJOZgbr9NiDUR2JJ9eFsBEsgkAaslaf6cJpzSjoK36cOg5T2GLg4eqQtC02N%2FnDI2So4u6yvQiGQ2Y9ly0T8t5DOLPHSIX8zb8j6JzBzT6S0PFlJ4sO25yDoF50xOw78RQpTK5vm7Be0VP71s4gCeyRju0KVv6715qxs7XhpUnnRBo7CeOygSXGBXBFnB%2BfDrWu%2FWfdul%2BeF0BeAebwCQnwVPol%2B4RqvZpCefcuCFKiPnKowiAtItS8suUHQybd3dBTwqf70qHCvxzVYAZ3e0Q1t73HcGoSDXWjQjdHdEn%2BUZknHMPqC%2Bc4GOqUBCzVanzYR8jrddJCDiV9uBx4m8NbW6l%2FyMdhGJBCTpGwzdbGP0nUvvGWcoljvNW6wGg9MVlhwO4UL8znJ%2FB35K9jUnqZpIaJ9SsSBJZOUQm7oC7g72z8VL%2Bm21TOp0oWC7R5tgsINI8wc82ThcsEIvIZSbUoHCFftREcgRvbANZQpjGsclKjMupoX0ojnejYk0oCtPENAozUT4miXBnM3307fwNNj&X-Amz-Signature=75e02683b4d876e3acd810af6d9a99cea326a38652b426803682cdcaff46c861&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNZDVJCT%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDHsrffz90ljxsZIBm%2FJ%2FWX6UAOHRdok41xoJuTKCqgvQIhANjZAaQr0o2dDvvn3LgKN%2FDR78RNNy2kTMqcGOvdCBnaKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZEJgA%2F8YbgMA5gmcq3ANWQwykG7YYDOz%2FIFBG8W1qBI6mxe0D%2FxGJjmDLcEzeS%2FQg4XsQaLtPNZ%2FtMPXAAMonVCyAtbOoZkl8pRl4HzJbRhfalvPLBJh%2FcN%2BcOAdWxVg2RjFo%2Fc1kWvEr2P6BT4A1fAdTcqViwHzOg6Ax1lswUisia9Mt5k2onOHXzk0pfqXUN8LHpVCLzC6ZxTVat7rYFvs7O8C1wAxsVOP0Klmqtcpr59iFiwelkoQ651cVhbOfiVUZR6NHsqRpS5KendM%2BWXdivLVwSzct3ZtAnmXqNhXd98v7%2B%2BU9JesF0qCoTkgaRuT8ivG7EUBZxAinQthjNImT1BJ%2BNsqw%2BPjAI7hTR8QpfOrcGWwuezV26dQwR7OGc4xqUGUcLWdNlfK61EE04Fv54zIHG4gXxLO0AwEs9Tuk01jl8IQqljjf%2F3uCKJaI%2Fi6h4XWDxd4OK5JAMV3e%2FRm0QuGQe7MOYv0CdAQgvrLPUzbKrnYHiI36tJL6AGqVfpoLzJHPfhjYgV820%2FGNliU6BX%2BlgIAR%2BG4gDeFS42olB5rqHjuLTPqL3gvsXHptSgFsRgFIqEzb9EurdkuFUOLDV%2BBNrc%2FqwXNUJxtmtBVO0liJ0ORoIk2iyQReUMr9y8delKnW4uUwXzCbg%2FnOBjqkAQe97qhgLkNEd2gTDXt6ixbRiZKw7Iygb5Qkzcbv7CsnDgKFPp7I3HwTHi8gCCZ4zC8URgZ2CqwQXQd3q5xckr18awYKvQOtB%2FsAv2pHwxM8USO80Cmvy5ow7cXwqgGwAnl1eRYqrEMkvyvjY1pOzcYSkbaCukI4K1absGQeUApe4uUN3%2FvyuzJbNwZKe3uLI6jG73BRMVsMhvavSvgVDQu7mhDB&X-Amz-Signature=82ef35dfed06e37d7aab3aef6ce43aadc3a8960f0cbf19ba59e66fc460382888&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SDZGS6W%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICPgsbuZFOn56XPaN%2BU0pF6IeDOjVMQLNWngq3UyYKhIAiEAsnrt5Ge720%2F3O4NAtBNrN9O%2BcPbwPqeXG%2F5QRxCWaKkqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLBaP7ov4Mfk%2BewmAyrcA9UlMQoUjrnHJTP3NCR2RoHM%2BeULA4TbY0EFlmYG9J79LxVhrtajA0YCPWZF6hJReCb0ymCcUjG14p4b3CmDMlj9tL2BLoa3QhAQJIabkdLcFOjM3d%2FSwJdQAZFcHY47M4zANYvtdhvCIUt1oQeqN4PbpxGLiAvlFBk1ahA58Z2voOno7KucmMDKY2CUvRBdP7PO05Ex9SeOBffKACar7dT0DWDOfAQuoc731otbFa7%2Ba3iq2FH95Coq2hjyS47lXofrgMN9eYfKmWXyA%2BYeHTm91ksooNQ9Qmg7cfDKkFXuacXWa4vZoX3T2DcSPC%2BdJViGHd8pNkvf56pZbvRx7V7rF%2FvrcYP9SiV%2FVcTgEAWw7%2F7Asatyf46d49S7XCSriYrCYZM6cIqI95MjW0iZRQ3cgwz9ZUNKpduAg7W0vv1aAwk%2FQa5CZm5hMOjSL2Qizl56S3mP8e41pIwya3TW8SuX9kGyKM8H6leSJLCD7wRYDKR%2B0YI%2BYSg22YXhCcAB6dHhtup1mlvKee0JP5UkFXT8ODQsrqPAwBqmQaOZgm%2Bh1ltHwYmAg47%2FU8A5MdB7N%2FpPkeJxLZ3%2BReEHzJyDwkN0KWq4sDmyB1Vr%2F0HNh%2FT28jWYhPXcEL2HjT1oMM6D%2Bc4GOqUBo2bytx387Y7aYvLoTLNDuN3%2Fx7HF%2FF7tAmgqiYaeGZKsB9xgBIvxIbONF%2F8mwp1avhEV2qaMCxsz1rN6ESRcU%2B3sIVrruiTFVVg6RMHjqxajbRCZzXZ3qWLrctdYYrvb3Mfu3d1a4CucNeCFP%2FoqJ7n3k1NjIn7TTXIGjrczbaGBGfuekZQ8ZRlGNXWZ7hwzenHWZ%2BEycApuqak78f6Ovkt3oJhh&X-Amz-Signature=a10a65e36362c86d573c35135b3888defd402e5c6c230033420acdf2bc15ba0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YR6LENHN%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUrYfXBiyC7%2BnFTkDlQOB6TGrStBEFy%2BjKWB2eDuvQ3gIgbI%2FpuPGGAp%2FmoSBkgkoXP1OCYp81Et%2BWjPcZpGG55IQqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOQchMVGpLV33%2B3BUSrcA5UsBklq7Qt7HE8UDVKduT8FurYsc%2BGxA1%2FICl5yg85bVnCOjsmtSQ8QviQ36IDm89NaT%2FS18INAuUU4uuv87SGh8rEo4X%2BKJsfRLHhqK1eXIIZ%2BA36QVj%2BObhtJHRRHATo0UgVM3evtPwOEwvHSJmut9phKo5Fp8MS6FIqKK7UiMHWxDlHGYoOuB1prtdfFjef5KFePKnzljeaZ9zqY3Y4Lvs0kI6jJyxxpoYmx66sWFwtn5W7eQ8Vi%2BY5ExKoDP2TbYadvCGXYoe1PPKVv5YyaKZW%2By46uXNg9xdOv12STx1yIeOXdZsIGhHRFuxyOW9P1Sf0n3hTzqrLwbyCsySid1%2FijT7I3fEmBKpyb0vT8AE2dmPMWsnVBiNxpHv9iQCSChPGFmR1oX985PPvaZLoYuqtfTZJcBDHxQw2pqajBNKqDydWDuGBrxdcyNxkpe8UAIkXOcHWm9eV2USYG58nnVafvMz%2F5kl94%2BB1n1v4juvHFsjQEQ5UWriFjdspLFZplY5rxrkTIrlO%2Bf%2BR0sUtR7mgbyne5jUoB1bkph0qfK9vYgINj%2BRwFDzllpOSL4X5VuHx1tIrjXDxESLwiRW7fVB6JB0uDrr%2FYKtvw8ovQD7kA6m3%2B%2F0rmstqHMLyC%2Bc4GOqUBX26EORURkxuieL6%2FTXrwIDda0oGRSA0VoGAHdPSFLdH8CkkYVsjhOKZx0liPoBenoljvK1mxje1IMV1DWXIN0M6La8a36bbpcA%2FJWsNpjeA6MHSKWe%2FE6jlKcH3Wtf7c%2F51c%2FXs4b7Meekh86Bfbfor6IN%2B1t2JHll3ynh74%2Bs4tzNeUi7HCCtpMO%2BUh7A1OhKJtg4HKriHBQ%2FVIjbYzOb%2FUsLVA&X-Amz-Signature=9235b2ed05bcdec0f28437ca1638e90e760534524cefa442c76ed30acff3c9d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2NZDLUX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID0EKcYjo5gFPEof%2F199eY8FKTyNriuIsRJdc0CMJQ3EAiAlGgFJXpcfnPZ%2F9YiDEfByOubWSzrPZF0ww3cmgVg58iqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMex19O9vOzfgZdhMvKtwDb%2ByPNoekUA8EMrX%2BXtQUsqgtpP16P3S6lfwZ1W6M1PFJv6DH2Y0jIK9ECeBNHajcrSrSt67M3D58dsbDZv1%2B%2BAj7%2FjqoZhqpAFmnQbfg5cmw2LIc%2BQFJLgv9Vr690mqOWOe1LoAv96nrCikmHbWHImRxLoRnRKkkxbyn5IsNo%2FCjY6RBgb906NIArDYjIzPrUF4HBUAgfG1QJOs9uWz97VZwrjTtGZGcE0WUoAIKTTjFDZlKZ8bZdhOMUkQbA6zsd2H8mfYnV3hYQ0viEJBLZhu%2BwTKbBdAObMGUApl11%2BWTrfqYPyVnOgkTFGYWOd2gebyFN4DvuNKvY%2FncFJgKb7IrnsoA3K%2FyzJ4QyX7p2O4nnFVQPkMdxz2dKETwjYzjQVbEhFDvgiduHpxpTIm228dVlJU2K%2FbsKkkoaOh%2FbTAQVcZ8UxToki7jPGpdEdrEjdaKCVsGcITwaCeNeCsdKkRrwZNriqtoodpL%2FwZWOl45EhUSaFJ0mMW%2BCv8A7XK%2F0qdT1Wf1A4r6uP72E%2FOcj1qBHn0M0ku7mhTeFwSg1JCa9o0NrXMG%2Fj9mS71iKVLHvf5VypowdcxK7mkRdthAhBDa2NAv%2BoJyApl5ed1QFHN4Tjr8bjAPnTKvvX8w%2BIP5zgY6pgGNJ0thig9aE5x9tU%2B0DoX6NUENWhSaE9WciuTcK5glWT0i%2BD54ZJS%2FOXD2LqGZJQXbQPNchzGGNS9f81mwCBACg8OZyjrypCzUgUU2gL4P2ZxoZQixz8aOC8psubYP90RSxE75vIg4dLJPdqYd1WgxivXb4%2FE%2FqsWwDsMayFEJSz7wm89%2FBSpUintOXKEpuAsQpA4MxYobiWZT1SBhMZq3VWBtV9EC&X-Amz-Signature=f474673fe688f35680aa15507b56b55d86dabf80e0ba19584fcfc62c79bb0b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2NZDLUX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID0EKcYjo5gFPEof%2F199eY8FKTyNriuIsRJdc0CMJQ3EAiAlGgFJXpcfnPZ%2F9YiDEfByOubWSzrPZF0ww3cmgVg58iqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMex19O9vOzfgZdhMvKtwDb%2ByPNoekUA8EMrX%2BXtQUsqgtpP16P3S6lfwZ1W6M1PFJv6DH2Y0jIK9ECeBNHajcrSrSt67M3D58dsbDZv1%2B%2BAj7%2FjqoZhqpAFmnQbfg5cmw2LIc%2BQFJLgv9Vr690mqOWOe1LoAv96nrCikmHbWHImRxLoRnRKkkxbyn5IsNo%2FCjY6RBgb906NIArDYjIzPrUF4HBUAgfG1QJOs9uWz97VZwrjTtGZGcE0WUoAIKTTjFDZlKZ8bZdhOMUkQbA6zsd2H8mfYnV3hYQ0viEJBLZhu%2BwTKbBdAObMGUApl11%2BWTrfqYPyVnOgkTFGYWOd2gebyFN4DvuNKvY%2FncFJgKb7IrnsoA3K%2FyzJ4QyX7p2O4nnFVQPkMdxz2dKETwjYzjQVbEhFDvgiduHpxpTIm228dVlJU2K%2FbsKkkoaOh%2FbTAQVcZ8UxToki7jPGpdEdrEjdaKCVsGcITwaCeNeCsdKkRrwZNriqtoodpL%2FwZWOl45EhUSaFJ0mMW%2BCv8A7XK%2F0qdT1Wf1A4r6uP72E%2FOcj1qBHn0M0ku7mhTeFwSg1JCa9o0NrXMG%2Fj9mS71iKVLHvf5VypowdcxK7mkRdthAhBDa2NAv%2BoJyApl5ed1QFHN4Tjr8bjAPnTKvvX8w%2BIP5zgY6pgGNJ0thig9aE5x9tU%2B0DoX6NUENWhSaE9WciuTcK5glWT0i%2BD54ZJS%2FOXD2LqGZJQXbQPNchzGGNS9f81mwCBACg8OZyjrypCzUgUU2gL4P2ZxoZQixz8aOC8psubYP90RSxE75vIg4dLJPdqYd1WgxivXb4%2FE%2FqsWwDsMayFEJSz7wm89%2FBSpUintOXKEpuAsQpA4MxYobiWZT1SBhMZq3VWBtV9EC&X-Amz-Signature=e90ccc9d4990fad2054b73c18e2702ca4d69ba4841dee9eb5b53766ecd3e0357&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGV75KZ7%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZ2KI7rP%2FVGy0PwLHmgmvm%2Fq69ZFhFoEoIlZYTqLVevQIgTi8qXYJbM0twb1QI6WNbEfInQxpkr0BjSlU6HJQxuwIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLpikZoLlrtgEILBbSrcA%2B3i3XTZMXJelBLWswCRu530V8O8SF0doWyEUcqr2bcD09%2BD%2B8sDjGXedujTey%2FAXCYTTDDf59fgSwMucFCQhRCW3dG1fabl2peFRLr0V6mp0Ny3yG5G2Yh%2FvK8sbQNBFG4v8s2rBPMN9voy0GjQVUnbfBJhuKT7tATOeY1QUuDPZoqUv1b%2FgaWPil9Pa0t3cSvw9mfv1Ka6QF345EvfhgfBFcqy1ubx27IdiqBuivlEnDpHhTSB6uIZku61uH%2Fx9MBfOeAbWsJi7mCaStHUN8E45iUOQdN2%2BAU5lLe%2BC%2BPC0ncVD2iHANJbe1CMWLeGBnB05t6KW8SlZO%2FSnCF8s1kmTvS%2FWA4%2B1aNd22wWXCByDz1KjGlWOXeA%2FFz5TTsLDn3kNHaFgnIuNW2mAOzP5Ogf%2F7LQ8l9EBdK1UZ6UDY4V1yPOcFQV2Ma7o3pcRdt1%2BedyHNwWZw%2Fw5%2FKrGvgCneoq9en2%2BRfaZSnpi0EuWcK124CeSaXzFS9p24oojbi1T3Y4EtFE3OpfxjtcK0GSMwuS2n4f5Dwbg3MFlZmQPE4l%2FfEm%2B61hN2quHscIZk40m4wpYQE%2Fc56pq%2FN22M9Yo8wjRNpEfPIprLMbL%2BR8%2FcK4BJ1v8rRgHyrhYwHFMN6E%2Bc4GOqUBZeMP1U%2FBTZxOlAeec7VBQpWRkUmYIed9Q8pI5t6W74C4sC%2B0T2ejM1WIzpM9sXgPyT7kL6IA8bLeKZFojKxULk000i9GzdsfCvYKw8LyB9mb7qC4LuirEYBg8uS5lNYW%2Bx3JxD7ZG2EKwr2ACg7NqrAt5A2ivI%2FeD4EBxtvcy4en2WGxxqRIRECFBfr9Bpfu5nNt4VVBVniY%2BLKpecwhYjJDC%2BYZ&X-Amz-Signature=cc133f2a36d1cc6abb240952a6ca5fd51b69468e1e89a596ad3fc1cb76f8f694&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LQ6MELR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBvJELFXaLRgqq%2BT35BUALpZllh0B0s6%2Bm5p%2FRNdgB%2BCAiBqXn388Gs%2B3d%2BaxRNjkxdEOOrYxFjgfyN99cYyp8i5bCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI2j0XPG6ShtdWpP%2BKtwDRPD7O7VC5916idwYfatM3ivJR%2Bh47Irf4tAuKi08vjnJNG%2FfKtLnLDNL5ZPNwgiM588oLofTydewzwRqoDTaFf7W2pdq2kRiwqLra9syqhB1t0kBVlns9QGNHeHg9%2BxEJHcryNLn%2BGHUmW14A%2FreKIboa67QLaC4Ha72ILUBEYmTd0%2FigFDvBOwWmITyPXEbC0lxxrEbaWSD%2BVbqKUfxRHHOaiw7%2Brbj0HLNQ5TLRPmJWNBZ6Af5U03foZRGjmsGJA5JLyPnECQ0%2FB%2BmcjUu5DL8XeGuwi5CTPJxstCuZDV6CweY1oK5%2BrFBqxqTiQGbEDUIMj8P86nhI99LuV1fIfoXQstZCfP1AsUwm4pj9GEERHzRuyRi3nn9GDYMENcpnvmTAzNCCDsgwS0%2BJ2OhMPo%2F0l0Y6JPfd6YM8iZtbUWAytkuzhrZ9ETZ8TANu3bbB1z7N%2B06mbJy%2Fv5IQbO1pmeHrn%2FhjGm1UghqoGpElAwLoV3f3NeIEs9u%2F7axU62y3M4ZGVmxQFbSWYwhQ8YdTBO9D%2BBP8nr0BlEeA5NWrmhrpIQFjr%2BpnpfgeVB%2Fv51H9lks62%2F4tDoJNJGlG5zRs2ND1V50dNLCMlNWL61%2BKaUq8CIGMzn26fkWfSsw2IH5zgY6pgFUsokMovvwrJcwPq%2BBRX%2F225jLvPnzPii6E6Zbzgsc96v8hZnFcSQb6BefwJcaNNAL9toDWCW7hFGN075ZiiCunoX2Uzmx17BEFsZGb677e0%2FH%2F3MyfvIsmhpwzSklaCAh3Q1V56Ll3m51Nn5LYw4r%2FxuV8f6zfuoDEngs%2Bu5VC0kTnotz25ckY%2FBClZdjc3iEAbbLySF2UiG0DEUVKKZez7BAyrfH&X-Amz-Signature=6fa2abc0f0d9769bede61bff7e4695673fc790fffc73b98ab3a8b2a1fd28caa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LQ6MELR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBvJELFXaLRgqq%2BT35BUALpZllh0B0s6%2Bm5p%2FRNdgB%2BCAiBqXn388Gs%2B3d%2BaxRNjkxdEOOrYxFjgfyN99cYyp8i5bCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI2j0XPG6ShtdWpP%2BKtwDRPD7O7VC5916idwYfatM3ivJR%2Bh47Irf4tAuKi08vjnJNG%2FfKtLnLDNL5ZPNwgiM588oLofTydewzwRqoDTaFf7W2pdq2kRiwqLra9syqhB1t0kBVlns9QGNHeHg9%2BxEJHcryNLn%2BGHUmW14A%2FreKIboa67QLaC4Ha72ILUBEYmTd0%2FigFDvBOwWmITyPXEbC0lxxrEbaWSD%2BVbqKUfxRHHOaiw7%2Brbj0HLNQ5TLRPmJWNBZ6Af5U03foZRGjmsGJA5JLyPnECQ0%2FB%2BmcjUu5DL8XeGuwi5CTPJxstCuZDV6CweY1oK5%2BrFBqxqTiQGbEDUIMj8P86nhI99LuV1fIfoXQstZCfP1AsUwm4pj9GEERHzRuyRi3nn9GDYMENcpnvmTAzNCCDsgwS0%2BJ2OhMPo%2F0l0Y6JPfd6YM8iZtbUWAytkuzhrZ9ETZ8TANu3bbB1z7N%2B06mbJy%2Fv5IQbO1pmeHrn%2FhjGm1UghqoGpElAwLoV3f3NeIEs9u%2F7axU62y3M4ZGVmxQFbSWYwhQ8YdTBO9D%2BBP8nr0BlEeA5NWrmhrpIQFjr%2BpnpfgeVB%2Fv51H9lks62%2F4tDoJNJGlG5zRs2ND1V50dNLCMlNWL61%2BKaUq8CIGMzn26fkWfSsw2IH5zgY6pgFUsokMovvwrJcwPq%2BBRX%2F225jLvPnzPii6E6Zbzgsc96v8hZnFcSQb6BefwJcaNNAL9toDWCW7hFGN075ZiiCunoX2Uzmx17BEFsZGb677e0%2FH%2F3MyfvIsmhpwzSklaCAh3Q1V56Ll3m51Nn5LYw4r%2FxuV8f6zfuoDEngs%2Bu5VC0kTnotz25ckY%2FBClZdjc3iEAbbLySF2UiG0DEUVKKZez7BAyrfH&X-Amz-Signature=6fa2abc0f0d9769bede61bff7e4695673fc790fffc73b98ab3a8b2a1fd28caa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DP7APLV%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEhveRgl0AAy5%2FMnMuBKYLOtCO300l%2BGxo3FtGl6uRdJAiEA%2BvJm2rFqZqTd%2F036l275kNR3qyc5vXj1b7o6eA1yd4EqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBHKALsWCMu%2BD3l9YCrcA8HNa7saoPJJlxW1%2F%2BGbJR%2BD1h90xXGrfc65J%2F5U9S6QpDaA0STUdbm5IYfPCNM0GEG%2FPC%2FQaebHuUbSrHFlk%2Fp8tXR4ZzameNwSU4r2X7tF3wJY%2F5cKfpESdyWaqAcLNcwNlyeJVm6WpDrUP1N2oJXPfnGhSzADvYELw8MHxMrVDsoRY3Y68bR4CF1SB9RyaEONmaNCjqHG2Zbu9%2FE6Q4CchkJoe7eMWb%2BIyFqEA298WKmEQmwFQGQdcmv7oRVVER4pDIw9rjpxJy88ScWRhLmAEgOTrS0rnwvTkyWh9ytdEgKuNP4gxRNz6frlOhcy65kA4nkNfbGnkONiNikca%2BuXN6MoLZFmz70jap8TZdi8vh3tN1YwrsESJw4XXbbE4bsOrtXn%2B23b0UVbLLdGHsjneBSP1gOsF4Ay6ZGPbO5SzNOk37YLd9q6alW0RtGGB9WofwPLzNZ3yYdubotvof0BiYZ7X32d2xyny3mWBXnlo4SH4lEH81SWD4uFFdD%2BkwFhGEv4Slk1ROdsHC%2B9nNWQS8BfUZ%2BT%2FLLJcDi2dB1hIJtQTYIowI8ekCfX5Np4lYz3YBFmte2clxGbSzgOCy8k1rJbVLZKH39Jcv4C1JDsjfHwJxQ%2F%2Bu9w73YRMPmD%2Bc4GOqUB%2BiA8BEoHBpeU%2Br%2B%2FMfRLgvfxJRRPZtrmHty3chRe1m2a%2FL6lOpbsYiF2HQ58d3BXzsu3IBYpF4I%2B86r0VELJsTi0%2FY75FQRW7LWNW2EhCRlfa81KVZloeNZZF66LFUTu6S0ug15nEkLMVZWKt%2BH1fNZzSn6YHAof8RNuHHoG9M0exK0CVCuNLDGSNtgWAvevHqmF9IUPfdRK%2FE1S0myEAjts%2FxaE&X-Amz-Signature=41ce6ca5d2083d2fbf614f2b1b783bbd4abe02d3b5b6f5ff1034add385a5e90b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

