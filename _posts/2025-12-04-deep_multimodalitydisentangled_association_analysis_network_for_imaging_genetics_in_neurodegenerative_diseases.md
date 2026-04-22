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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PTEL5A4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCNfeOvmCRtG7%2BNn5NbkUHqyTNvwG3ts5QRKdBbiqwLIgIhAMz0bomWvF%2FUVCX6WpwSjJUirERMLwax1gKKBocDyCQWKv8DCEcQABoMNjM3NDIzMTgzODA1IgyXT8iSZiO%2Bu6%2BhkNgq3AO2qPmQXu7gqoSns2txgJGTAoqRLwkdcxyRCUco0akn1BS%2FNhPdTBvvmn5yx%2FS8XXJ361pYm9Mab7S8WL%2FZBb8pA04tDU89az0CVYHZdNP2LIhj43kudHSfqQBjiUgGzF575qp4c35VIDO2NxfhOqrPMM2TsX%2FVqLSSRE2X%2FRPQT58FaH%2Fkub6xjDABIm3MsZH0y%2FtgvxTvFpj3YUYwcuAuFrD7U9WDJnJLiCNm9wtomIB4c%2Fs90XlXyol9m8VX6HKGho7zeXcTVJtxQD7vS4CfcCy91ATnNQ7n8twWjliF1itlHfiN%2BxWYO32T9Zh4gqx0JiA0vxF0NMkmx4oNBiM3uu%2BJ7q8FhK7YmAAkN2amxjTD%2BOhOOoj6rNi7qa3E2TzfgIEIobs67wnOc08MHoBmD2Z2locxRQGCRFL3ycPfXwPzMcZWstTgEXrTymu5Q08BYXwWMz6F6WrDvLIf9izH4GRHQpw7gV0tDMSe51NU1R5zFzS6fawt6TvUPvOYIiu8zxZnIlJMgD1j0VqujaO0rTZfy31DbUdH4zMIJZuNgrIzHT7xKyZijd%2FVxszou2a1AM9b%2FUFJXyPpg4S46eN9ItlWOnMMRywHZsOdpgMrDSjz01%2BBl5hqmPijhzCrzaHPBjqkAWPsVoxdNEoaNHynmGbJSV%2FmOQ5kF3UQWBOSXuypNXMlGWaMY0zcY49d964TttFc92%2BBG3aDEL4Pv0zyODJEZAahQRCwiE6wsmUaBKwm3Ag%2F%2FTXIVDALYGpDF04am6gRQSD0r0%2F5F666AaXRbCSbNcSshSm%2FPh834pjNiYBcu8wwPx25EOj456I4kmY9jBTS%2FuPCQQxsNgAYbOt8uuMyaIy2vZb1&X-Amz-Signature=e116f07597cc2c1fc95551522d3f5ce6233890d5ebf1da15f8c7644d42eb91cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PTEL5A4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCNfeOvmCRtG7%2BNn5NbkUHqyTNvwG3ts5QRKdBbiqwLIgIhAMz0bomWvF%2FUVCX6WpwSjJUirERMLwax1gKKBocDyCQWKv8DCEcQABoMNjM3NDIzMTgzODA1IgyXT8iSZiO%2Bu6%2BhkNgq3AO2qPmQXu7gqoSns2txgJGTAoqRLwkdcxyRCUco0akn1BS%2FNhPdTBvvmn5yx%2FS8XXJ361pYm9Mab7S8WL%2FZBb8pA04tDU89az0CVYHZdNP2LIhj43kudHSfqQBjiUgGzF575qp4c35VIDO2NxfhOqrPMM2TsX%2FVqLSSRE2X%2FRPQT58FaH%2Fkub6xjDABIm3MsZH0y%2FtgvxTvFpj3YUYwcuAuFrD7U9WDJnJLiCNm9wtomIB4c%2Fs90XlXyol9m8VX6HKGho7zeXcTVJtxQD7vS4CfcCy91ATnNQ7n8twWjliF1itlHfiN%2BxWYO32T9Zh4gqx0JiA0vxF0NMkmx4oNBiM3uu%2BJ7q8FhK7YmAAkN2amxjTD%2BOhOOoj6rNi7qa3E2TzfgIEIobs67wnOc08MHoBmD2Z2locxRQGCRFL3ycPfXwPzMcZWstTgEXrTymu5Q08BYXwWMz6F6WrDvLIf9izH4GRHQpw7gV0tDMSe51NU1R5zFzS6fawt6TvUPvOYIiu8zxZnIlJMgD1j0VqujaO0rTZfy31DbUdH4zMIJZuNgrIzHT7xKyZijd%2FVxszou2a1AM9b%2FUFJXyPpg4S46eN9ItlWOnMMRywHZsOdpgMrDSjz01%2BBl5hqmPijhzCrzaHPBjqkAWPsVoxdNEoaNHynmGbJSV%2FmOQ5kF3UQWBOSXuypNXMlGWaMY0zcY49d964TttFc92%2BBG3aDEL4Pv0zyODJEZAahQRCwiE6wsmUaBKwm3Ag%2F%2FTXIVDALYGpDF04am6gRQSD0r0%2F5F666AaXRbCSbNcSshSm%2FPh834pjNiYBcu8wwPx25EOj456I4kmY9jBTS%2FuPCQQxsNgAYbOt8uuMyaIy2vZb1&X-Amz-Signature=e116f07597cc2c1fc95551522d3f5ce6233890d5ebf1da15f8c7644d42eb91cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652TV4NTU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDJGBBrzKQhvBujrWE2mEIdLSUtED4O%2B4o9KzjYOZYzewIgT5BPJR%2BMUnBk%2BDDOEMp9LhSIPiP1HtiaoTYAClNfIbgq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDK9xdLcpXwrgemK%2FjyrcA%2FWbtRINeQazFNN64Ailt29tPeYDodsPMQwo2XDYosa%2FKIJ4amFhw%2B5oKNMkTRWIQ1ZNymMuAmHlKMvzi7RkomrhjeUrfTcFCreRrsAGoy5Dpq719fspsMlG6fZc8EZf9wZCnizomrynDei5TVn%2FTK60LWPk%2B4gCCdP8nLubH6uzr8%2BvwhfdReQx7xhyOVWEYyhICUhLL5gELDlP%2FBLngP47m83LVnGRCzOS%2BD2EPueW5zEI3WL722jPZ4Izyi3AlLdcav61TQ%2BcLOETrveZYMWaIDPNcc14TMRL4JmC9aZ%2FlpyjJGRH7H86cxHVJJd%2BNhDnGZ0XYIfqYqS7i%2BIYVzqtHo3BbMCU6dPMe51SIZP5wqQm5AZGSxKxq714bsHmKx6GiR1zbakRKr9DYnV%2B1Y4%2F5ISWnDD3mI7KQc4uDQt3AK2ClxUqNRSP9FBrbrCgdTX2Sn0SXBHUJux66A%2Bo3mDhywlAXKP8o8fxk4tAieKIV9UaszTz%2BiCl%2F9dI8b3TaqbCGf6WkpbAWnyHpWDppm9dqtiSvQbpuyNCX12qa7CSZdgGHrqyoaMiBvR%2BS6BrAHym9kA%2BA99twdeHfwDUg519PWFWZRRt9aqz3yVUBummOKg8iKNUPC1%2F0mLQMLrOoc8GOqUBt5y481X114lOQf7%2BY8yVfEq9iPQInPX%2FFTNgn4EwHQj7nN8GRc3crH6XFzBLHzNzOTg32GriNF7jRtT9CU9MR6s2orOkbuKi8Uw3nGuDAHMhju8U4GMhBDv0eS8YmbW3N53tbeIfkvmGvymxgk5A%2FoGOItvv44TjriSdPPt4kUzBIuIZuFpIFB87T9Fwi7WdwGibmSHMvBq4gn6nSuB2m4J7SQIH&X-Amz-Signature=23c735b3eae65f46c1aa7dbec4cf49fe5c792aeb735e8cb08eeffadc2478875d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TOBCKZU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCSrW9yA98dNRVfgMhK1BGcWx%2BssnOQFemg5WXm4KEUogIhAJ8X1Oj6Lf6JkA9beE0XUAr1DaXNtz2BXG%2BZKFddipeHKv8DCEcQABoMNjM3NDIzMTgzODA1IgxfWSM%2FNs1rjC%2Fa8Icq3AOWMKD6vwWldyap4guv8FUoHlfhuwY4Mo45dS0OWBlacgVDa5tLy%2FAaV7cqShpWnxQF6r0b7uTwE3bEqPUtrOEBb649jY26agIDCFIsXmLe5Mel5XH4c6LZw199iSu%2BQIo4MysGjv0StPaX7%2FKxURoFQw6KD280K0uBxtCnj%2B%2Bh%2BdAQRU9K%2FsRQ%2B4luDlhV%2FdBwzghRY3HKuk6MnmHNchJA8bLZsWz7T%2BZAO2Jgas54RM9Avccv6ndh5t37B%2FYaAgkMYAX7KJAo%2B1dmgrAgoYrCWnFhjDKm2pOLLt1UiPnBgjNJCGCGhtmomlsqFT3i2H6O1wpbSnqTrLPAiTsM8zdWW4yvwsE%2ByT2HVqSkIFsIVCUwfK%2BaWBNmw6hF3TcSJLWzFhZiw4qzfPGZLYtbdlplgRBEUmKVEcNQkW%2FuGQJ8xjJxrOt1BN2gMbnJgz9PJ9UNix7qpU%2B0%2Fucf7Tj6%2F4p8VlBmITA3LnXs2WzF5NJPIwmlf11jlAVI%2BITV5M9TfPGNxQdLys%2BHrkmy6gNKsK5ET%2BxTF32%2FrK9ej7G2cJJ6Za3QM4EQ3O1OhhMHDaPm2yBbVd6Wh4LBIQdDdovB%2FiM%2BnmUUTTJ2%2Fktp6Wd6NLzhjQ7jb2Gjcq9zVicarTDLzqHPBjqkAbbvSOq%2BiKAagOKS%2BuobYkaSkJcMDLfqU2qNz%2F8qMA9O2pAijeum6xjRt5g7EkzJxT1qurdsGFhoSjbM5MPHAU1pliHwj0AxTpicqPLwbH8fH83XmnCB7GR3FYYiG9mlSZBHIEgh%2Bmhq94erIBxcTGZ%2FoFM%2BAKEhoqiabTuXWdFM9yhdmOWL%2FAyAY73bH6V5WfN8ZenclMWWMdm%2FbJiA9hdzxDLu&X-Amz-Signature=820b475bba0fb219b4619fe76d4aa393ab696ab8900b94e68ffc83c75829aa02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TOBCKZU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCSrW9yA98dNRVfgMhK1BGcWx%2BssnOQFemg5WXm4KEUogIhAJ8X1Oj6Lf6JkA9beE0XUAr1DaXNtz2BXG%2BZKFddipeHKv8DCEcQABoMNjM3NDIzMTgzODA1IgxfWSM%2FNs1rjC%2Fa8Icq3AOWMKD6vwWldyap4guv8FUoHlfhuwY4Mo45dS0OWBlacgVDa5tLy%2FAaV7cqShpWnxQF6r0b7uTwE3bEqPUtrOEBb649jY26agIDCFIsXmLe5Mel5XH4c6LZw199iSu%2BQIo4MysGjv0StPaX7%2FKxURoFQw6KD280K0uBxtCnj%2B%2Bh%2BdAQRU9K%2FsRQ%2B4luDlhV%2FdBwzghRY3HKuk6MnmHNchJA8bLZsWz7T%2BZAO2Jgas54RM9Avccv6ndh5t37B%2FYaAgkMYAX7KJAo%2B1dmgrAgoYrCWnFhjDKm2pOLLt1UiPnBgjNJCGCGhtmomlsqFT3i2H6O1wpbSnqTrLPAiTsM8zdWW4yvwsE%2ByT2HVqSkIFsIVCUwfK%2BaWBNmw6hF3TcSJLWzFhZiw4qzfPGZLYtbdlplgRBEUmKVEcNQkW%2FuGQJ8xjJxrOt1BN2gMbnJgz9PJ9UNix7qpU%2B0%2Fucf7Tj6%2F4p8VlBmITA3LnXs2WzF5NJPIwmlf11jlAVI%2BITV5M9TfPGNxQdLys%2BHrkmy6gNKsK5ET%2BxTF32%2FrK9ej7G2cJJ6Za3QM4EQ3O1OhhMHDaPm2yBbVd6Wh4LBIQdDdovB%2FiM%2BnmUUTTJ2%2Fktp6Wd6NLzhjQ7jb2Gjcq9zVicarTDLzqHPBjqkAbbvSOq%2BiKAagOKS%2BuobYkaSkJcMDLfqU2qNz%2F8qMA9O2pAijeum6xjRt5g7EkzJxT1qurdsGFhoSjbM5MPHAU1pliHwj0AxTpicqPLwbH8fH83XmnCB7GR3FYYiG9mlSZBHIEgh%2Bmhq94erIBxcTGZ%2FoFM%2BAKEhoqiabTuXWdFM9yhdmOWL%2FAyAY73bH6V5WfN8ZenclMWWMdm%2FbJiA9hdzxDLu&X-Amz-Signature=b941c4528d829ff3381b622e412b17403c5f38d181a38085f60f955c3fe75a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FKG5O2C%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDKl%2F%2Bc0w8kfTwGmvs1gNNi5fc6HAv75d%2BQ6KaYfr1kqwIgQUUKkXk%2FRvwfcE1ZzW80sLae4BUKx9%2B6Mu%2FvWfnU8Vkq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDC2arbF4esMvv5ZtlCrcA4G5UIb1qluxJPHIu2zUl7DwZgIcqcPBjgO2CLy5LAu%2BBXiRedol3UZtJI6VHi1j8kqAfcG720ks3RMOmgYAAGbmuhUJ0lJLG8%2F6i%2BYB46AjOoVK2JMRgyWGr0o2LdN55ZexeX0oQ%2BMSttI6y5nrxp8HG4%2FbaQD4PXjJwiESjShDb%2FEYmkjjfC6%2FQiBZ3LbK38HjuHYl6xSQL3HLlRwG7o1Uo%2FY3Es7da0qK2ZobJxs1%2Bp8Y1YnX%2FQcMiY3SxQHIREp22LPAdDKyK7ynMc7CO5Wudehb6Gkfi00t0MKUGxe3g2HXH4pkf68sGujJerF5OYaJEUr6G4rBTcpmme7oeTTkfKCHdEhgUh9Q7tP8Z1MGyuJmFivHEyFq1NVrDmZYWXIDqb6xd65iTxnx9udvx%2Fsg6yhs8%2BbhQ6WsOKwK4tf9QhlyzTyARtQo0ioDF3rIhwgtQNLKnQuZ%2BMu%2BWSyVrYjqbLKQEIWEBszfiviQJNapJn%2FUo0D9NAJq9u7D7a5wX3jdC6VkaKww%2BOpnE1i3Ee%2FySJyqy7WoTAU5ZGWqmZcjJiep9mM70hjPf1RF%2FRhq0euRfaJRRIWeD1E0EznTO8qgD814tZWhX5pML6FNz3RZWMnq7uuRMpr%2Fw9MgMKzPoc8GOqUB%2Fykgco73fepuIKT34VqmQejwp4yE2Aevvl2bA5ClCoWPGdNW8h%2BsOonmzW2shnDkNTunLOLetk12tsyNu3H0JbkIf7gQwfx65wMBIEKEU8r%2BiR6QN9n4fWLagxGluwVKKA9ay%2BvuJu4rtWPY%2BqHkM6yGe4ABSC1uqKJwiqvS3b6IDTVKcPNSbbBz46DewhKSKtuzEkRuz9n71XhZlxMVMZk8Z2ut&X-Amz-Signature=b7797c05d098cc5ba04ac3360e7aba2d35b234274b750c87577d1873eb3cd849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UKXGBOD%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCJZtEdyrQa0j5BcmgLTnaCTbnjaz5Ue8WSURPTK%2BYsZgIhAPi6p3Hxnd4EdTvsFXtIYn5idKhRpbZb7UsFmgcjWWkEKv8DCEcQABoMNjM3NDIzMTgzODA1Igyj3%2BveoDbkKkNvCMsq3ANexCJrr2Fm1eNb7nxlpVISK9qEJTDqY2%2BlOjprdmwiSihTBJzr0OVZrNjExkX28p9nm7YEAZ7RivayetbEHKT2HGQ8nicfEKp7ObcQ2NIShufMsR%2BPlrGaf7m89cXFN0kb7Jaz0Jj2oj8oNXYUGTHWZDiSrEFOlijtZBcMYz3eSsGF%2B3A7bBUtXGycUAeaO3EeXKKcn8udKtaKBDWb1n9CwLAwyUYHRUVigwkqWOTNhRIgMO1uyuXTZui1fsnIGmsy2U%2FA3lY9CCb%2BJ6chzZnSfPKcjVW0TKn8MlN0OHuDTKWF4OKXt7Gr8jpzBOxBP9Ii8Z5FuA2dwNec%2Fev4%2FhhK2sZHo36vEJUUdRBg8jRpDK%2F8kqOJYg4GAoA%2FHix0hFaWtiDQ493dMjD8DJx6Xqo3N%2B4snbVEV91wfcWMyKwuIWwMN4ExzPjkLEJHQAY4NdAk%2FPoNxiC8sm75QFdIRlu26Q7q4Z8wj6V1BibLeJPlwLiuxFyhZyG%2FVbG4lZZrHgYwmKVnH9zdSNhEOLZIFEZ6Qle9VZ3Awog5oedcoi8c%2B1RNwFIDGYDKAzDXmtSackF1dAizwk0t4Ry09ezwB11Df8Frdeephb%2BSQj6fo7QO5zyMFCMCo8EiQpcAbDDxzqHPBjqkAWXuVRjGt3cC%2FK3LmFXlCgCScB2VHRS8Y6XaFsi%2BeN2OhjQ5gznNVggOHjW5SYET6wl193gHX2l%2BxGb2awzfM0tOprKIRa7CB71h5nY71XU6UQcFo9Nm%2B6IZvPeXABJzmErow5tHNaZ4PLQEtMWfXfuiN%2BB4V%2FFRkKWuqLFqSLRFHh4XRHy2aQBcBxG%2FhVAkBMxkrjqRwRnRMX2PSu8ire39ugkR&X-Amz-Signature=d21af793e61a76a1a6fec948e5503d9531bc8cb3fad94d68eed9c897fe08df37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB36H7H7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQCH4A7OUxDO1DcMT73RDp2vZT9g0zf7Iz0d21hz5Am1rAIgPzEEiyVAmlE%2F%2F8Yw5taCXSW3%2Bsxtlpl%2F3jt9rTe4iqcq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDDinu3FW6g8YWPFT8yrcAyuX6dC61qXAvcNCKxGK4Pi9NzsOoBOg4f3AagM57W%2B54yGC15ndfQg%2BqoEI8nZ%2FpFfw002%2FymBfFD8ouQc741Fmlc9tujueXSyxCzz28QJORtxYDU%2BxKY08O%2FDX6%2BfvgKjNqTiwRq1ASrqxQ9i1feXSZaLkCnRIQ8NqaaV%2F%2F4l7pyebkgn9KRdGbjDGnya2zUWVHkrSPa6gDe9hQLuG5a7zSABbWQBuXgTLCffNRVonH9caCN22PFaSK2gI2c0DCYqiPhIl5joJIpd3m68zbY5119%2FAqHYkZAqnEBSbkE4bSkz%2F70fOCi2BCnBd6Rnw0b3Qx1IKZfwoJgfuYYh%2BIJOPfhg%2FLzAxImnZvIxXHgW4MDRB3bMpA9Xnv3zd8zDBecz8tJxAOhascYrzh8KjMIaRzejZH0qhnpDImEcpK%2Fz9Ew8FNh2n4jTKP84BgjLAhzwMowRdaG1yDAPkrcQw3J8V2Xucpyqu7Qs2R62l%2FZXguxHNeGGwC5H7DI3ODop9HmH3Ks7X%2Fr7ae0FFSv5l9yw%2FR%2FIqinG9fc%2FINV0TTIcR62hmTsaMXnL62XQyLhe7kCTfdAIKxRwS4y%2BKfkpvKLGjbW%2BYCBHDkVckR1Koco0n8u0rUbThwYF8mYCrML3Noc8GOqUBgoqmAocvk%2FUp2ch3ydcqxZ9iHmXi%2FYAuVCurJttzAxP1GdeqjOwEf2IzZLpa%2FHHvgK8nyos94Ro%2BlCDY3WwMBH%2BDwsXo1f8lhVS2OT7feqnUkFdYSvVHmak2cNkq7pizZC3hRY3HJpWrd4NLAfScdjESeyoLTSZBE8bIpV1OkYWATVHZl%2Fun4tLSYxSbvD%2FPHwgg6qtA6iq2yVVBd7Wg4ZIGpzMu&X-Amz-Signature=f25cccdaba5724823ea0538d8c89bfdb02b30f551dcfff1da5b0b4a118e69575&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N4TQDSN%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDHp15MXLIyS72sIiIT144RLUyzP%2Fqe%2BZyooRXfKYreSwIhAPsUnpmAsEdaQjFxf4nO6gI%2FB7XUIK8eFAnEB6UWzxIzKv8DCEcQABoMNjM3NDIzMTgzODA1Igz3n%2FGdiR9G87lwEewq3AMHhy6m0XFV6cCIOu%2FL88%2B%2Fwv253a52PYRAq0peSX5NlIcHbLJ2VGgRgfbv7CRJoF8lw%2F8EG0Gmqnkjp5x%2BK%2BUMCyMO0KwU%2FsplNOE8rMy%2F%2B1YBw3hXdiS8EkOCl5spAVBwqAZR49y04zfKfbukV5OcmjXeiLBdqZQ8le0OQmISpeMe5dmbdDRUS%2BNFk2pZKmB%2BSYFICnIAvYB3PcoBjXXez%2BBuyFgqQBC1J%2FodNREoskPSBVc9%2Bwfuz%2FaKXtmke1b9%2BlfnK9PUBPY7B3GPKxOqDJfFTvUJvdEe3rj4hFWpmz8K%2B2q16wxMdp%2B18ElyLXdxDpkGvLJmkDO0NZWmw41LYbX%2FI%2FR8Ue6w1OANw0LNSB5yrAFpqU4pJUfrzR%2FRPBRWJ%2BSyoMHnylY9xKENghY3cvMMg12jHqI3A8hZmcV5FfiHD8suYlLScp5Qg8bKcrXqDyfEU7XwmrWNeI1p4IMjqcD4nIunkvgzlrYyTX3QsVqhuckPw8gP7OY89BHgKLJiaT06222I%2Fy9yYsmmwAdipFsMoGzBGcvZHMFBVFBrzRQwYEM4cK2TThmpm3YbymxDmCctlTElHFJk793XUAcnp6D%2BhafMmo7Um2T%2FLMIEUmzgkSAL7lexDUTBizDKzaHPBjqkAc7dh4pbn9Qsakp70lLzzkYfTV4ZtEpKDQ1%2BEjVo7c%2FjQu7Gk54w0axcPT6tJR3%2FhrWWJsDLPN1IO4pyvQv02gZp6QghA5kkymEF5RVmdRxNJgyD%2FjVCqOAt7sLFJLPjrFeIitxcQBWPDfteEGOaZmwhFRgyOY1psX1VNc7X%2F7i8mey60pLn54KZ4L1LqTWvUlJbgYbv%2B4KK9%2FxOoFjN3cNGzqDu&X-Amz-Signature=a1018f9b7bca716533271197bf9aec28bfb05d4f58a132a362184a2282e513e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N4TQDSN%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDHp15MXLIyS72sIiIT144RLUyzP%2Fqe%2BZyooRXfKYreSwIhAPsUnpmAsEdaQjFxf4nO6gI%2FB7XUIK8eFAnEB6UWzxIzKv8DCEcQABoMNjM3NDIzMTgzODA1Igz3n%2FGdiR9G87lwEewq3AMHhy6m0XFV6cCIOu%2FL88%2B%2Fwv253a52PYRAq0peSX5NlIcHbLJ2VGgRgfbv7CRJoF8lw%2F8EG0Gmqnkjp5x%2BK%2BUMCyMO0KwU%2FsplNOE8rMy%2F%2B1YBw3hXdiS8EkOCl5spAVBwqAZR49y04zfKfbukV5OcmjXeiLBdqZQ8le0OQmISpeMe5dmbdDRUS%2BNFk2pZKmB%2BSYFICnIAvYB3PcoBjXXez%2BBuyFgqQBC1J%2FodNREoskPSBVc9%2Bwfuz%2FaKXtmke1b9%2BlfnK9PUBPY7B3GPKxOqDJfFTvUJvdEe3rj4hFWpmz8K%2B2q16wxMdp%2B18ElyLXdxDpkGvLJmkDO0NZWmw41LYbX%2FI%2FR8Ue6w1OANw0LNSB5yrAFpqU4pJUfrzR%2FRPBRWJ%2BSyoMHnylY9xKENghY3cvMMg12jHqI3A8hZmcV5FfiHD8suYlLScp5Qg8bKcrXqDyfEU7XwmrWNeI1p4IMjqcD4nIunkvgzlrYyTX3QsVqhuckPw8gP7OY89BHgKLJiaT06222I%2Fy9yYsmmwAdipFsMoGzBGcvZHMFBVFBrzRQwYEM4cK2TThmpm3YbymxDmCctlTElHFJk793XUAcnp6D%2BhafMmo7Um2T%2FLMIEUmzgkSAL7lexDUTBizDKzaHPBjqkAc7dh4pbn9Qsakp70lLzzkYfTV4ZtEpKDQ1%2BEjVo7c%2FjQu7Gk54w0axcPT6tJR3%2FhrWWJsDLPN1IO4pyvQv02gZp6QghA5kkymEF5RVmdRxNJgyD%2FjVCqOAt7sLFJLPjrFeIitxcQBWPDfteEGOaZmwhFRgyOY1psX1VNc7X%2F7i8mey60pLn54KZ4L1LqTWvUlJbgYbv%2B4KK9%2FxOoFjN3cNGzqDu&X-Amz-Signature=c3ec265ff61488347afe03b33ab22e7efdecd56139727130c60056d6479540ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLJZ2TTH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAh97VVf%2BgxdrOy0FC0OYojOXHskvXq%2BOXxmh7F8wBPOAiEArOrxhDcTy7NrcgH002yfqvVk%2Bl07nrTAganBtHWaYg4q%2FwMISRAAGgw2Mzc0MjMxODM4MDUiDGOLMu8CMEBbKZ9H3SrcAzjn%2BZdBT%2BrLWOOyZKA%2FOz98HG5YPKgVhBY1M2YVOeku6eJYU1ooTZuetBcsvo2qT4XmEguoCRBAXFIDjTsOpL0Xu0n9%2Bssqv18EQA%2B%2BBYup5vnjOTkvpmlnG12gReeYxpLeAPTFxoqVGfhFkhczaexcN7tReD7FTm3P1oFPb7sfvYOuKYhazP7ket%2FuljeK5jLH4PMtGjBM%2Fn4Kxo54kWvnKS1kPHeEp9SI3NWkjxe%2FV%2FRTah1fZoG20k6IZVvpagRV575xbZdKmoMr1528YGqE6%2F8aEYHOLUFOXoQNoAxEew%2B%2BbHJasQDm5%2FVhaVmTM8R6omrJJ0qIDYBSPPYitdrYO3honXk8qAMaTTcLACGW1RmWR62BUZ4hVvXv5MlOwAHGT1APpQ%2B5vu9gB2GG6qbBsoz3b22QzUbx0uS%2B7b5Z%2F%2B1TxEadpvtOYHRClFs8eOvFyjXShePeM4inZUqYVhKnd139i58UXww27EeQb3agg0fxlHDcQhp4VNjw1asyBwNKLH1KVe5zSFXXr1hhVBgHhdAzOEbJlF5H3TR3UX7axT4u9f6wGxwxxcHcRYhlhZFAmw75mNfphQYSt6V3dtMkdUZ1X4ZiGUS9Yb3B6gJ%2BHQAbuSOg3HPW4nSsMNbvoc8GOqUB020s6IM%2FNg%2BBq0SZytY572zp4MgPyKj6MUHf3lUQQ3zYulCCACaDtYl5zrCyFrYdrdH8aEZXsyROKVmbS8ZghvVjyU6kJOWcdrT9AH7zxmn%2FY%2Bjmh1ota%2FL9C6c1ywn%2BTxh%2BUD%2FMCxCGYcBq%2BR0u%2BMxmF0vnuOlgcAHzEwaUEg%2BQWw5jLB7dnPtf3G838KPls%2BRTZGNwGuiQ%2Bxy3LIRUtsQlzi5b&X-Amz-Signature=c1d7d5b1e9c9d0383951a0863849cc4f65e4393ca8c248fbc772a6a3dbb60ac8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGKTGWVX%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIHfTj3gh9Wv3mUdPEozPVuyYEnh635GJN8Sz2NGQKD0xAiAWZjQ3CSxQk6RSwYOMcqOm1%2BsHsg%2FDR5OTJmbAAels%2Bir%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMinld%2Bb5R3g%2BepeyaKtwDckHcdTKVdW8zNtU4rkpV6%2FHVOcZ6Dy3bzpaU6YB5QUouEFK4DPON2ClPReqZpkcqD560Iui6u26fWmb5Iba0rI7CoU9xhiNiwCDcYonYE1MpChMHKmTPwH2Iu86G3h%2ByoVpCSc%2F6IXyIo3GNjHvvHjmMuuSJ22eU773LogCY96Wgqj%2F1c3QwT10a8hLF%2B8HmENWyBeg3nWMUJReOzOuRlZLB%2FmPWYEnOBrn231Evop8R0XvXhGqXaTs6yr%2BHoAnc1q2S15NgCf1F00d1UPTwVlj0PHl%2BzFt%2FDxEa3TPAwl2Bd2FRU%2F8QS%2FVhOz6ZYYAeqCurq5ylfTrUbq0qFFRBtrW%2FtWW65jNbvc4Ayj7DZMuNRNe4XeNXT%2B%2F9FJLmfnyVVjzpjqsdDtL4SsLgAcyn8Q2CfnxgzKAzSGhnaEq1N02hVeRWbawlRhC0AJUyrQ%2BD6%2B4jJvpSeQtCCjte5tE7FP9dB30eOXZnoRh7Fy7Y%2BglWiAuNvo207%2BbRTEN%2FxjlV%2FRWzML%2BPzj7kxGAECFi9rltiGAX7yZcRS6yHa8oJM79XdxI21Aa8JzOKQIioOTMr6il0ph%2FGlgC%2FhihzxEnJcdz8CtxVATuSyugsfa6Ns8bctQaNI1LrPjmMe18wpM2hzwY6pgEozrHJY5nlaCH0NWpPbQ%2BYLcEf2MVoc2k48yROSJHk34bIMITNsS4f6ZniSkICgVEEhNRQMv7Ke%2Bxai1wGIjJZeiU%2FSNRsux9c0%2Bcb5tTu%2FZJlI0Az5lvuLk7e3g2zztbIgn%2FraKHn%2B3N32562sESzg2NnsWZ6QSQ81emIB7CV7%2BRf8zTxxoBKaweZHYkNSPFF7rkrGpZMgjeEycyabmIN0KGAVdwE&X-Amz-Signature=be3d8d33fa8304c433ebd9acb8c1f10121cb905a8fa2b9b1c4809d9a09c750ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGKTGWVX%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIHfTj3gh9Wv3mUdPEozPVuyYEnh635GJN8Sz2NGQKD0xAiAWZjQ3CSxQk6RSwYOMcqOm1%2BsHsg%2FDR5OTJmbAAels%2Bir%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMinld%2Bb5R3g%2BepeyaKtwDckHcdTKVdW8zNtU4rkpV6%2FHVOcZ6Dy3bzpaU6YB5QUouEFK4DPON2ClPReqZpkcqD560Iui6u26fWmb5Iba0rI7CoU9xhiNiwCDcYonYE1MpChMHKmTPwH2Iu86G3h%2ByoVpCSc%2F6IXyIo3GNjHvvHjmMuuSJ22eU773LogCY96Wgqj%2F1c3QwT10a8hLF%2B8HmENWyBeg3nWMUJReOzOuRlZLB%2FmPWYEnOBrn231Evop8R0XvXhGqXaTs6yr%2BHoAnc1q2S15NgCf1F00d1UPTwVlj0PHl%2BzFt%2FDxEa3TPAwl2Bd2FRU%2F8QS%2FVhOz6ZYYAeqCurq5ylfTrUbq0qFFRBtrW%2FtWW65jNbvc4Ayj7DZMuNRNe4XeNXT%2B%2F9FJLmfnyVVjzpjqsdDtL4SsLgAcyn8Q2CfnxgzKAzSGhnaEq1N02hVeRWbawlRhC0AJUyrQ%2BD6%2B4jJvpSeQtCCjte5tE7FP9dB30eOXZnoRh7Fy7Y%2BglWiAuNvo207%2BbRTEN%2FxjlV%2FRWzML%2BPzj7kxGAECFi9rltiGAX7yZcRS6yHa8oJM79XdxI21Aa8JzOKQIioOTMr6il0ph%2FGlgC%2FhihzxEnJcdz8CtxVATuSyugsfa6Ns8bctQaNI1LrPjmMe18wpM2hzwY6pgEozrHJY5nlaCH0NWpPbQ%2BYLcEf2MVoc2k48yROSJHk34bIMITNsS4f6ZniSkICgVEEhNRQMv7Ke%2Bxai1wGIjJZeiU%2FSNRsux9c0%2Bcb5tTu%2FZJlI0Az5lvuLk7e3g2zztbIgn%2FraKHn%2B3N32562sESzg2NnsWZ6QSQ81emIB7CV7%2BRf8zTxxoBKaweZHYkNSPFF7rkrGpZMgjeEycyabmIN0KGAVdwE&X-Amz-Signature=be3d8d33fa8304c433ebd9acb8c1f10121cb905a8fa2b9b1c4809d9a09c750ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKMBUFOW%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T082111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDAI%2FHlP3OkraE1lVlgzdOWTkY3FZosYMW5PAflF8YjOwIgAKSCLTyiF1C6Fyr9tMEqSbbtDkEf71dxjJbLJElJ2Msq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDETFItglS5eNBJkBfircA2sULFlVZAfjLEccsvKNApIxKbYC1sIiGkDMHo3zhTdam7drKEyyMGXJK%2B8MQhYw%2BTWq73ZtYCV%2BROaL80OZK0asF6T%2BPlmXmN%2FONU23sdsdOQk%2B26X1RUtgdxLbFKWHnYkSfKmTFESZwoav2AlKDVRGxvEScSe8vDUcbjQRMHYYGZUdqlo%2Bab6oJTGQP4MRwPKnIMx24YyFqnnFayOti6iPfgZfL6L8iKEMTjF5dYZUbtMNGLRIMzYSwVT%2FPVrSMM1hX0nHB%2BywO2PAfOo2s8AkVpH7VuJbu70mUA%2Fme0apynAanGu%2BFD%2F4nRZRsr5DFXjAZ0wNtC8kgDdSUU5ndzKnNIMPLqWcWYIXyrxKarp5JGiVTcnS0B%2FwxA%2FmXWK40xaINPINtuSiF8qeIPMumVw%2BC7GES10WkdIWHKh7E3uER5sMav1YhnsZb%2FZe66WpDmz7oEIsLOg8KBTSW68jih1zUnuR7G%2Fpr0hVMQaV2haSH6lEIHBQqsxoYPA%2BL%2FPP70ePjbzZdRHpruaJHPX0bAh3JHCYE%2F55oW0kybPm23xf2GQRKqk%2BgRKnyynquPU4mwx9OLAkpcwSo%2FjQigSDRwRuM%2FQheFYvSQr2MDw7R0MtU1SP139SOd4Smg%2FwMJjOoc8GOqUBj47VWv9w2bhTRdXFGDiRXru4bNiOpp06JNiDwwz6aIZG09lQ3zs4hb2NQ2XGvjzjIqOMuxZp6vJ04QDJ8zFWDXlYYt0OHmgw7qS0x%2BfIKB5G%2Bi9uPYzWX2EFhS8wedOr2zJndRTGQGrXVbBKocdeqm%2Bix%2B0RVuWaAEH5vi%2Bq9iZApwq7juDXQjHCa2tZxUxQk7vPCPrwNJq1TZ72NKUgddmKhmLv&X-Amz-Signature=14aed8754d22b2fb9f1178e05e5baf95e72b1be4b308c38d365fe0ff23d444a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

