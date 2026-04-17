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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHR3EFGK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQDoIgdiWGGt0T2UJfEiLpyu5CePMVcKUT7VmLC3xKjSgwIhAKweGMYzCwxp5xB60mLrGfZ6AWxcSio%2F6ZkF9hq3XvfqKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwz1TaPbFykIcInU6kq3AO3IdsCpkDMsIz8FrGYlutxRgYoUCCtWVRzD%2BWmoQmfxj4CFoef9qk3OHmrf%2Frd%2BzzBd4%2BdddVgHroTkxMdW6FbvaOpcPYoGVT1Nu3bsH8VDe4eIKD0Aiw9%2F73i9I%2B2PeVS41IvFXCQ2XM0wq5jmww%2F7pkXiUYw0NJVpKhGeAsaNzxW9axF6na7WeaSqQtP%2BcSEFcaoJpodLOR0X9IDyA0t69IjgHxYK6BUgcr8t0kLdVY6BD7BiXJuONQCCBEluHdbVeuuAGwZ6P%2BB5kPywBbi8ZTfABBBr%2B1eLo9MutxApwjJ9JI08p%2Fivrxrp0nOdTkFnVNqa%2FGLw8bElm%2BBBWRbUD4lp0CSCsw8BCOCgBPAl1Hv4eOjwX66csGZ5tmXqLIn3mvOd5gsGvEvEPET%2F4CCIMXCcyN0BEiqwmak3fEbKO4g7LBEJUW5RLbnjwmJX4jI9KYYKjvqxGPXzdynVKqTwzSdqxvVMmdmdS3t1yzYpGwfK4YCESVoxiV3P2eRO1teMshDWnmpCP43sK3zr13jmySigmUf4YDzI6VR1BhMDB%2FBOBzfqGHP3%2Fa%2FUAQjo6OKALT2tt5o6w6xXjaP051c3zhMqYMUDxbxUlMgyNow%2Fs3NWu7G1u%2BMZ%2FNuYjDrqYrPBjqkATLFZh0inqlzBid4c0PhCWSiFnnxl%2FJISxa9KT4G3zXRbtzs3vFyBWRxZEEUW5v9i5bPq%2FH3%2F9EP8OWkLoW9j%2FPe4DPKa%2FDoeWMvp%2BO8TVZsJhis555N624CoyWMc5s3oGJlmSDw7TK9pSvFtILX7r4OZtKcqEYk8MFoOKdE96URM8o1vZxYb06suxglYHatz16fVcYNKcffTrVTgDvhECAUkdx7&X-Amz-Signature=53f36f9677e3f135ba05ab19c3e0c3cb29be786e12b64fba1defbe50a656af26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHR3EFGK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQDoIgdiWGGt0T2UJfEiLpyu5CePMVcKUT7VmLC3xKjSgwIhAKweGMYzCwxp5xB60mLrGfZ6AWxcSio%2F6ZkF9hq3XvfqKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwz1TaPbFykIcInU6kq3AO3IdsCpkDMsIz8FrGYlutxRgYoUCCtWVRzD%2BWmoQmfxj4CFoef9qk3OHmrf%2Frd%2BzzBd4%2BdddVgHroTkxMdW6FbvaOpcPYoGVT1Nu3bsH8VDe4eIKD0Aiw9%2F73i9I%2B2PeVS41IvFXCQ2XM0wq5jmww%2F7pkXiUYw0NJVpKhGeAsaNzxW9axF6na7WeaSqQtP%2BcSEFcaoJpodLOR0X9IDyA0t69IjgHxYK6BUgcr8t0kLdVY6BD7BiXJuONQCCBEluHdbVeuuAGwZ6P%2BB5kPywBbi8ZTfABBBr%2B1eLo9MutxApwjJ9JI08p%2Fivrxrp0nOdTkFnVNqa%2FGLw8bElm%2BBBWRbUD4lp0CSCsw8BCOCgBPAl1Hv4eOjwX66csGZ5tmXqLIn3mvOd5gsGvEvEPET%2F4CCIMXCcyN0BEiqwmak3fEbKO4g7LBEJUW5RLbnjwmJX4jI9KYYKjvqxGPXzdynVKqTwzSdqxvVMmdmdS3t1yzYpGwfK4YCESVoxiV3P2eRO1teMshDWnmpCP43sK3zr13jmySigmUf4YDzI6VR1BhMDB%2FBOBzfqGHP3%2Fa%2FUAQjo6OKALT2tt5o6w6xXjaP051c3zhMqYMUDxbxUlMgyNow%2Fs3NWu7G1u%2BMZ%2FNuYjDrqYrPBjqkATLFZh0inqlzBid4c0PhCWSiFnnxl%2FJISxa9KT4G3zXRbtzs3vFyBWRxZEEUW5v9i5bPq%2FH3%2F9EP8OWkLoW9j%2FPe4DPKa%2FDoeWMvp%2BO8TVZsJhis555N624CoyWMc5s3oGJlmSDw7TK9pSvFtILX7r4OZtKcqEYk8MFoOKdE96URM8o1vZxYb06suxglYHatz16fVcYNKcffTrVTgDvhECAUkdx7&X-Amz-Signature=53f36f9677e3f135ba05ab19c3e0c3cb29be786e12b64fba1defbe50a656af26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y2Y5WHX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQDErTW5my3TkuBLI5cJhdN0%2FtCFiVu5DsoLobPhqx7JigIhAOmUMhVV3wX4A0ZuGO7d0b9LeNCOfoTarMvRcX53W4IrKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwt67O5Wu1Eh8awNQsq3AMEmkE7H6ZomQ7WmlXnecrgHswNv4D9o95Id409ITz3VHXwJfoOE688uomCf4hWHZmri3NzNmDnVF6Az6KHla%2BEXDph5A%2FOBEf%2BI7MemogD60PNJ54kKKYSaW5fQYVOYrWSTw%2BsAabKAqXTgHGMDcr09lbPvqU%2BB4pnIuebHHqQoZ4I8zW7aUF1AWom2kdTXlcWRAJsnJvmXQ50wyqApGl3cMt0j0Pp%2Bj8op6XI11fHqBFj%2FmfT1yx0gn%2FlAammvSIGfr9KFFhX3zmViFY%2FPIOVgh%2FySjJGqHIxCYUjG3MDOuN6Dk2F0YHwQWFu%2F2qEYod9Uiu%2B%2BrNAbk4n%2B6YmvyghEsbroFBa2jfC9duKZBxZaBpAutfuQROoUjJNKGnJ4Z5gpi0g1bThtOJtEw47I9UvHN3CFKvdAN%2BrkpFg9uhLwHFMBl7Je7duv%2BrFUruWXXpeE0MjwuSEflr0ii8F76KB9EpsWRH%2BYxMIIftmzawa0Ibi3zhxbyUq%2Bg2IFuM25%2FjmoXAELbi15%2FOg6bFIFN%2Bw2auwEMMjJizamQgkbWM07u6d9GFeCYfIEWY3PvARM5kBltLUtKzXowbcoUy0LM52kt8IPi9t3X4c0fsL9rSJtbQ2ziP3GVaU6uLACDDhqYrPBjqkAVJpyiZcBm45lWWHd9IOj1qvVDg6UwCVS2uoTUnFPT39AE2nNPR0AzWZYaMsQFltNrV4PpxszI0ykGR%2B%2BWjtoiRgFNdJxh4GtUOnbRKm7LDJ45pwXIZlA1Cf393mu9Ev6R1YlBnezRKwwunEL%2Fv5zVMFFD7zURE0uqwF2UgoFGgjjcUqUuM5uo8jgF%2FS1AAYufyqsVy0Fmoe6oIJvZMVVfZ3Y79T&X-Amz-Signature=55dd377e74e20309110f20f19532e368a52f6f689019373aba9c882b4f8732d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZADWUFSG%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIFeXyjZJxUwf4BjqYEJF5Ynubq0uHTZZEIp5liotj3oZAiBTT2VBypPGOweDwdGA3u2WGMq8Ws89ovoXO4laDxz%2B0iqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT%2F0cXHkGoEYPr0v3KtwDAOq2K1f%2BO6saOWOapUEGb%2BKk0D9cXYDLBXUmftHC03vZqPCT0vJjKjP%2Bmuwr6HdF1Ij0ggERRrvXWmhV3uXD36Ltki2kbC0AC9hD9uvopaZ1AFO%2FMEGjFlE0Xh75EGMPmeeVy%2F7nl1XxHcR5dUogX2unIfyCUAel9RIZhz5FnqbDhwKjuofBDqvAXMLIcgN%2BytZsA7hs2P8T3Vzx63VDkmITGTNeoJ1W4nPdWj9LnFfHT%2FnYYsA8E8FhWrO37C%2BASOVKAMVj9DsNuGVHEc5QbqS6C5WQI0d8RG6goXEkzhnfktWsNfp%2BcwP8fqKydvPcY7x7T4p9N1ROhM9S1MUTswXdmz3NkbnaGjvPW18jOjtYYO0qKY2jHtWJJHTpW8H9I3%2F1AfncynlqPiRyjP4NJj6ahbji%2F8z9bTynOLMohgKDp0ob90z1G82vbwx1TCnBMki5xtvmbs4D2xE9MHXfXvA%2FQ62Gj3Qcu2E491Whm4hQ0tCUNDpLJvymk9xuOHlrnK9%2BcR8nRJSA%2BCkX0O1toB36q5SClIxD79mlIB0DNmp7fyo750v4S7ytCkHBv4PZDVaQ6diVZdza%2FS8Tm9mmOJe%2BNx7fmEsMnuCprhI8i8eJHpd8nqQhaupshbkwwaiKzwY6pgHgGPJ1qNB3zytHkZatsjjhpGoRdOYBkbLJoplLilBZXXp4BbsofHYeULgxxND9I641V4fcJhfbj4pUjNMf3LLtR199f7%2B7d0n0Z%2BDSma9UZIQoy8x3V90ThdiZsTxJnwP2lqgRg1MUQ0ggLKHhX3AgCHfRTlKkk2yQQCUQx7IiapfiiODWwoT8jfdi7xHwtOSBhKmrt2flEQIhswKfTlvtLY%2FDAogQ&X-Amz-Signature=5c69ed4044a8820a5efb4ec7f25ecc318824bc772f097eb34ae0e251fbcf91b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZADWUFSG%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIFeXyjZJxUwf4BjqYEJF5Ynubq0uHTZZEIp5liotj3oZAiBTT2VBypPGOweDwdGA3u2WGMq8Ws89ovoXO4laDxz%2B0iqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT%2F0cXHkGoEYPr0v3KtwDAOq2K1f%2BO6saOWOapUEGb%2BKk0D9cXYDLBXUmftHC03vZqPCT0vJjKjP%2Bmuwr6HdF1Ij0ggERRrvXWmhV3uXD36Ltki2kbC0AC9hD9uvopaZ1AFO%2FMEGjFlE0Xh75EGMPmeeVy%2F7nl1XxHcR5dUogX2unIfyCUAel9RIZhz5FnqbDhwKjuofBDqvAXMLIcgN%2BytZsA7hs2P8T3Vzx63VDkmITGTNeoJ1W4nPdWj9LnFfHT%2FnYYsA8E8FhWrO37C%2BASOVKAMVj9DsNuGVHEc5QbqS6C5WQI0d8RG6goXEkzhnfktWsNfp%2BcwP8fqKydvPcY7x7T4p9N1ROhM9S1MUTswXdmz3NkbnaGjvPW18jOjtYYO0qKY2jHtWJJHTpW8H9I3%2F1AfncynlqPiRyjP4NJj6ahbji%2F8z9bTynOLMohgKDp0ob90z1G82vbwx1TCnBMki5xtvmbs4D2xE9MHXfXvA%2FQ62Gj3Qcu2E491Whm4hQ0tCUNDpLJvymk9xuOHlrnK9%2BcR8nRJSA%2BCkX0O1toB36q5SClIxD79mlIB0DNmp7fyo750v4S7ytCkHBv4PZDVaQ6diVZdza%2FS8Tm9mmOJe%2BNx7fmEsMnuCprhI8i8eJHpd8nqQhaupshbkwwaiKzwY6pgHgGPJ1qNB3zytHkZatsjjhpGoRdOYBkbLJoplLilBZXXp4BbsofHYeULgxxND9I641V4fcJhfbj4pUjNMf3LLtR199f7%2B7d0n0Z%2BDSma9UZIQoy8x3V90ThdiZsTxJnwP2lqgRg1MUQ0ggLKHhX3AgCHfRTlKkk2yQQCUQx7IiapfiiODWwoT8jfdi7xHwtOSBhKmrt2flEQIhswKfTlvtLY%2FDAogQ&X-Amz-Signature=7e0e9347ff8367191cde9abed3c832252626f96cd03df5f31902941f78627b3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKT3H7ID%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDYtw5whaTAnWZ8qNq87pR2g8ZTI8Qdx32qD4DliwI8%2FAIgGOtx2ZFGTST9gR4oYI2lg%2BJAwv2ZVy0TSQDwXWtu1EoqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCqrNt9xQmdlW8QlBircA89LNCK%2FebPxdCAdnoQDwWy51IquB%2B5zO%2FWNuRN252NTky4AUP6frwLCftk82n792NbnNz1rJ%2BkWRrAT6lnSvDQOChkCRuSro4oT6%2FSFxfxTNPt1h96wNrZ%2BEDCxb6Unnnx5Xa50G5cIrgaku3iv8EKttDLKVv4pAjMU5j8qWrXQagreNukCZegemlXa%2B%2Bs09jlFRqJuRrQmWWvpyvGI%2F5EcA1gjLB2MUOQ83FXn7QX7%2FytDk%2FfG03pmrR7QLXlhhlgFEvQ%2FQ%2F8RvSUBPwHBMMZAifrB8gGDkdxKrNjaYaZAMZBP1IoZu4cuW7OzMq9O%2Fsj6i7lLgePpC3XnymMah%2Bn%2F%2Bu%2FAVj1Zpe9%2B0URqNvI%2FawmGaA7gPGAUbm%2FVyqQcZ2nEPA6bqqv0f6gnqIruyYMH3OgyDfV%2BNUuYuD30f4SjNxPtC0QEzfuEjBE%2Fa6tP3wyP2nAe07GqRq8q1JJMWsWwwAbOBysbZbmP5jCufK%2FQwnTXwl2qIrhlDtk4Wl8ERYKVHPGmEPrb7EZnSK62K69oE0kXpvmzqnco4a0tv9XcoDGQSSORWBhbvZdZivRX8fBM52aJFUXQ6V6HQMuIEnXxYZVtM6y%2FzhjgjiR%2F8Opfd7bxTkrMyZpg0T0LMIOois8GOqUBsa5EhOxKBRlsqJy1dNuPIpTQxJHB7TNff21sAnfvFrm5fB21l1lLYVeepUEQKNBc5qCGxwyQtfj0Fp0bUmotlGoJqflJeKtu4dm6qKgk%2FMa5NdqhQAelqRr89GF%2FJ5GOG1mshSsw13AyZ%2FvbiX0T%2FoS94AkTSF9IUg7M%2FGP1735WI3FSgiJAD1Ed2fGVtHt8lKUocdL2BBLAxohhKgq2JachTPy7&X-Amz-Signature=a3b1fa939337ce2dbb7706212ef07edc6bb3462e555549523f7da7c5ba9d3b52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNIXPQI3%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIHH1J5VVTbY3gwliaPKCseQbOWG32UvWfHLfzhLFKjK%2FAiEA%2F1fO1mKuY5qTekP6iZ0aBidIlsM9cDMXBbMSpykQKSwqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAr403GGq5jnfgUdoCrcA9sKFO9sb1kIhjo5ddzcfr3RDrnMAX2zybwUynb0ZUiXZr6tJrFTBuOumOqY%2Bq9sFe39NgHnrT3lQdtH7VD1hBIXvwa1r6aYTHGCHLB0ezFvUYMbxNqesDiXPLR9NUn%2FkH4KCUOqJ8cONV3XUoVY4aMElfsSDJjmebhn%2BC2Otmmhvrgy7kaJ238jObGoOtzbNqEXK0oEv22kt4jMG9JySlJN4HOevEIcj%2FqEoFfbG9DrdQO6K3h6UV0F1gtzG3IcCe8ybTGfqTV5NMYRtb9OeUWcLv5N7T9hy8jtLggJQnFgfBB4i25SHNCVOCBgyDHQoKzgmSWMRhx2CxUI3PFQVHj7dDDQCDQ1RR3SgE6%2FXwgtOM3zlUMZuPFydFuhcXyey53NmEhHxdBloHez213KWAdPzQPAw4oUsvPsXD%2FgCT6R6ax39FAltMMqi0DdJnjwbWlV239kaytwVVDbURWtnpeNh0YKsfR4gYuyfshJ2xQKTJEP2hAu0%2B2Z14wG%2Fi7q%2Bv1nxmwsIAimd6UKgcEM%2Flfa02NMexg4IutC%2F3GcjmUfkxM%2F1D%2FyOhEjV1ic%2B0pgg2iqnTfXuHPfhbTYV5U7eeUrMPEONFlMB6CxNXgYmvV0mAjKBNRz5pHgSmk5MMSpis8GOqUB9gNFZBWA2dcDOECX%2FLSJ9FpzQBqeCe3sH4sjvFNaqGL6%2Filnw9DrYSg06MI85ofuBE9F9OR4NVF0gHPhw57C5hCNpoQU7dR8GPxKsq4gMCYlZRi9T4OZ1Ba9My7lDmUklv0uDAEGUMyJEJmhegz6XH9jNurRXbLtcI9DPpbt3sk9DdVO5ILWzrb7LeIPXpsbI6Sysc0l9%2BV8yPpgToR1WgBltiZf&X-Amz-Signature=5b93a15862e906e1851060bdc6245dfdbc44f30c13e29485467dd1c94cb7bfd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SO3X7JH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCYQOyYZnMEXd%2Fo2fId%2FlUUIwnjIPqLSpJzY5IPUQqGJAIhALP4vSik2dJUWhGUTko1E4QFsm2IdXo1k%2Fdx0ob6kAgcKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxqGm6S5c2wLcMKzvcq3APKqGDealzO03cfHQrr8bCP6006OX%2B0VpT74UPdrsF8wkFqbeN6DCoLDR9Fmcgb01pt08pUausUNYvLTt8Jwpk5QYq%2FNm07XwVCQGndTyuIDiuX4m3Sb0mQnd1dZvGhcTuNCe5RgcW1UVVt%2FRCWVLmxJ4n9u3jL%2FH3EPnVcFoLHZUlP60E3KgrChmFLb72YCN5EZRym5jBIY5B5qIT2rvG9nPKadZsIpCAaU12ltS8%2BYYMEX%2FSTCi1JAePeaAaC8LQKo1%2B5vv2EzmSt3XykS%2BGM3bf9YF27kJLeGMd5vL57MFZI%2FjDUqncTtlENQn%2B2uen5D51dmT%2BRuGVJRWmXgDMzoBD4pxGK3k7daGGn08MVyGaWeZKN8N1XzKaVka0kWD5AeduIX6ZpJQb2JOJhLHMUzVMSY%2FrX0Z3otALaa2yL%2Fp%2BETM609ETCj0FOGZTAhcCak8mMLAXjdfFux7aqoZu%2FocuXCh2EIgtt7tZmL2pgm6VJ7k2ZWTLXa6t6HGBgAqv6nrCTTfkjvhjsQDUSTnqCWTTWtSb%2Fqx0NZ%2Bj2Sgc6WddmS%2BLKbz1vTrloJjtY7ng41HizfwVrIMXF%2FeO0QUD6%2FTL5QllXsN78ExhFHBKU2ZzB6uCF8QHtrRJ0cTCEqIrPBjqkAc4rm%2Bh%2BYh9kHjAxeickCyi%2BTSNm6qqKlsEH8GrSTzzIDJQwYe6ctGwT9Z9vTcgrkb22BbncZB7sNzMIb7Yu3EpZfSQOJhMAqntiWO1YZE0TqP3zcBSuUFphuDdk9jnNx8fbPkNeGfdYxQENn7CTs6dmjD0m7ShTYpY0%2BPfFgNqkTn1hPuMmWUbof5tSJMqo45is2ADaeyy5pTUsRXcyKDayAmwb&X-Amz-Signature=14009aefdee1114dd5d70be80b33cb60a56f6c6ba33ad237a3db12f7ffc21463&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z236BY77%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCICZryGGeFrzSJc0Kf7S94oDUEOk%2BZC%2FoK1k5vJbffGIuAiBzQhULrS2%2FLT4YzO7D1%2Blg9Gn0GuWvbW778UN5Ry8qpCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FuIwiAL5QnB7fve8KtwDQisGhgPV9Ril621%2FrHwsyz9BimTT81ATEe5H19vEuCN2ZlDUgF%2Bs5C8Vz902gwuKEetK2zG%2BeGWzyWX%2BQLRr%2FWtTBAMX8%2FcJZwuGajOLmFJlkQ0nn3PklbbK5UIlgMsrI%2FnGe99xG37IhJ9fRPwevSYfdHQaPMBSA5TIAEuO%2F6cr34gOkvW1jHulIsNo30O1ELpMAdlTGeSjpvp54XMNIuiFUoFYjxHyF5uTfNrvaDjuvfEynrOGLSHf4MQoIcVYJsUFGbEILOSfOfgllvNN7pnRvIz2wF6i6xI5GcfZ40QbBiMNq49PLy80GVtH%2B4FbGtISzy4s6KdwFnweIOLo6P6rlGeh6IFMAA1U6le5TgnZGH3lJIhA13%2FHODZsQcj8aUHyN4SRYB0ZNJJl0y6ir889SuYiZp7DJ7X66qjOVSzfHuW%2FJXO%2FdUvELVcpMnxXrdCeOuM%2BjP47TWzffsoILw8nRCNrhL4lM246dAqFyxxpvMiGiagTyBb4n1nCZNkgPnhVVPzBS%2FsFH%2BuuC5U6dV9ZE%2BvQMhp3%2BGB5t9WdBbfud7EuoG7HUonCvKdRYaoYO9wnO8Bje%2BO6XXiQbWC1krc6smKQkC77BOifMqUyu35O56PPgyHze53kzYswpqiKzwY6pgF88Ma04tpQMrLnDuTX8JbvQpb0dLbTSlLcwNNeTc6m1Dyne1jiFUd1aZhxnrg%2B5cmxez22Ia1US3M1N2EOsqbQ6Gfwrl7SJODCcvNwj%2BqwH9Ommd%2FaUTWD%2FONwetPCS3EKRJD751yuyJ9vDposJONEwuoptMbgCnXpgDKI9GW0r2RCuzgs8zUfAQX716husU8ptUklElMVpxdIoGk2%2FdAx8FIbzSQo&X-Amz-Signature=f03b1c753d79212b36bdf7e16a54726b301edfd76817c1df803b20c0be306a3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z236BY77%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCICZryGGeFrzSJc0Kf7S94oDUEOk%2BZC%2FoK1k5vJbffGIuAiBzQhULrS2%2FLT4YzO7D1%2Blg9Gn0GuWvbW778UN5Ry8qpCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FuIwiAL5QnB7fve8KtwDQisGhgPV9Ril621%2FrHwsyz9BimTT81ATEe5H19vEuCN2ZlDUgF%2Bs5C8Vz902gwuKEetK2zG%2BeGWzyWX%2BQLRr%2FWtTBAMX8%2FcJZwuGajOLmFJlkQ0nn3PklbbK5UIlgMsrI%2FnGe99xG37IhJ9fRPwevSYfdHQaPMBSA5TIAEuO%2F6cr34gOkvW1jHulIsNo30O1ELpMAdlTGeSjpvp54XMNIuiFUoFYjxHyF5uTfNrvaDjuvfEynrOGLSHf4MQoIcVYJsUFGbEILOSfOfgllvNN7pnRvIz2wF6i6xI5GcfZ40QbBiMNq49PLy80GVtH%2B4FbGtISzy4s6KdwFnweIOLo6P6rlGeh6IFMAA1U6le5TgnZGH3lJIhA13%2FHODZsQcj8aUHyN4SRYB0ZNJJl0y6ir889SuYiZp7DJ7X66qjOVSzfHuW%2FJXO%2FdUvELVcpMnxXrdCeOuM%2BjP47TWzffsoILw8nRCNrhL4lM246dAqFyxxpvMiGiagTyBb4n1nCZNkgPnhVVPzBS%2FsFH%2BuuC5U6dV9ZE%2BvQMhp3%2BGB5t9WdBbfud7EuoG7HUonCvKdRYaoYO9wnO8Bje%2BO6XXiQbWC1krc6smKQkC77BOifMqUyu35O56PPgyHze53kzYswpqiKzwY6pgF88Ma04tpQMrLnDuTX8JbvQpb0dLbTSlLcwNNeTc6m1Dyne1jiFUd1aZhxnrg%2B5cmxez22Ia1US3M1N2EOsqbQ6Gfwrl7SJODCcvNwj%2BqwH9Ommd%2FaUTWD%2FONwetPCS3EKRJD751yuyJ9vDposJONEwuoptMbgCnXpgDKI9GW0r2RCuzgs8zUfAQX716husU8ptUklElMVpxdIoGk2%2FdAx8FIbzSQo&X-Amz-Signature=a876b155f81c9ed3d809ba9f17680d6503028c0c3d72a03dc2cef62dcfd577a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAY2CNBH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQD7MZ182%2F6BVYn%2Bw5pippbNW49bes%2BJOQdpXxiSrnqO4QIhAOnMfGbTrYbIbqBnUif3irQ%2FWL0VpvnvhIsJ1hS73cZhKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywSJ%2Btj1cTSZYPgZUq3AOnCZFeoQiFpoylOuVEeOODBTW7EGD5uXmcaBIMsyNnukw9FWYyAobA%2F04WZ54ID8TmJf4vqpksdWgQT4nj6dV8dOrTGTOcTDJOBjNg77sNb7mNpl%2BJS9RAdx3EAq%2FbP9OAPnyvDU0OAgcOych%2FAxqWiuVyn9hPP%2B09bGUXNLw%2FIKcvKBJQRYyGpTNvyfkLs2YMuuu2h54wMrhOPk4kr5tS%2FDCZzrf8%2BdxibW2YCJAgoknNteXoIxAhhgagfxriufmZJhC19Whp2qT1Zn6hRnsrmP0dvEs6Rg9Naqddcl2aoD1sFOS1RoZYneLBFJx05tVXpdxUks6dA%2BlB2wsc4PiW1mgzuwW7txkEwHgLJlYT2i2OSZwhqxJXgXCpG6sD6%2Fbp9Kz7PTlr5oypGKQe3IB3C4qF%2B2%2BdAzZ0gmHhlmjwuHNff3jmMqnZc4eMWAt62CHUUMO5RVaDAptTD7%2BxNtVzkkoIMHDgR0KQBgeKH4lFdRXmwbUqTQncPA%2F56jfKsu3Tyr5EKvNEfCvipq97Q%2FoYLBaKm4gvlEPyovMocKyBwWQuIrzvn9YVfGB0U6rOpmSJJ5IiqF5d9CDd9Q%2FYkBXK2bJRjgSdaVRKVbzwFbFmOR%2BJsH5ykFLv9lFSAzClqIrPBjqkAWyWkETDYOOZzRe3fbcE5KoeDoj94SdlQ6IttP%2FdqxGDID4PF5wpUk%2Bmz4u7oguXNziXVBHJV4gIeVFMMpwshqYqmByAylUWZMPSRgagvzIgFoYHP2Wj3Y7POuGxnUprCVS1CyKWrd8Nat9L%2BnYVVMSPafm3T8L3xXg2yJ%2FLeFyr1ZcB6SQTK4B210YjSSIDCueg7EKoHUFnvTTFZypRkHVcj8wh&X-Amz-Signature=8919ffed196e67552b4344cd921b293c18b0d11de2b575b92d62060344a4ca1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVLI2PGY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCICSGJ%2F9DeFHrsllJgr5oN2MmbseyYBy2WYAGdfTNMJpHAiEA4qzeV4Nzv5ABrTjsCkeHq4jzNwBrKfK%2F3Hh404CkOq4qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7v10UVViH9inLc0ircA6beHPKK3d5%2FV28%2F%2FjZ%2BoaFk40MF83Xg%2Bbc3p0nRNDb92bU6XsQtHfG%2BGXSbgR4Le7Pnx%2FixYowp4KcgK9Ne4Xc2Bjt4TWUVr2lqoCXRxPqQIj0GNQC6OIIlb%2BKnd3aPmluTpEPn3yitUE%2BjoJ7prknZ1TMd80gSZb3hNwx2f1qdf0i2AFcAuPSikh3s4EKaePQlRXckUTrI%2BQLTrDaCPmu5lKv6dVgv3wKz2cFkVgTGKK0x%2FSDt%2FMnz62u6lb2yKjtPzTLYG%2FmNkO%2F5O%2FoqaXqdzh2BzjWVgJkQ6GYfcqBHPSItaFncDK36Ez2FN8fMDBHBVmjttxtZE1FV2QDAWR5WasTlXdTovfgO8BBKYZN1JOkmITc4rt20PpEifuBdOM6IA4HHKBX9EPUQ3NF95yzVKrG0D83AXsNAC1w%2B%2BxZKkqNw%2FjhaSyk1CYsDd7C0dR3MTrEC2VZExx%2FzREITavofxDmrUxO6txe1gEm3uC8Qhr8%2Bq7mMMsQegvotzq9jyzL2%2Bq%2FNsVtBOv8NH%2BbOuVKI8xKTbkUT20XophJZeT%2B%2BiX5rNFa2zcb%2B9YrF6RcpJkQ0QeFXVKk%2B9FjkN60ZioiJq%2Fa60rMoWCIjQ%2BJSVEJoNmpXQjms6yYw5n3%2BMOypis8GOqUB6UJwJX0QkschSCjNOTCtfM0FYSuMi9aeUj5YAAAzGpaDRoo%2B1EHzvw%2FR3SomGp2o34Ee1J07lp6H044dF7lW7CJUgqVAOph08lJzQSa8KbFQ6be4L81gF5ieVqaZ58Hpmp2WFjcrbzeo%2F0F%2Bq9wZDhZvA145%2BhYbDbTvOz39MgMdnayC9Kg7SIjJiBMhE2twQxWF7SoLfbgS7q6%2BWs6G6UCOonFE&X-Amz-Signature=cac94bde43825c6eb0c2893503955b03e8d5331d6a4d2ec4180af27db3743420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVLI2PGY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCICSGJ%2F9DeFHrsllJgr5oN2MmbseyYBy2WYAGdfTNMJpHAiEA4qzeV4Nzv5ABrTjsCkeHq4jzNwBrKfK%2F3Hh404CkOq4qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7v10UVViH9inLc0ircA6beHPKK3d5%2FV28%2F%2FjZ%2BoaFk40MF83Xg%2Bbc3p0nRNDb92bU6XsQtHfG%2BGXSbgR4Le7Pnx%2FixYowp4KcgK9Ne4Xc2Bjt4TWUVr2lqoCXRxPqQIj0GNQC6OIIlb%2BKnd3aPmluTpEPn3yitUE%2BjoJ7prknZ1TMd80gSZb3hNwx2f1qdf0i2AFcAuPSikh3s4EKaePQlRXckUTrI%2BQLTrDaCPmu5lKv6dVgv3wKz2cFkVgTGKK0x%2FSDt%2FMnz62u6lb2yKjtPzTLYG%2FmNkO%2F5O%2FoqaXqdzh2BzjWVgJkQ6GYfcqBHPSItaFncDK36Ez2FN8fMDBHBVmjttxtZE1FV2QDAWR5WasTlXdTovfgO8BBKYZN1JOkmITc4rt20PpEifuBdOM6IA4HHKBX9EPUQ3NF95yzVKrG0D83AXsNAC1w%2B%2BxZKkqNw%2FjhaSyk1CYsDd7C0dR3MTrEC2VZExx%2FzREITavofxDmrUxO6txe1gEm3uC8Qhr8%2Bq7mMMsQegvotzq9jyzL2%2Bq%2FNsVtBOv8NH%2BbOuVKI8xKTbkUT20XophJZeT%2B%2BiX5rNFa2zcb%2B9YrF6RcpJkQ0QeFXVKk%2B9FjkN60ZioiJq%2Fa60rMoWCIjQ%2BJSVEJoNmpXQjms6yYw5n3%2BMOypis8GOqUB6UJwJX0QkschSCjNOTCtfM0FYSuMi9aeUj5YAAAzGpaDRoo%2B1EHzvw%2FR3SomGp2o34Ee1J07lp6H044dF7lW7CJUgqVAOph08lJzQSa8KbFQ6be4L81gF5ieVqaZ58Hpmp2WFjcrbzeo%2F0F%2Bq9wZDhZvA145%2BhYbDbTvOz39MgMdnayC9Kg7SIjJiBMhE2twQxWF7SoLfbgS7q6%2BWs6G6UCOonFE&X-Amz-Signature=cac94bde43825c6eb0c2893503955b03e8d5331d6a4d2ec4180af27db3743420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUA5PMOK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T203146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIFiQ%2BZQnKM2g8SL5W%2BcnxlZrpdmoWVTdoI6hQB1CA%2F%2BnAiEAwIgE1S7jd5dF%2BgoY1xDHVk66%2FDGnlwpgbhoXXRX0NLYqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLSpht4l1FgvdM%2BgbCrcA9k2BliwOcd1x%2BBpFEyv71F19FElDn93h0kpwHSpKatY6RPrjERsZymgMKn8cCxKMbaOCGBR3iAg%2FQKOb5IrhFxJicvUV7OA%2F5oqDdkirN4LV2L%2FrSIeyJZHl87LexQZLxBQOJoGm2tzNDCXKSqE8Ctl5WvjTwi4BG7sv%2B5Hz8ylzI5WYgMuxsj%2FUkn6SCu6s5N0bOD3xSBzDjcWAw1whn5hgY6wxpxEr0ZFesBCjX2CtJ3GfAMtwTnMq6xsymBnlxYIYzDz%2Fc5H8AHpsyNn0PQkHnyAn2Nez5m%2FPMOix5cBRBr%2F0oBPUZhO7l7v7IUY9EojvpkUkyillGo7LMo6o57rX3XPn%2BKkvpL4PUpRVtVVui6BMQEVveWI39tJdwyawNwbTSvXNbKdWEUTNIUCL47ROKd%2BW7iLbriv8S8lf54hNR0oBdPu4yqy7voWtihrQ0r7SSGmpJbQAJUHenViRDlpdHp9hKlj7b46eC%2FEk2mrFJMFVMVdEnHJGLGAsNBn1QK6JLPdd7GQZgMtf8xe431uZKXusHDG3BMDt6Ce7HWBTVU7DJbzJqpkHE9G2FLuiwDeAbD%2FXtuNPnbrNBPBsboCOLZDMgF2t4ekFaoPThizdVb%2BJ18uRD4IOoBGMKKpis8GOqUBubB65Nnb0bDI5FmuOFeQqNku0cSfxZ7wcwRBwbRO8yOw1Hro33s592TKZJKLLjnQVnJvxMmBal1MiZDlgcd6iMSkZRrcHah9TRz7slPu10BbJ4UNqDvGVcc37n2kVI8wA8lrV4QNTXJik4onuY0sbj%2B4tnES61Cq2jFKJ2xUi8qgLb%2FubZiRLTOVBG4e09YxfvDKAMTI4NAlnMuSk39McbjwiE4%2B&X-Amz-Signature=123176aee986c5123387d5aaf8503e034fdbe9121a87bf19746e02dc38d4a4c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

