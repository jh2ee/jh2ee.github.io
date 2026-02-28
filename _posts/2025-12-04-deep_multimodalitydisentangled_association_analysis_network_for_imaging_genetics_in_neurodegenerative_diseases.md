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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4RSXB6Z%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrv8UcyD%2BkMqJy1DxIsxVKQ%2FMLr8%2FG5U275IBOa49sWgIgB1eNwuhl%2BzuC%2FtfniOWHtjQ6aYqOvta%2Bar95GxuZYeAq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDOP5dCASPdkFhh8YnyrcAwMvQW75RgNeQqAk%2FAEeQkAhOcc8wiRhpPxgpzjNXasQtUGMK5%2Fpx6Dh%2FWbcYGvQhMqXsc2e9NhP4EWmaJ%2BjnrnPtON2HynpzTQJ%2FPqVhqVo9%2BS2kcEfhc0hzJTIp6kho8OCfku3ZrtVZFoYLqPxF10iiCtbOJ%2BJcFQtdm3%2BJkvlbeJR98HveuP3TxW866S581I8wMX7UgVTnhN3BdDYTMfsH7WZ7FE4t60DfvIu2362%2B7YHC%2FtAivgYBqPTRB5ni1BmiBYLi7LQnJ5os0wKErlVFzHQQlWyRWzUy9UDbCVvjjB3kcDyqHox%2BzxUiZI2R4SZreZZyIpybMS%2B4MxBDdRNfz7MSbWE3f7gZpSyRy6YvKLbA3zTLWER7h77rlg6%2FwGPw%2FFyxQ7mCGHjTfXbxeyuJguEY6BhY6Kh9dAY8mdHroYWdwqK6vgyEPJINTsyi87Gz6FN9Y%2B6cDW%2BUmwKraLdlJBqzQ%2BM4EHIN1HiIbyQIhFw0wjvWcmFZjmf2zdRHoftnAxE3isUk%2BKIG1uTF0au%2Fajn9KZ3ssHACc4X17WIy4ZKbMTnmgS826bai1I1fNFbkBVbytaviezclZbKQmuitYTE8R96LKlQCYthtKor5IAlfE0hVnvG5ZqKMOPijM0GOqUBkU1xFDvfacYumVIfTxvdrgXIg5cObhUyBFwguwzPKri%2FR%2Bp2AFAH9QZAXZRCl6SQw%2BQ%2B1prEasDXuaaxM63KNHfTdLvMis0uPl5DSVV9f5U8jNHkFlvPlm3WAvw9bpGzZDAAADttVDmvNkhCE2%2BoM0gI5HcpVNFppE5rY3H9iZCt6sb0rsCVq%2F5C09ORRIlxO0z6SlXV24m3BWrUnouIji%2B0WUgV&X-Amz-Signature=41b2d159def6755f7034ec41d1c2755c2200d3d893df28adb8b0f17a7d2cee42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4RSXB6Z%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrv8UcyD%2BkMqJy1DxIsxVKQ%2FMLr8%2FG5U275IBOa49sWgIgB1eNwuhl%2BzuC%2FtfniOWHtjQ6aYqOvta%2Bar95GxuZYeAq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDOP5dCASPdkFhh8YnyrcAwMvQW75RgNeQqAk%2FAEeQkAhOcc8wiRhpPxgpzjNXasQtUGMK5%2Fpx6Dh%2FWbcYGvQhMqXsc2e9NhP4EWmaJ%2BjnrnPtON2HynpzTQJ%2FPqVhqVo9%2BS2kcEfhc0hzJTIp6kho8OCfku3ZrtVZFoYLqPxF10iiCtbOJ%2BJcFQtdm3%2BJkvlbeJR98HveuP3TxW866S581I8wMX7UgVTnhN3BdDYTMfsH7WZ7FE4t60DfvIu2362%2B7YHC%2FtAivgYBqPTRB5ni1BmiBYLi7LQnJ5os0wKErlVFzHQQlWyRWzUy9UDbCVvjjB3kcDyqHox%2BzxUiZI2R4SZreZZyIpybMS%2B4MxBDdRNfz7MSbWE3f7gZpSyRy6YvKLbA3zTLWER7h77rlg6%2FwGPw%2FFyxQ7mCGHjTfXbxeyuJguEY6BhY6Kh9dAY8mdHroYWdwqK6vgyEPJINTsyi87Gz6FN9Y%2B6cDW%2BUmwKraLdlJBqzQ%2BM4EHIN1HiIbyQIhFw0wjvWcmFZjmf2zdRHoftnAxE3isUk%2BKIG1uTF0au%2Fajn9KZ3ssHACc4X17WIy4ZKbMTnmgS826bai1I1fNFbkBVbytaviezclZbKQmuitYTE8R96LKlQCYthtKor5IAlfE0hVnvG5ZqKMOPijM0GOqUBkU1xFDvfacYumVIfTxvdrgXIg5cObhUyBFwguwzPKri%2FR%2Bp2AFAH9QZAXZRCl6SQw%2BQ%2B1prEasDXuaaxM63KNHfTdLvMis0uPl5DSVV9f5U8jNHkFlvPlm3WAvw9bpGzZDAAADttVDmvNkhCE2%2BoM0gI5HcpVNFppE5rY3H9iZCt6sb0rsCVq%2F5C09ORRIlxO0z6SlXV24m3BWrUnouIji%2B0WUgV&X-Amz-Signature=41b2d159def6755f7034ec41d1c2755c2200d3d893df28adb8b0f17a7d2cee42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OPFM4ZM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDxamek3tIsutqT6lReeqh9E8bpkchptFU38zx7ch8ymAiBFK7Zmz%2FDOelHenC19sf1WMkqFtvcokHwnDrWiPfJw8yr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIM6TQvbs94Wa9BtA9xKtwDabE0FiBrCAn2KjjCgP3nIpbAtVcCuRmJtUDQIvVlrzUcvn577Rtnt5TpVrcVgK6Qheduwm81MQBzVBhtWINAWA7LG5NS%2FhRvZ7lE6G6mnSKCKtF79eRAk6Uwe1KBazRYuJaXmBuDKM694HyuWQMvstsS3OIOxqrBcsGVs97odjEE8HQtcNiabNp0wOLrhaH0mhCHJL%2B7lRULzjid5KlfU5JcoaEWX8UAaq3xaYeA2fYD4wlp4nRHO99St8HCdO5ZqRfI%2BEy%2FPt%2FIlznuoP937S6XGQNt24pGp5kQyvwo5%2B9IjUGXP2heQf%2FsvcYOipLdMLhahq6nLnFcWTCL0xAgzGl%2BV%2FTKQANoAbXHMb%2Bbm4SBZ%2FrDvFZkk40Oew3Yru5pzF52xnziT%2BVEb2odkXMNYvt1SZq2srcWYSU2i%2BYJ2%2BY2oL5NXXFxqYf8wsM71PzKi5CvkptC2Mz%2F64jca9XiPUbQJs8dqD7HCNJEP30AHBz0AiL6uyhtZlRNdF0vkeKH0DUYZV1UClOZAAMHTxjTn1RAVxBm7Y3LOa4LaMuu%2FgRe5ze6MFYQw8wdIAaR9g4xZzWVYOznu4d4gUhLfLkDxzthGkf2Db0wdfeayVJXJP%2FRMjNRwT2tsYg4H0ww7uKMzQY6pgG8qt6jO7e4MdhOKd8TtRCJYipZ8Ha6qT3AjPK81sVPn6MnEEQBcq2gaRardFZOPYIxz3AhIWTzQGAWHMJkNe1Qp7e%2BEFDohTwD0ZBsq0hHtOJVJn%2BNBOVLQ6wLQjORsCyRBC8IyqdyKRrlAnEPR1vaxVhtFGQXnex2kd56oOPRyMx2XWWMguf4zCtduYguzrFn8RSAlkE2yGbFsXRsnqLNufldmmrw&X-Amz-Signature=e39d88321ed94da2beb67b968f31bcadaf22b0a0339ad334ae0228f8d6504803&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ENDIVCM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8m7ww82okTXLAtQKvbTNeEryKpzOpATGh5pZm48Dg6AIgDdetY8qtk3g3QhlRje2xwFweKX6As3AT5NkVCoUMvWcq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDIEHsm1JxgVP6O6%2BSSrcA53LLbDiEHh5SwseGIbftWGPUksihhiVjUWw3qkQ3r%2Be4qFOx6LLUK8ViG9U8mngSUUMwAU3MOZkLliQLAqMYKlpoYClSJ7AngVBtILpC%2B%2FoajWlGgfHeQWX6vghJqm8TPFHS6pzHSUsJIIqcgaJFafEyFzwnwS69o7yYRhXpL4DC9cUvAa5dhkB%2BdYhqS1wdkYCAMDMWDpS3BVEKG547s5eyGqA6NsCqVskoMte7Owa79yNN%2B6dsg3NdLBa0cGDes5YSdGRt6%2FtAAwmwZK%2Fx9uiTrkvAvDrXHTDbq4FuBh2lS8XNtjLvPNKxnbhLZLcVI0aSRfmfhvM1vvuHqFkdntJcmc2ytoCSoTWgeOcHLYJ8PClb%2BxlfJDPykK9kOaMWGm0fxw7B9aEGctNRZzGXEsAYoM6sgJTMfiimEBniDAVHgWLX2xRgW3DTMnzPuUi02DWb2wabMng1LiAoFJvQKo0jJPYtNlc386HOgGuwUr%2BQaRe02jN%2FEW%2BV1c9Kgjn6QJg0VmWOvs848ZAyUSkOr42OP9wmy7Op7i1kjqZB4K8VbxeVY3kynnLlTrshgOJQZ9YRF%2Fhbbdv1Yi4GWCVYIf7GMYKIyyeg%2Bgz7r%2F0yUUT8a2NhmUBy6j53bUGMLnjjM0GOqUBhqqs8fBjm3e7ZEqNmErA0zPw5AjmmYAT2NJD3aq1%2FW6bGyrcqxBgsmoJliZGpgLyCadgJVtiSQfOrSn%2B79ZE%2FYxuuq%2F4DSz4sE9EMC0auBeUpKbAtE38HmA0pcKKSV3ln9kWy0Mc%2BdHQjJtrECDj0eMJQZeU%2FDgOklCAAg6rsmDziYdt%2BDIy1bIG1h0RWd05QOB6D8BwiDfqL2WGQ4p6Ca%2BHmjZa&X-Amz-Signature=4279700cd2128f0c0490cf3730b9e0a12b1cad203f83f80cdea92f667101414f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ENDIVCM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8m7ww82okTXLAtQKvbTNeEryKpzOpATGh5pZm48Dg6AIgDdetY8qtk3g3QhlRje2xwFweKX6As3AT5NkVCoUMvWcq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDIEHsm1JxgVP6O6%2BSSrcA53LLbDiEHh5SwseGIbftWGPUksihhiVjUWw3qkQ3r%2Be4qFOx6LLUK8ViG9U8mngSUUMwAU3MOZkLliQLAqMYKlpoYClSJ7AngVBtILpC%2B%2FoajWlGgfHeQWX6vghJqm8TPFHS6pzHSUsJIIqcgaJFafEyFzwnwS69o7yYRhXpL4DC9cUvAa5dhkB%2BdYhqS1wdkYCAMDMWDpS3BVEKG547s5eyGqA6NsCqVskoMte7Owa79yNN%2B6dsg3NdLBa0cGDes5YSdGRt6%2FtAAwmwZK%2Fx9uiTrkvAvDrXHTDbq4FuBh2lS8XNtjLvPNKxnbhLZLcVI0aSRfmfhvM1vvuHqFkdntJcmc2ytoCSoTWgeOcHLYJ8PClb%2BxlfJDPykK9kOaMWGm0fxw7B9aEGctNRZzGXEsAYoM6sgJTMfiimEBniDAVHgWLX2xRgW3DTMnzPuUi02DWb2wabMng1LiAoFJvQKo0jJPYtNlc386HOgGuwUr%2BQaRe02jN%2FEW%2BV1c9Kgjn6QJg0VmWOvs848ZAyUSkOr42OP9wmy7Op7i1kjqZB4K8VbxeVY3kynnLlTrshgOJQZ9YRF%2Fhbbdv1Yi4GWCVYIf7GMYKIyyeg%2Bgz7r%2F0yUUT8a2NhmUBy6j53bUGMLnjjM0GOqUBhqqs8fBjm3e7ZEqNmErA0zPw5AjmmYAT2NJD3aq1%2FW6bGyrcqxBgsmoJliZGpgLyCadgJVtiSQfOrSn%2B79ZE%2FYxuuq%2F4DSz4sE9EMC0auBeUpKbAtE38HmA0pcKKSV3ln9kWy0Mc%2BdHQjJtrECDj0eMJQZeU%2FDgOklCAAg6rsmDziYdt%2BDIy1bIG1h0RWd05QOB6D8BwiDfqL2WGQ4p6Ca%2BHmjZa&X-Amz-Signature=5cdb91a4580acd9a6769eb26614e26a95f26e9c5c1e8e3524068689986a16cc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUNQBPTE%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHTJtRa8UrXFLeYZuR9nnGZnaxvUkcfEcvYejwSfV8yiAiEAlq1C4CGrhkcWzZLdGwXgwvn7xbBQBUfvCBJu7sjqT00q%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDK4g0c8FEvnh3AiK%2ByrcAzLTXdPI3hmr6FrQ93vVhtL4nufTbON8j2um3ZiATHjFwY7RKAhoevfiSP25kkkbFdGIAOSbHkfueGE8UWp8xpkK3QouENsKAXzyNpA2qOs%2Bbr5CMmLsLt%2FXbELBPr6Ws8EBkAcSE4EkMln6p6XuLAfOMvxDhvED8FIoZnir4wrw3EVZTJGkkFap%2Fhy7d1Mk6rjs2S6b3uP3wx25Rn3dyQMwQD9X71zvNAhTirzxDAqLha4LXs1RFSFeyuktz4fxH0liwFzlQyAS6reA73Yjn3TlZguJL74rIqO3dMgyCVUCpUx4rlQBzdfdN0QTSADHF1%2B7NfZI56O23%2BFKuVH6XDt0ju9qTmmU8qy38%2FXyBUVBjvFqgwixr4BFI5y4TklIeVZZpKGgjgSYC67KSr7XD2vXzJNF7S%2BzgXjwje%2B48xaqDEKuLVETnm1J5PWlb8RK4CTnH3P5FI7ZkFVm84CfJ5neHxTN4cj4dhXXh7st6mgfH8OUPxGc6BdRIZk6Ti31hbjhvdIdrI9AmLV3%2FmGF5C5GPfxycQ1z48Cnoyw4JO0E71niyoHj7f4dmHE3Kg7BlzIVd6DJ1eTHHJ%2FaZT1%2BT3hPF4%2FUYxjYVQZrPT023NIauNI6aGSOXFxWqkdPMK%2FjjM0GOqUBu4I65Rbd6AjD%2Bhwle%2FQlExHeVRkku33B52%2FGTVGkoxJN2QSTOBpWNAfrfvbnBH%2FppZmGh7OJyKtXG3MhPODKqk9XL7M9%2FILHl5tuOUtYyDNKqXv4O62D3MTDBqjNkin%2F%2FVqqTKkyPBF9zIsnhTKlm%2FDVkVEkTJwwiStVODL%2Bf7R5hduq8nqor%2BBO0iXZJCD2lzB14nSaqH9kwc2HetrmYuIOJdC4&X-Amz-Signature=9d0f36d488cdc72ed92422d207e8aef37cffa598b4b278e3819dfbf34c3b9781&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XO3IFNRD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFqvH4RWtM%2FxeO%2BVmUFqz6KfT9MK59uEzedb%2BFCNYiugIhAMusPe6UoLa8XV1EDecxmdwkb0bS9JZXBur0K3DEn7hpKv8DCFsQABoMNjM3NDIzMTgzODA1IgwVvSYGrLlrIZvJpAUq3AM2ZQUFAqmglSSG5nx%2ByCKGAKi0i47PWcT3shXiZL9zZ%2F6zSMhQ4yH49dgj4hZpd3WSs9ScTj6%2BxuDFFzJ33uz6yjvsYuBWSo7DZ5tA1yjhVK2o9zVl1Av7TNtvbXuT0k16TScDnBjJScYyMJ0Lotxdx8uxFdzEpbKocXOb30ed3qRP0Rd4SMO9torYCOReja%2BnfWanYqn4DSBiQ66Ad6qmEHalLD6IslxmumjzJ770BvDyf3tR7PWJnb0FoV5JMX008eQ6hUU97Tym87zm0EI5EdWrlPmi3uRn53pm4YJQi6FJEjWKRNVraL8VSSebU0OondXE2P9wHIArkXsC5vLOQghMFDv10SvWAUdbaJphfae6%2FVxyFQ%2F0EyeBmIEInB9nL3ZzGc2ahOdqNBvcMNkknhjBkYQIFB0buLH5Z1X3e%2FzG%2Bn4u5o2ld%2FBSWwLZAtDmmFhZt%2BS9OwgvRGoe4PclMPZQQBTS6EPk%2Bdaby2kVcEq%2BA2L%2FVDo1bsYt15V8VUhE9HzrIYHzpWR7UbuH4UDYlN6kPN%2BwLS3kAV22k9muhzqwfVU%2FawXSvFbzcjkBqm0yFS2M%2Bs%2BMRBtg8n%2BVMpXhc2BaGLcxmqTU597ER9iJSyLJj%2FAcZP5LpsaJJTCw44zNBjqkAUDhn0C5hnp%2BIg7%2BgKX7QFK3W20C9kBTWlNUyki21EMqPOO5IuORxSmiy341DpAJIkAsHdXB6col4j0KBi2UYcVV0Bdh5zI3UQQ4HFYMHs5g8ntnjGovT2s%2Fu2OEw3o4qETDTVMrbL0AKEA2Sth3B7xJGDG37TgCBFvIqrwuD6hISQkHFSheRMh3Jnig7%2FgT9Kvc%2BSRIANhEhjp6DpkBR%2F%2B8y1fV&X-Amz-Signature=20d183ad8506a12d82fb561ddcdb835a0c67815ed49bed67bf93e469458e70f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXTOKD32%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGJShlTkgkftey95XLx5Q65JsIxc4FVaauh%2Bnlmi6OGgIhAKPkCEDKTdbH%2FeYd573GWA%2FRGP3ujdbV9CG37cw1oHqaKv8DCFsQABoMNjM3NDIzMTgzODA1IgxSOCSmG%2F37IChXKnIq3ANBTodd38sIarsCd3dOZILp3H%2BunlKNcKauSastBrFx0fi3Syfuvc2mtu%2FguIx%2BfkcyLvUYztO1evG%2F0MakG5GKsNBfq4YcJC2pY4mKCwjDwOfyfIH3KEuCyFI%2BmVGvwM9jL6SF%2B4uT2cfAPjfPKHdqgnB1IVmLTTxl6h%2FVBm4rGsv5owAMa7y%2BX0Uw2NqRkhHvUEC28yoyP9Ks6Uf%2BJ72AmzMtl2lzxAdWayjLcVrULaJZ2s9uT3AgRCV0Kr0Adv7mavr9M3uXJBzl1TZFlgcasp98ZLqrDExF1y8DB%2BF4stjVfqA9cCANdDcnVp%2BZhmpy8Ib4n6nRXUG%2Fd0whiStaV%2BQN%2FgpOL2OeOolxCKiqQqMoWmwVZiAJ1f78wR0NojVk2%2BB7X3xpVllv11CZzI1f6c2HCTdGsUhv0ZCorvTt475BjJxF56dx%2BsqFWvVruvP9gtf%2FYHD43pTbDF4OQpHc6pfD5Bty%2B9y5qHM2HzYHTBde0GDxfUPNh0DNwfqhBs1HmGRQA3z7yEcuaQX%2B3Y4EJRBM8yRtkNgF7eJBtxYt21Iqs5uZ3QchVQCouWjceNp7Uja30k%2FpdrO75tz%2FVCB9kZLzQqfsjvuNc%2BSdWinJBruTlzunRLo6J3B8JzDJ44zNBjqkAeu5jiQ4zsMYU2JQ1Z8z6BozikgAGXbDTDPtcW6F8f1qwY1IMI8NnRxInSWp%2FefAWM75nGi4RwKb6mjm2uHbN3ot3UF3UzCVMSyMPUbuFdxJUX9LAAgVjBtU2F2cLlhAof4CwlEPprf9RrVupPSS3QKPTKNqpVCZ89FJxnJVbTsR4CzLlC5aNwyzq2jdjRk%2BuCpekh8RAM73S8EADJMyjFEg7bTQ&X-Amz-Signature=e446759f8af5d085dc9d52c7108464e2949ec022b115b1571c4aef745cca2c90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZYXWW2X%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICXSaOgCwLbRfgIq%2BW%2FLULt0I68J3SL%2FbYD4HrHB6I44AiB5VFMlhOZXKCMlTiQCsy6Mlw3fcWwGXJAL%2F1It1Led%2Fir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMGb06i91dMlL93b4zKtwDD7JAjHYDTLHKXTEOFbuOWnfApG3RWyylAUaheUhGm1ccKRx8Bc1ksf%2F049R08AAA2oH8QUVM%2FrsvTD2BRjVCej789l0SQgsq5csXkqZyNeXLbmUuPNUTHODt4e%2FsOfo3wfUiKoPWmrXaH6QT9xl44GIPkdQA%2BuB1KHdEgvja1jDy4CyYJuXmD6kHo75YXA7Waegn0HukdLELka6CJmvZFhUBaUAEz2aHrAdMwNrFwLUllSRgodzqwSx4lP%2B99yqHxi%2FKvM6ysI%2BmOvTo2iDlkfGQYfDuR3awgJhmdcNT%2BoNuhCqfTIaFET3WUXROg555lroEXjli3cSPXFgx%2FaDmuxG7kjhl%2FQCPBiwz3ei5WUbmhF7H23K2vIFPKAUV8Bnbsr5h9CB97Sq7p5TH6yi4jL4leHumzST0Zecf4gVRTgud9luUDGkVQs0RTzNl%2FBNmQ6sWoxgEuYIpDWoJcEP5tiD2gDv65EyMiMTI5PdUzeVHbEXn%2BdF94V9JE%2FFBK4sXQaI7%2FoBzvKKwBoqsQ3zHB4e%2FKO2lza%2FRkVJ1RpIZfRHGwq9hdlhSpv%2FQ%2BG0rqpHmsBiLFogn81yL4lcBws5CMkkaXVOn2rQm7JSrzifFcXlV5oMgMegpRE3UELww9uKMzQY6pgHfnDzgf1Jqh%2F8kD8zfH7Oymo%2BtGk3K%2FgYkPkUjkkU%2FXJZBU30ORca6MILYiJV2VNkV6EmfhKw%2B8yvwhMZ1WWHdHgk9sgsm22XcbCU1%2BxwOWdHtd%2FKeraxrc1XWvH%2FynXmN8NeFfu6k4h%2FJpyWMj8jUzGfY3ziO40wSoQ6Hu4D970AfNX5EbbLwRo68DGXSmJnw1pXQrPwnRmr8CO4VdWN1U6F30hTQ&X-Amz-Signature=c7af9e61e105dbf54d8ebd8c32a394c1c35fb1371514cb591153d767f5e5bf34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZYXWW2X%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICXSaOgCwLbRfgIq%2BW%2FLULt0I68J3SL%2FbYD4HrHB6I44AiB5VFMlhOZXKCMlTiQCsy6Mlw3fcWwGXJAL%2F1It1Led%2Fir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMGb06i91dMlL93b4zKtwDD7JAjHYDTLHKXTEOFbuOWnfApG3RWyylAUaheUhGm1ccKRx8Bc1ksf%2F049R08AAA2oH8QUVM%2FrsvTD2BRjVCej789l0SQgsq5csXkqZyNeXLbmUuPNUTHODt4e%2FsOfo3wfUiKoPWmrXaH6QT9xl44GIPkdQA%2BuB1KHdEgvja1jDy4CyYJuXmD6kHo75YXA7Waegn0HukdLELka6CJmvZFhUBaUAEz2aHrAdMwNrFwLUllSRgodzqwSx4lP%2B99yqHxi%2FKvM6ysI%2BmOvTo2iDlkfGQYfDuR3awgJhmdcNT%2BoNuhCqfTIaFET3WUXROg555lroEXjli3cSPXFgx%2FaDmuxG7kjhl%2FQCPBiwz3ei5WUbmhF7H23K2vIFPKAUV8Bnbsr5h9CB97Sq7p5TH6yi4jL4leHumzST0Zecf4gVRTgud9luUDGkVQs0RTzNl%2FBNmQ6sWoxgEuYIpDWoJcEP5tiD2gDv65EyMiMTI5PdUzeVHbEXn%2BdF94V9JE%2FFBK4sXQaI7%2FoBzvKKwBoqsQ3zHB4e%2FKO2lza%2FRkVJ1RpIZfRHGwq9hdlhSpv%2FQ%2BG0rqpHmsBiLFogn81yL4lcBws5CMkkaXVOn2rQm7JSrzifFcXlV5oMgMegpRE3UELww9uKMzQY6pgHfnDzgf1Jqh%2F8kD8zfH7Oymo%2BtGk3K%2FgYkPkUjkkU%2FXJZBU30ORca6MILYiJV2VNkV6EmfhKw%2B8yvwhMZ1WWHdHgk9sgsm22XcbCU1%2BxwOWdHtd%2FKeraxrc1XWvH%2FynXmN8NeFfu6k4h%2FJpyWMj8jUzGfY3ziO40wSoQ6Hu4D970AfNX5EbbLwRo68DGXSmJnw1pXQrPwnRmr8CO4VdWN1U6F30hTQ&X-Amz-Signature=bfaca93d246c5896feaca312b125d5af157e19906ef22394ef2db70a6651e8e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUYPG4BZ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BQGN%2FLkjscD7wjIRmfhmjIzYqYYaIyOsPxTeOZfguxQIhAIeCHQZo1BAJ%2F%2F1vQE6MeyPBsuoVrdbsKZfZuwheK1b7Kv8DCFsQABoMNjM3NDIzMTgzODA1IgzIWy4eFQgfJT3kP8wq3AMb6jKVY3Q8GSdC4Ca3v33PxuDUp99JB1IBoqgu2pmquvR%2BnE%2FdAso%2BnmymvwqnWWvLA%2B0H3L9v4LBUzEgbq3MTXDv4vUVrEwFq1udue6en47%2BhzFdOIu3EW8jDmG7ygNdk1OqdsacXfIP9IDzc3L1GTDK45862PjNI4PjTChc%2F%2Fdsn1ZE77kYeO%2B6RyU1bpgKJBg0bCUz5KaGQaEESMw3%2Bet8zAjYi1pJdgoZdny83T7ryz%2FWlnHzTEe%2BLJ2SCBk0F322tsXYXewJ5xVBf%2BR29a2EmP8qazFHhaohaRPFVuyT1onIwRWsaROCdYK7E16uQ0P2WJQlgxcxsJoTXHQn1vdXJ%2F3Vt7oobgqCEt0Q8sICsmsYj%2FpP1eaJOuMrermrt1X3DSXitkIukU3Iy1TkyOL0jleF%2Bg2nFsxS%2B0eXBxoFo6PcbWa4u43rpAcJr5VEkdA7e4jIzCnU2m5qVsHPz911prQz7pd2uMritTeo8EFQU1QDYIR0%2BQDjKC1xCuco3g4YT%2FgpzHCYHUiZhBfS1GmoTXvR%2BjxFEPUA5CnKaKxeHI80V4hSVPB%2Fm35fH11JzHKkACfgVVmiJrGy5mNG3O79FAfnSNaYmZV0eCDUSK3%2B8nTWmlS70nGRtvzD14ozNBjqkAQ34yH7dnO3DfEixQ3wTLPqAwpip%2FzGP8brd9X83T12YMGgcV%2F9Nxw4foUi2jN%2FINgSl6vtp8w7e8FCVudE6BKiVy%2BRBUXbhMduCaaRyIUtnZYq9P70%2FkTJqr%2Bz09i8xdjBSIqc3srKtixQYdnC%2FRkjGgGSuVYtIEYQcqdFRTDcvbWq0iqtcD5krP%2FIQMGettH7vO%2F5swTd8n1QelaCTPYQy5F6T&X-Amz-Signature=15ab13b8fd1f301311c8cb9ec137b0d1a9aee7effcf01977c1adfa1d17990179&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHSFX2F%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVbvlCyVN%2F%2BQ6S8WRQbYPhxQ4v4OSsn8Tqepe6AZJvhgIgL0KW3xydDg9XFCCG6PQoZ1Vo2qA%2F%2Fi9u9PgkBvJXOSkq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDDQGIVGgY0aUUAvMaSrcA1ZpFhz1GP1qu9JeNZ47W8cOmzPzIdNpxXP%2F%2FOfC7onVwHosaMYhXRXpQDLe13iCSdxRqfjfX%2FENvMuZqglDR9Lp4DJ%2FA5hoWiCZScRjjBPfSBpM1ugdOJHSuVf1UGsFXEVkowRO7w2q8PHlBCRr0Y661DiB4Kl3oO7eYQx0BNVueFqV%2F8m%2B0N2UD%2FFrUg6uXIPOEMO0lO7aL3JyIaFDlrveANcAj57DY%2FNc4IEuNPkV84TJ4%2FXy0bfQpYTi6LGoXPtEVytNjyTNm7UqLg9x5of8WrPdu%2FBQEQSK1XO4%2FZ6CbSnlWDqJ9a3cXhvONjaE%2FjAbxcRlimR1atJJqtwW%2FXCjE1AHywoDO0OiPIeragw5VSs2diuNj%2B8X4x4wKRGi%2B%2FwXQ27WFD45poYpWW80yz9WPaF2VOeFdfePqBrXwHKHjhqmo0B5oSc3lxiZ9GD3Xos6ozWCoh8IYcH1d%2Fyf5BvowauPHfDvSpHlaAHxRnzPwZfwvGxWbHHCwpUiEj9BpltDEDF3MpjWst00s3IvJR1s3LiUtW4s%2Fk0a6Nxb4d8iYUuppcfVl4kcGYlz9z%2BRKQ%2Fw6cv36At2wrSpwWjW4dtlsYv8%2By2MSFaKSUJHh9pD2aX5VvWeKBVTEiywML%2FjjM0GOqUB0u8rqWWwJO8jCEb8pSvQnVMiHWQWCuenjmM7nONJqm7HBiLU2IWD1oGMc8de8qXlib68UDZxC5SHcv9t9ZpJSeMaVsF3I%2BwSA3o9IT%2FsD76CMVsOEl19rzWoG3DrQejZZbf%2BNCDj5ITJiBDX6cRfjnqGSgaAKafDZdQ5W7yi3PTdvvocB1AqIJ%2BQJbIWC6woLghyPQslcKZRu1nFI9dylT7Ze3zB&X-Amz-Signature=4e5511b43b73a5168907d6a8ae69f6f68b65caac57c8d2378d69e45e0cfa1f6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHSFX2F%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVbvlCyVN%2F%2BQ6S8WRQbYPhxQ4v4OSsn8Tqepe6AZJvhgIgL0KW3xydDg9XFCCG6PQoZ1Vo2qA%2F%2Fi9u9PgkBvJXOSkq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDDQGIVGgY0aUUAvMaSrcA1ZpFhz1GP1qu9JeNZ47W8cOmzPzIdNpxXP%2F%2FOfC7onVwHosaMYhXRXpQDLe13iCSdxRqfjfX%2FENvMuZqglDR9Lp4DJ%2FA5hoWiCZScRjjBPfSBpM1ugdOJHSuVf1UGsFXEVkowRO7w2q8PHlBCRr0Y661DiB4Kl3oO7eYQx0BNVueFqV%2F8m%2B0N2UD%2FFrUg6uXIPOEMO0lO7aL3JyIaFDlrveANcAj57DY%2FNc4IEuNPkV84TJ4%2FXy0bfQpYTi6LGoXPtEVytNjyTNm7UqLg9x5of8WrPdu%2FBQEQSK1XO4%2FZ6CbSnlWDqJ9a3cXhvONjaE%2FjAbxcRlimR1atJJqtwW%2FXCjE1AHywoDO0OiPIeragw5VSs2diuNj%2B8X4x4wKRGi%2B%2FwXQ27WFD45poYpWW80yz9WPaF2VOeFdfePqBrXwHKHjhqmo0B5oSc3lxiZ9GD3Xos6ozWCoh8IYcH1d%2Fyf5BvowauPHfDvSpHlaAHxRnzPwZfwvGxWbHHCwpUiEj9BpltDEDF3MpjWst00s3IvJR1s3LiUtW4s%2Fk0a6Nxb4d8iYUuppcfVl4kcGYlz9z%2BRKQ%2Fw6cv36At2wrSpwWjW4dtlsYv8%2By2MSFaKSUJHh9pD2aX5VvWeKBVTEiywML%2FjjM0GOqUB0u8rqWWwJO8jCEb8pSvQnVMiHWQWCuenjmM7nONJqm7HBiLU2IWD1oGMc8de8qXlib68UDZxC5SHcv9t9ZpJSeMaVsF3I%2BwSA3o9IT%2FsD76CMVsOEl19rzWoG3DrQejZZbf%2BNCDj5ITJiBDX6cRfjnqGSgaAKafDZdQ5W7yi3PTdvvocB1AqIJ%2BQJbIWC6woLghyPQslcKZRu1nFI9dylT7Ze3zB&X-Amz-Signature=4e5511b43b73a5168907d6a8ae69f6f68b65caac57c8d2378d69e45e0cfa1f6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6QQFECS%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T191138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDk3E3zDaBXOmVwhx3gwI7LRfHfTLJF1ppiKUNN6qHNWAIhAN6doOnIvhqgf32xiNJHYJ4xmH2qVwPXzNtenlqxQ8SYKv8DCFsQABoMNjM3NDIzMTgzODA1Igz6TCqAAGIIU9cOC9Uq3ANRFhcpZIbHNmJ67FJF%2FNddFzcs8fOBYYBLJ%2BDCccSBL47KSIfudZGxlkSh4dp2I87FklGsji4CLnwjCZuIRpZ5fueASYayPnK4OtqHr92OfYA663r5S0FLlco9zT7Lumcq8l2DJEEx%2BfvXmxURkq1g1YzbFq2grCur%2FROm0n9j2AMO5lXa5A6VyOtWnOU%2Brl1unTTDx5cBV%2F7dLHzPq25muhyVjYEY3UtrQXbGmEz%2BpU3LewIeqEzDOJTmHgHlgAowPMIK2F4WR40AVOZtDraCvyO2eiaTjx%2BhCYwU6Xlm4nZzf6FgcrQWKY5qCcRw5RZUL%2BmtmCcPrF2RQNQZOYGDbBc5PafXhGhI4MDqfswlRZWNUQR%2BM2l2N0tIUpTJiWP7Kz6OLjK%2BO1Zv0KNznzIVxrxSfd6rDRG80dAE7gLpoHArUghFX2pU3nm4tzZAKpG8BxlnoVW6M2%2BWjv%2BKeQbW%2Fe%2B31tXAL9k5D6%2BuAfp6WXZIR9RteA2rGW%2FyQc7H3d94RdUzcoHY7C45bLBPXMQ%2BnyAI172C3Fpokb1QD%2BqFzBsbEB9t%2BqdxKr21sMgSNWgtY2S2gnWtZVjK8BkjIfJkcaaIfp7tiLklggFnBKHlIdwM59PE3ZhXTToMHDCx44zNBjqkAWbmd%2FvC3Nm7kspnuuK6ZQWSi1chfx0Q5LpUrZvYcbYM8r9QOcJll0gq8tTf02VpM63kJhVXoGnFjyuouGOh%2BAVk%2FKwDHKpHM6M3SNiB%2FcMJycTBxOeGfjpBCiUahIm9XoafwfF%2B58LfpqJHVfNDZuWT7vUfogWN8lWzOZWQVMmvrxfaZ%2FQ1%2Fa%2BZQ8jc1KzDx2DB1wEKS22CfBWSa3%2Bn9y7J44C4&X-Amz-Signature=9d0bc3dd52deca851008f37e559407e12105d8a20c5cb100f74766a54a22f13e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

