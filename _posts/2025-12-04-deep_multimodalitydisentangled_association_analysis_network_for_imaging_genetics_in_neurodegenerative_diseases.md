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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6RAJ5IM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID5L%2F7PofrRhoW4FMrr%2FU6FXe%2FY%2BtJHLlYwxeUjxj2PQAiBxMXFo90YumaMv7HUziOjZ0CiUS%2BrQoun2Rujsbyp0ECqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMz3A%2BxWRLDle66EUeKtwDaOBHd7sI%2BgkUPYeryNoqAxScIZSPOJb%2F%2FNHbeQ8B08WRfBtGq49dgwpFrlqT0W5tpv0PZADnBljB5U8MTZerSQ%2F7vkKBbOUuk1lMlOUwOuTLynXY7dwb5LybwYlx9IUW9GALEB%2F12%2BN%2FAbx3jROQBFTXEonzktiRg5uT2sSkDUMSUxERZWXZWS%2B73JJkUHX3ubAaMO5Ixc2kyDB2ILK0lcWF%2BeqzhjwR5pQ06R%2BjTSKyxu0PX4xSJ%2B%2Bg7paXCZg2v4iXMBoEtjXX04FdPxoFxXiSvwfnOReGU7bHD996m8%2BHaBlJZfubnZe6gvkG55XOJprJgHBa8Xo1ieWX5muMcjN7F527ShJhJVJTy1lpUgXLYsYOVKBsnIpUoW8oDj50wPpYIl%2FdCJE3E%2FhHizG%2Bu2itNN1naWyS0kgTTVuZRA16%2F%2FHht5tG8UJhuKnPn4r0gY6QGcxMqk2uK%2ByzAFYzX96vmDx%2BXD5UxlrJVKQfu2lKUYZnQmJ9lQovleZn2CSkC9GbUs5bB5WQv0NEnYEsbsOMvCOMhHhlW%2B2KtMD4TdSQtRy1mCcr%2F%2BWWqO3FJnRQ6m1doH3Pl%2B0Djj6kJ6SuRyt6Dqm6VpINksmChGxf6127eHNe4R5bkzvqliMw9uyUzQY6pgE83kxAZ39XfrV1FbF5S3tDbPVkbVPaKzztY%2FdO2kBS7S8bgRDAsp566AknIl293NDFl%2BNMQXYuvp5h36lQx2Pxaz%2BZmFtF4wBiTFznllAJM2bDTdy1j91ggdHxdTcgbStex%2BNn%2Fd1AVnAxj1MrfaZmjs4ulmmTKGq1mi9L9s3qLTWMQtvpW9C%2FBhtH7Q1nYLfOEUdiT8bERNHIjcPThEUNakeyHLlc&X-Amz-Signature=28812228ea38c3402c058cd1e4cd9732346ea19ebd35b217e0bd99f49a5494f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6RAJ5IM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID5L%2F7PofrRhoW4FMrr%2FU6FXe%2FY%2BtJHLlYwxeUjxj2PQAiBxMXFo90YumaMv7HUziOjZ0CiUS%2BrQoun2Rujsbyp0ECqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMz3A%2BxWRLDle66EUeKtwDaOBHd7sI%2BgkUPYeryNoqAxScIZSPOJb%2F%2FNHbeQ8B08WRfBtGq49dgwpFrlqT0W5tpv0PZADnBljB5U8MTZerSQ%2F7vkKBbOUuk1lMlOUwOuTLynXY7dwb5LybwYlx9IUW9GALEB%2F12%2BN%2FAbx3jROQBFTXEonzktiRg5uT2sSkDUMSUxERZWXZWS%2B73JJkUHX3ubAaMO5Ixc2kyDB2ILK0lcWF%2BeqzhjwR5pQ06R%2BjTSKyxu0PX4xSJ%2B%2Bg7paXCZg2v4iXMBoEtjXX04FdPxoFxXiSvwfnOReGU7bHD996m8%2BHaBlJZfubnZe6gvkG55XOJprJgHBa8Xo1ieWX5muMcjN7F527ShJhJVJTy1lpUgXLYsYOVKBsnIpUoW8oDj50wPpYIl%2FdCJE3E%2FhHizG%2Bu2itNN1naWyS0kgTTVuZRA16%2F%2FHht5tG8UJhuKnPn4r0gY6QGcxMqk2uK%2ByzAFYzX96vmDx%2BXD5UxlrJVKQfu2lKUYZnQmJ9lQovleZn2CSkC9GbUs5bB5WQv0NEnYEsbsOMvCOMhHhlW%2B2KtMD4TdSQtRy1mCcr%2F%2BWWqO3FJnRQ6m1doH3Pl%2B0Djj6kJ6SuRyt6Dqm6VpINksmChGxf6127eHNe4R5bkzvqliMw9uyUzQY6pgE83kxAZ39XfrV1FbF5S3tDbPVkbVPaKzztY%2FdO2kBS7S8bgRDAsp566AknIl293NDFl%2BNMQXYuvp5h36lQx2Pxaz%2BZmFtF4wBiTFznllAJM2bDTdy1j91ggdHxdTcgbStex%2BNn%2Fd1AVnAxj1MrfaZmjs4ulmmTKGq1mi9L9s3qLTWMQtvpW9C%2FBhtH7Q1nYLfOEUdiT8bERNHIjcPThEUNakeyHLlc&X-Amz-Signature=28812228ea38c3402c058cd1e4cd9732346ea19ebd35b217e0bd99f49a5494f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIEPTUJ5%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHcC0cde9tiGMKXsJvxtluHwwwJi62qMVlSwZVzGk6p5AiAOcTn5gtdyHNPwJrDJCyoIMBY50Of5GEHWFqT3MHAQmyqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGsPJxBzcPIWt%2F3WfKtwD0y7%2BHMJAwRWsZObOqKwfJa%2BmSN3Vo%2BFsf0AaClRhLHY8r3Sgkb5gDWLOg%2BzbB05tPIZce9yBKE%2FFU80908mSVaU8V4yzqrJ7kAHhNXxeu4jx9o%2Be0T8kPqqm9QxKsIR9q%2BLc6pjzPXJ15zFpkSY3K%2Bo60Kv4zaOvnenCvI9maDItsdFAQqGoktmE3snu1dCPONhgGGk7AgrQZ1s2yHSF1ySKerh6b%2BIRc4lTyT%2BCESK3ChhEGUmzxhC9lTNoRc4RJkanRAn%2FCN0dSGQvPWdxy7UwF9gD9vxbiJEsxMMcHMrTVsqAt7L54m1%2B1WPYVFU3PJH%2FXsInWE7mHDta32ssq9HIViHY3gSYynyrv76zjp4uhWOiOh3Yg3ZhDJS%2BWsvEjCAS%2BohWWFjQsn5l6AVxcCILBdMw9e0pnJ1PBIHIVcksNcFCnSZ4TnmxRO99buWJs1GQAWoIDqzqbkTYIefd3eC1WVIM2r9X1eqWztOWdhJUMtWGPihQr9w%2FGuBrScyg%2BzVzhaiQ8mHjK6fWVnR3USoYTKAjVTrgz9TsgtY3QoRvTMWIYVUixZ5hhgBo23eWPLh7i8dYaH6gDUD%2FFpNkrBHUod1zfdXwrTEl9o1aHnJpEUxkckmcxhUM0EcwzOyUzQY6pgFrJGtPJhjJFKDpxT6%2B3xTj1begRjwFwHRjGcg3ueSqMtmesrUK%2FSt89%2BOn0i1xHoHnuFtdlXw0rEimUIzUJnNU01VBgcaxbBRxZVUFXIhjAPJZJJV0tlWBx6PnuHLGz55gB%2BxwItyOtYreXjJtp%2FGzZpSl5WjRTF499lE8DK%2FZcous0QxKVOd%2FuZtU4Ff5dMfVtNaQehK1igL12mhQ74EfGHHTjoe0&X-Amz-Signature=7a4123d758c77747d0fb278558c58bb1ff1e3706553b9114ebad9f6b50cd1886&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QPVZ5MI%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2FOGR3E4BqaWI%2FpfnjrrvZ48bFD48xgTjtGDOxxPe4mAiEAyrjWwZzcrExgGLwjrH5q4d5rBDX8qr79swyMtZBI9DUqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCAtqMdhNeK1F6a8OSrcA7QbxibxCcvW1p6r6YIdWzPQL6UoTg%2Fqyd8Y9gTni8SRMdCjvBb7QX%2B1vvDCBTKM2%2BgDyyk3T%2BZW7N%2BIQgI9Ds8zBH4AbzA8v2p2zpNK8Os9SvGB552%2BAoh7YUptuRw7zelnYL5tZ%2B9WCMLf1W%2FU6bcf%2BcC4b2lqDhVXppDxi91stBOSP%2BXhOXS4Dm7gWcH7R%2BTPOG1oVQm1%2BS3OryM9j%2BdtM0oURdp2Fry1nvXlVs7dD7AXqwhvck%2BeT4s8pppdYdKNMrS4NsMX%2BbebMA5veJYa5rAf3zVFzYXet88rEYWDI8Byn10dUrRccGomDi9iH5RNm63a0NFSUGT27O%2FSGYcc2SMlAOmYUa%2FuMKbE1D7IyFcqImFFVq43v9TVuvi304LAqT6AMZlfCNnnMOWffmjpzIRUryAdc3YPG95SrubTgr2yKTN%2FrleWX7grmecE%2FRfz1U6sznqSAqcsd0YkgG741QoGM%2BgygXcbUW%2FwWpL2NTVfHNFNhbK4dhBfGiHp1B195mQ62g69JurZtE5Vq2kisvq1i0N0E69cX3EFpIUWsAIuu4hsRp85gWQTLX7G6Sx5jrjE4%2FDK1Zlr9VsqqwVOD4HerB9k0LAALhSwNUx%2FrzhjW7v4MIzYXDc2MKbslM0GOqUBZx4LBjKCwcX433OGnz6tSE7eytqr8YXRI2vkqIRZr5fLG%2FlC9zk1%2BZ2oj4so2%2BJ%2BTBjB9zTjyG2hGjC%2FT%2Be2dc7g5mxBfaRWv326tfXph0MZZhIafgCueEU80HKWQpQ6hRk3UOpqn9yUVddBJTt0oRnhwy0plJ2%2Bdu0UF8y79xln0vYj%2B4F9u8LkTXk1RXgYb%2Fvl2gCLl%2F5zpjGof9nstjKlBeyu&X-Amz-Signature=d3ddb32a174cddf622934e30f790367be916e3792a5824c1e1d88dd2184c2e62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QPVZ5MI%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2FOGR3E4BqaWI%2FpfnjrrvZ48bFD48xgTjtGDOxxPe4mAiEAyrjWwZzcrExgGLwjrH5q4d5rBDX8qr79swyMtZBI9DUqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCAtqMdhNeK1F6a8OSrcA7QbxibxCcvW1p6r6YIdWzPQL6UoTg%2Fqyd8Y9gTni8SRMdCjvBb7QX%2B1vvDCBTKM2%2BgDyyk3T%2BZW7N%2BIQgI9Ds8zBH4AbzA8v2p2zpNK8Os9SvGB552%2BAoh7YUptuRw7zelnYL5tZ%2B9WCMLf1W%2FU6bcf%2BcC4b2lqDhVXppDxi91stBOSP%2BXhOXS4Dm7gWcH7R%2BTPOG1oVQm1%2BS3OryM9j%2BdtM0oURdp2Fry1nvXlVs7dD7AXqwhvck%2BeT4s8pppdYdKNMrS4NsMX%2BbebMA5veJYa5rAf3zVFzYXet88rEYWDI8Byn10dUrRccGomDi9iH5RNm63a0NFSUGT27O%2FSGYcc2SMlAOmYUa%2FuMKbE1D7IyFcqImFFVq43v9TVuvi304LAqT6AMZlfCNnnMOWffmjpzIRUryAdc3YPG95SrubTgr2yKTN%2FrleWX7grmecE%2FRfz1U6sznqSAqcsd0YkgG741QoGM%2BgygXcbUW%2FwWpL2NTVfHNFNhbK4dhBfGiHp1B195mQ62g69JurZtE5Vq2kisvq1i0N0E69cX3EFpIUWsAIuu4hsRp85gWQTLX7G6Sx5jrjE4%2FDK1Zlr9VsqqwVOD4HerB9k0LAALhSwNUx%2FrzhjW7v4MIzYXDc2MKbslM0GOqUBZx4LBjKCwcX433OGnz6tSE7eytqr8YXRI2vkqIRZr5fLG%2FlC9zk1%2BZ2oj4so2%2BJ%2BTBjB9zTjyG2hGjC%2FT%2Be2dc7g5mxBfaRWv326tfXph0MZZhIafgCueEU80HKWQpQ6hRk3UOpqn9yUVddBJTt0oRnhwy0plJ2%2Bdu0UF8y79xln0vYj%2B4F9u8LkTXk1RXgYb%2Fvl2gCLl%2F5zpjGof9nstjKlBeyu&X-Amz-Signature=0f7d00ab01603fea7d9066c60ac1f58f6ddf4dad0bfb5d513b3c3e6cd7e62cd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPFXOUYA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTiQD5lykxFte6n%2F%2FlRYx%2FIYdL8JgofWVYEdx1UrLL0wIgC3SpwiTxjTvfczJ3WiJ0yl4LaDjre8WmhBYBA4A3GVEqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBYM8nlQgOd4oSCJUircAwPDrzdObOV5bE2%2Bttbv85w9%2FEh3r%2B8HV8KacJlbIp9l2oMR4Sur2NgGnPxdV3DT%2BdDN4A%2FRlFcxV%2BH7Vcd4TPpZLy4QcDyyaNsrskWoFT0s9CWt4J%2BJ3YSuCfmSZQF4ENb2b7F%2BlfuJd5OP7dNwksUKZkVp4hJ1CXoha5y2n37ZlPHMwuO3yGAfVQ9djWSmCfFoo0aWzdGt83iWnKS7BtmKroBUETupgN4yh%2BkpDQW%2F0CiXHOSooPqY4qK%2BPblDkmj0kqF4zw%2FgOGKhcnu46fL7y5raf3DHa4p5mPqnPVmy%2Fmpv5%2BWNFDzFTzDTZm8udWxBdVeeVHPbVbVC%2B1t4iJzfw1g8PhMUChC06jwbcTxkjl7bJSmgAb%2BmYWkWvBS2M%2FejYByhFLOU%2BeceuZBVKMDVO%2B%2FmMDQqJ7z%2FSCe4k0IbRn9zp5tcN4RXxp6b%2BPZ%2BGNAYbaSff%2BuBihyFDwshVZEGM1M5TLjndyI%2B%2FuUVkzbOr4Wlf3r7fpqIckrXclONdeljqR2RAhvFQ%2FJDuRCSIrcah3XguF1pFJwZr8z71uwNnsEz6PgwPKq9EJtyKQg1iVpjwsuVzp%2FQ6vCWvp%2BGLc8SLrj7zT26qzWHTEVmowpEFlmIRCgIqNhkbHisMM3rlM0GOqUBt4OZRGlNGg44OJ7fq%2BRg8cL4N01CAjowoDpd61PKO1gVkSDBQCLmeYNom4DWd0%2BE77O0tUc3WPOXE4NtETLWgf%2Bdcwqpk7l4E2T0yLlxtsiZkjnKkxoG26h1qIOkYhSM6%2BWwSX5If%2FO63iqjpwkKNTjxgjxoYaQEo%2BLEBKVeg89Zonq0fyHSEj5pHGWq3LhDgjn84%2FKt3ovlULe1AchnAhe2zxyH&X-Amz-Signature=e6b7646eac18420ef7a87d5f4243a45127511d3007460c9bcaa79b0ae4b4f672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBCQPGHD%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDLKtirzrHK%2FqKUv4Lr%2F6cW69YVj16C7zw6o%2FjfbD7ezAIgBdCRCimZWxeB9FCiKXNLfz2yHsBVXG3Fnz6OAut7qOgqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBa%2F7%2BkUoWh00vc9ryrcAwMK6L4j2%2B%2Fan66PDY61sAltQD8428GW1adaWJTEnSK7LAnUskwv0OFCopnQ%2BzCyNyxpL2oYawnslPbe9m0%2FRIgWvhsHgbxCVw1Y9AZdfatLQBfs6rQlNZD06idozQjxe9YpZC3gcKG2RimB53N%2FNDMx0HVZ4QEkGQVhHKiPMBDLbZW%2FxMC59DVw79lX0ZQq9TsZj2AloLLCKUY%2FW0GiBdLoqFo%2F6obXvNomiPCYn%2FaRgFbeQ4WMQdxpIE7tb0G3mA1to%2BIXMaJn%2BM00Zl4pAkK4lxOdLU879EDCB23RxlNdvqIMB9VKy8G6xCezV9x9n0yi53R1X5fOIIEBBYybZkCV110dV5IvohXnr4w2Fuz73kydzzwGfT%2B%2FnWIN53wKiMJ6x4CMntvPvTFMLZn4dY6Jh%2BU7NLYvWa0TtAWHYyJgdsznlAscyve7J4iPWPd4uaUS1JJfsvtL%2BEJXiJq9%2F9Q7PY9Kerkht25zimBb3Ryu3pbGujI7GRI7nb7mHyV%2Bw5%2FY2dd7k9tN%2BltiIzRgUZ5glWlbQl%2BTqduQMN2NXyTr6%2BVR4y7FQmh5aEUjEfQxUI%2Bg7fKvKpBN0pnrX35ZlN2cTYn5MuPAXmZAAkQLXfpUGR8zC8Vj0gZtrCaPMIPslM0GOqUBahTMPugArSOhRMdUAXuHlK8sBp0NYgwDMNBxIdj2epkkohwBwy9yzY04ZiUSNOMFTqI3clbnl478qdo1%2Betp%2F%2BAVep%2F3Sm7ldl14dLtPk7jLZGNr6jL5Zz3Pmo1O0hOBZjr1r4YMNMJtaIUkwVapL1WKlt12zK9%2B2alcC8jKoqMlE%2BYpzCqBkN0DMibtbJtAp%2FWJs4VWS1hxIry7Ev93i1cXqaEs&X-Amz-Signature=db7d86b0306feb0fb74953a5df34056356d21d39b4995332356fc64d7c50f4c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ3E3C7X%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG%2Ftf2f%2F3XGUHbFeOD%2FjxFHZzmuRX91WO%2F%2BLM9aOd47WAiA89OHr55zVhJDVKBnzEE2rYO2YFjXcm%2BsRUMJI27U3TiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvIMPXXBjaIea0j%2FMKtwDUPFnJDFSvR1svnjVxq6VWHClGJdD%2BwT4U3rrAFHSPoTXDsMLCqFuAMd1k%2Fl%2Fot91Yu%2Brew3lJVRXl9a0cf0EoHcg6moUzHdnpwaMYdMfxb6p5wyIbwS3Tj87o%2FZmcbxghs9azyS1w%2Fh09kYM4icn3lNAVUZ5w2cpsJiTyZI%2BFYvTuMZRZHVxChvdXDtCSDHhnj9SOf5tVwYhwuWRAKx4xMLhW7e%2FsfElnu%2FLiunwdF1WQOQC2gJe%2BuzLZnVtX6aWwJaqQKMpArvUfR0drqKTiDpt6q0MVuq6YSwEV6X%2BcbcT75prgCThL03HXKbIw2qFY2t65589N%2F3jgxSD%2FHK8ohZ2dd2TAlLV8icZa7mBdZoxrN3mUo2RXDxkW1Y6ryptvLK%2FzU1zwlh0yIGRMMIb%2FA13u6wYRzwfu%2F%2BW98BFaKXJ%2B8hY%2BlO8ie99Kb5TMDYMn3ijKo74MKFKEA2RKnhAoy1%2FUvw%2B3e2HuuWi8bcFvJp%2FePprJ5GdVVqcTpZcZ6hfzViIz%2FczLD%2FzFWb3jUm1gMjk4LMzrd69CV0K3HAxQch7x2C8L81OZVEK%2FnaBZjqacKPBwuv4HGDaEnWGeFURjmNA98FSjsQfeYLEUcPo1fgWAWrotAwvgwZjBt0w9uuUzQY6pgEqQ9L3Gxu1zsi2Kk%2F2s6eLdgZ%2F3zP8O%2BvzD8k0moVcrHtnfTpJgJ9%2BGihNN9YIBzrd4UQVWZ4oRkhxGTj9BpLgyAdSVj3sadWl%2BGJm8Zer0SJZfMvcdhKZJkYVqP6Yo%2Bcc%2F6V7nAQdJBycF0Y3lyQ0b9VpZwyn7lBC3YABtL15jXYLcqHoVkBYM%2FSlBX60UmuUnzOn1TU%2BC%2Bh3pZwzTX7LTkt%2BBjBC&X-Amz-Signature=83055a19be923a022012c70650a110c163292000001dc9c69ed695b12be33417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQSJLGC5%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCvtQl84B%2FqFkap3fRg4sH8unTssBdqI2uToIVIjjWIFQIgCXYawCfO1TuyjeQv6W0HR1A%2Bn%2FWTeYJMRudSmuDwfZoqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeJW9Hk%2F2bvBpfJjCrcA%2B514WYRIf%2FzYiAs88MoPfjRvL3NKtXNeUW34UrwanGCWqvUuhNkdeVGNBQA7%2BximbGKrD6oDugfzE5vbmCCYtgClqdM9O4yAYCyeGh9%2BOCgVCQvSGHYOdmnngcXCNPa8nlFVBYXBaek30%2BfRyijv84Vgg6yK2EqMnCLoURYq8QirmEwyaJCbgImZWfh%2B5otBxPfbcxmziXF1ULAIeHsXeeV%2B0lJBDfB8h9SM%2Bq70%2FyyswSv6uIA%2FH3zWh0zjsfL3wngAlKY%2FxA%2BeVHEAgqlGFi1V%2FtoESagcBucQxfydRxmxpuSqYol3SkOzMgDZ1ZgN4nwiB9O1reFgGrjpGF59rwFPPid6s0m4UippzAhenR36%2BNOXimEqdRqbPGRh6GP2cASVYKG4eZf7faWZWublzB9Xbqm%2FosG42i%2FBuJcG0yMov7aKxrCU%2BblC3NEYugUqtf1aVCYwjNVkHkIIGu8O0cBK%2B%2FWvpIT8mTm2P2ppc00TuzFAVSANdT7ICrAbcV%2BJrvRVCNw5WAZVaZ0%2BvxwfbDsWuTf1lDbRu3BCKBpkJnXYkH2yofqG8%2BnWZ42iMpzwGYKnLlY5x3rKDYKI%2FWxu0GliOHbq5Apf6MZnvfQvZycIWp%2Fx652%2F90sXMr4MM7slM0GOqUBdJO8gqsyiDSQRY2yu8Li7%2BqPUEbR8eP3fZaOXUP1tRTFtgpJLOWJFePLRqwWMK2OGi7L7x3Jx87RD63NYxt9mU8iT0FEo%2BJRVhsaDDOliCPlehpuDY%2FKHtijktAgzLKdxn1TsfWpuvQ2d2cS2Z6aiBS5sBH%2FMhRkuNiDSQ9HJIUAEYWYlZoNRLeVc7%2BMwIqvOO9SQs8L6mP05nA%2BDlAgBIy8XLNb&X-Amz-Signature=77c50efb8fb7d08e989baa86e36427cab11db020b777825905fdaa34441f4032&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQSJLGC5%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCvtQl84B%2FqFkap3fRg4sH8unTssBdqI2uToIVIjjWIFQIgCXYawCfO1TuyjeQv6W0HR1A%2Bn%2FWTeYJMRudSmuDwfZoqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeJW9Hk%2F2bvBpfJjCrcA%2B514WYRIf%2FzYiAs88MoPfjRvL3NKtXNeUW34UrwanGCWqvUuhNkdeVGNBQA7%2BximbGKrD6oDugfzE5vbmCCYtgClqdM9O4yAYCyeGh9%2BOCgVCQvSGHYOdmnngcXCNPa8nlFVBYXBaek30%2BfRyijv84Vgg6yK2EqMnCLoURYq8QirmEwyaJCbgImZWfh%2B5otBxPfbcxmziXF1ULAIeHsXeeV%2B0lJBDfB8h9SM%2Bq70%2FyyswSv6uIA%2FH3zWh0zjsfL3wngAlKY%2FxA%2BeVHEAgqlGFi1V%2FtoESagcBucQxfydRxmxpuSqYol3SkOzMgDZ1ZgN4nwiB9O1reFgGrjpGF59rwFPPid6s0m4UippzAhenR36%2BNOXimEqdRqbPGRh6GP2cASVYKG4eZf7faWZWublzB9Xbqm%2FosG42i%2FBuJcG0yMov7aKxrCU%2BblC3NEYugUqtf1aVCYwjNVkHkIIGu8O0cBK%2B%2FWvpIT8mTm2P2ppc00TuzFAVSANdT7ICrAbcV%2BJrvRVCNw5WAZVaZ0%2BvxwfbDsWuTf1lDbRu3BCKBpkJnXYkH2yofqG8%2BnWZ42iMpzwGYKnLlY5x3rKDYKI%2FWxu0GliOHbq5Apf6MZnvfQvZycIWp%2Fx652%2F90sXMr4MM7slM0GOqUBdJO8gqsyiDSQRY2yu8Li7%2BqPUEbR8eP3fZaOXUP1tRTFtgpJLOWJFePLRqwWMK2OGi7L7x3Jx87RD63NYxt9mU8iT0FEo%2BJRVhsaDDOliCPlehpuDY%2FKHtijktAgzLKdxn1TsfWpuvQ2d2cS2Z6aiBS5sBH%2FMhRkuNiDSQ9HJIUAEYWYlZoNRLeVc7%2BMwIqvOO9SQs8L6mP05nA%2BDlAgBIy8XLNb&X-Amz-Signature=49276a798b76819f4f32e45f9deefc52b6c940882eec7b4df2f0be3aaba86cd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK2IM4OA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDl7BE%2F68yXiiA8BcZ9YSiXn1202BKJEynIi7n7qqwZPgIgQwWSLILySJRY4Irjc0Mvrd7ZM3oj3xAOWx%2FI9kXBCL4qiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBTpDOdeNYdLSSeEBSrcA9fYwN0xwjdLpY0v3oBlGNdYqF8i%2Fu6AGGuA2486mzb114y4YA%2FUcD0hM2En7wROccdU0PQ91YiL23mN6P48%2FNgn73K5Dtc4TQr0q2SmKGNC%2BZilMiHd8SOs8OPM7xzySDo0Edytj9AFl6sSk4Edsgdk7T4ZyM17Wn8NBKHWs3ljy0s%2B8ZU35xJIfDGETOWUMluFfOF8qeSiafooTcDCk3YmHYllxDv3uC4uJ7ZGw63aOn1ZrbmXtBjUaRQoihcEo3AA67YtYY73GgS1qlmTzrYJ1xfLJt0cgt3FI2AQ%2BkGE%2BS15gnyloRjPLdG4%2BtUo9FzXDQ%2BgR1JaMrOmnwSLDSizcYuuK1MrngWMFau%2FSnxXNYlwOQ3MFetJpR5W9bWeRvAtJjlhkTKeVecVUvjyRppMjW0sIMUrfuP1o4vHFyr%2F3lAGUANVnCn18hVdVX786v0uiuPokEf2ky%2Fa44OHzcDhaupp%2FzM0YQlTt%2B5nI9Dz52rQqljysPmjfIcK2lMt63T7GAgLL9d45m8sGVZWgcuTkDmrrmD%2FJZz8KiPYMzM0RT9Uhl3BcYsYsXHbE5wPqG78shWfskgGX1ikGSNUZzJj%2FpQkAZQd17cjaXDUJi7H9MJONYw7ZGET%2FJlrMMrrlM0GOqUBQjVJegNuZQ2Rt93Kw1hDOx8f9gJIZIroZsjOrTy4vbDfhJ6k6VXYRGd3TDTKAW9uToIRUWNA4tOc2gmBSyrmiNLgvUu075U29FGUvEQNo7LDe9uVFwB7RYxvTFO8x7dol0tUimM4mYDqcoRXDX%2B%2FXIGTU%2F8gf0MErnwsihYQD1Ll0E7axDXFmeUg3j0%2B%2BdOsWaLgBmm5slC96x0UOaAXbuBP2TVQ&X-Amz-Signature=c273e226724d9dfbcbf7b1c9eff37c793c9c89b4c057d7cfe3e967f3def9ca7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3H754PA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB47IJhW2HSAR6HzV%2FsZ3PYuORetBKWoD4y%2FzL%2FMoZzDAiEAs4j6RAhChrWUeJlEON5JnTeUT1pQrBrxMp73vkphESsqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK8dAkRoUMv%2FSQbmTyrcA3bNVL0EJsPghcDNslV3ZN6HuoTspTOXObXZDWhC%2FosDloV%2B%2FfI%2FiRJLoONhPkerPewbPbPX2grbanb63Fm9evFP%2BT8WSmcKsiWGI34zv9OV%2B5g%2FpMTHrQvpEGHFYxH%2BMkn197jU4h1Qyx8QhkWuf7EDog5rbMEO22wrkFLm5cS2Em1RuhBeQlpV7eL1FONFFWuc9i6Dg096WJOxfrh1Id4Sp0xCvdnuzSw6tNwiYXaafffbzTBi4FwB%2FNS53RZ8Paah7locxbXbywLmfWSxjNvpZ5oSS8nCJDpx4ip9Epl0MfhGs31EfgkiHEmIPT30iJoHHzF9pnCTtLvwb0KDDnCmYUkBt4LBdoJSyhIZnxQ3ZUug%2FzTBrOQtEphMTwfPYZXyTdnASA0goywH2hkSAmuM%2FF9TKOdHxCOOrE7L8oRqquGXcB%2Ftd5I%2F%2F0PHTrUW4m%2Bnfw0tR2RuJKYuOMl9JTunABh7fCmFj9bjCef%2Bm3jaUXjoldUv2HkzPlX8d4gqZbd%2F%2FyyQ6%2BwM1EdXH6P3gvOt%2FSBI1IK1ZF5tyXyIn%2FYslG4XtxGW8gkwXIJONfKvm2SDmNZgk6ED%2Bio5E6OX6ZLCfSCnr2qa9H%2Bl1bd1xmxkuj5qy2pYWuZjveTnMJbtlM0GOqUBlnqs2VygkZD7C06CnjDHcQPBxq0ZG6QvLHZTXIy3A8S0grAKhwwzDVZQrlJTsSyGSmpcmU985Jtoen%2BYMUoUd0Xv2nv%2FInf73dEMZKUMs%2BGWrDPOzvyI92ATko6lQKQ2Av9UEQgdw7MYzZPF8NUqzURV1WK04sHvHi4DadmPFqNtvFpTUfyX1DZymlY0dXEpb%2FNI51rO7bvjd3aiEn813gb5OWD0&X-Amz-Signature=12edde7e1a370f7f034cd237cd3b700098f495a9658780592a5889a410b1557f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3H754PA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB47IJhW2HSAR6HzV%2FsZ3PYuORetBKWoD4y%2FzL%2FMoZzDAiEAs4j6RAhChrWUeJlEON5JnTeUT1pQrBrxMp73vkphESsqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK8dAkRoUMv%2FSQbmTyrcA3bNVL0EJsPghcDNslV3ZN6HuoTspTOXObXZDWhC%2FosDloV%2B%2FfI%2FiRJLoONhPkerPewbPbPX2grbanb63Fm9evFP%2BT8WSmcKsiWGI34zv9OV%2B5g%2FpMTHrQvpEGHFYxH%2BMkn197jU4h1Qyx8QhkWuf7EDog5rbMEO22wrkFLm5cS2Em1RuhBeQlpV7eL1FONFFWuc9i6Dg096WJOxfrh1Id4Sp0xCvdnuzSw6tNwiYXaafffbzTBi4FwB%2FNS53RZ8Paah7locxbXbywLmfWSxjNvpZ5oSS8nCJDpx4ip9Epl0MfhGs31EfgkiHEmIPT30iJoHHzF9pnCTtLvwb0KDDnCmYUkBt4LBdoJSyhIZnxQ3ZUug%2FzTBrOQtEphMTwfPYZXyTdnASA0goywH2hkSAmuM%2FF9TKOdHxCOOrE7L8oRqquGXcB%2Ftd5I%2F%2F0PHTrUW4m%2Bnfw0tR2RuJKYuOMl9JTunABh7fCmFj9bjCef%2Bm3jaUXjoldUv2HkzPlX8d4gqZbd%2F%2FyyQ6%2BwM1EdXH6P3gvOt%2FSBI1IK1ZF5tyXyIn%2FYslG4XtxGW8gkwXIJONfKvm2SDmNZgk6ED%2Bio5E6OX6ZLCfSCnr2qa9H%2Bl1bd1xmxkuj5qy2pYWuZjveTnMJbtlM0GOqUBlnqs2VygkZD7C06CnjDHcQPBxq0ZG6QvLHZTXIy3A8S0grAKhwwzDVZQrlJTsSyGSmpcmU985Jtoen%2BYMUoUd0Xv2nv%2FInf73dEMZKUMs%2BGWrDPOzvyI92ATko6lQKQ2Av9UEQgdw7MYzZPF8NUqzURV1WK04sHvHi4DadmPFqNtvFpTUfyX1DZymlY0dXEpb%2FNI51rO7bvjd3aiEn813gb5OWD0&X-Amz-Signature=12edde7e1a370f7f034cd237cd3b700098f495a9658780592a5889a410b1557f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMGVXWBL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T074028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGXDBIPwDDrbA32o4ccfmeL0oBpgIVbZtNYOd0YX3D3VAiBAgFxWNXX4qYBNl3okHceKsCpMAJzEIBwK1jPPgodKpCqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0djII4l9T8S7Ju9aKtwDCbrUGe%2Bl1PKX4GmycmAvsZDAVSM3X0ffh%2FhZHxFKZvogE8euAX05nR0a666399HBbXajrpBzbp3G22I9pMEz%2FX2%2Bs149fMNNbLH4%2FsWOn0oD6GLE3BL0Q0QbTmz%2B0Ef8bb%2BlN%2F4Beswr1X0%2FXMBj4%2Ba97uv%2FOaJcJfpjLCA3KuKmfubppHWOhwQuG0Z99rvurD4OY1yYkrx10M2eAKgE%2Bsu08%2Btc2knslxZ2aQwZt42Pl%2FrBsyfKEToltkotynD1COt1xaPKvUmM3lLj4MuqRW%2BrRZrR7xscK8jcX3nTGTWruhlnrHbnLX0u5K8hD8xjHDvErZGJUkQIbc%2Bo12Ji%2BVIOKw5cFdGx8hPXsXCwLkxocy11TLzIkHbLEOZIQMl%2BBcTU0qSMCOUHk8Lj7YHv1VfMq1%2Bu%2FnbMFBBDiokWjvQdH%2BZLis1Rr756nxglUV85GlAIYrb%2B%2BuR4fQzCZOopxkFDaxxkwLbgkv2g3Wa0CojKW%2F0EE6OIsCh%2BCK1hdCYtIJedDqUTqrD9088tHKl1w%2FK4PvoFl98sV8raDnmatVq7gc1wBOVlI8Sy7xvULLASbIW8%2Bhbf%2FNj7%2BFLBIiGWAvmRO783xPmMNqZ9e26VbeCTckoCmpMHCf5%2BQmYw9uyUzQY6pgHGL4op5%2FDrx%2BcrsVtuzOBMzdhqc2ZaxTve%2BN7h645ScJgpO9jm%2BXyFxPxH8pFlbQdJJEej45JnhamiPb0Jw%2BMeul7stBj%2BnRtGwMU9jPRHYa6%2BMUYCK2eN04gGiDS5S3ZO084sqsnFI%2FEHx1i%2F1%2FhWiQvnPKCda6ThC%2Btn1TpWWoi7Q0Sp895Cq7%2Fqp3BLSNWDZxU0LnjmLMVyfSxlW9Iq3jXB8a7W&X-Amz-Signature=a47c6b24e39ff7e5151b2365d028adb9072616717f95fe8d4a49f3c2918d8ad5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

