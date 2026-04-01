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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OPC7RAR%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHipsEzDeHSn105Tx45xASMmqnqbC9tAalfgS0UbKkeAIgWl%2BVZVAEqo88vyXaNl%2B1EePOR25qNZIa8FNcQHFttd8q%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDASKQpC%2Bih1bCqvwwCrcAxMYbob8f%2B6w9LiGWl%2BJYeLCOgHyVd8llkerY9GxDG10S1C7SKPOoAaRWHzc5GRKJrYvwCHFV6%2BNvXqiW9OdPSDSO9mSBFT%2BKPj2sIf8tLjJUC%2FZFIHaqZOubzNfX53WMmFFw%2FtHj%2B0bUONQCPsXPBsto6eQzRsyXJfyKyg1Y84LUwQUsexgYK9ruDLxrvc5vgo4AIKJgZBeZTigsiSJEwLzk0qcCiEAmMYlktl60jH%2BULcAC%2Fb1WRE26logKZa09PCMjD9Or4nFZ3MYH7FXZeqUcDsoy6idRZ8lL8PVoVJjOUvpyXOeEvDuFtjy8gB66t1RTQtUKgB%2FbyYyeWJcSekmwT%2FQIaRzrefBnvTjaEHPz1X12D4j6ntMgNRiUC4q2va3vt3isudkH9hOmwCQSbe51Sx6szFOqB%2BZhAvAXINl8EcQeFaCjoIzMJD%2FQIgZd3pPDKK4U9bT6OtdsOoyrGw8RZX7z6Sb0k%2BKcX9T0uml8btV3%2Bbqi3OvKdIGcuKR6V1qTmS23rGa8pDZwQGqolWLMfwDs%2BgdcLflkwglPhfgfI%2BsB525wrgv6chfBiGu0c8LMIjw%2B7RCvVNYw6%2BZ4qQyy8rivY%2BmQpto302FcIcfeG8CpIr6wFYGbKMDMMittc4GOqUBSfenUtaTXocOG6WgFTvWMXBDsV1FnBFgui4RvzeEluO3D0Pt7Iwj17O8kpPfs0p8egjk52q5BzCLQ94belRHvgJzQ8vl9pOKNsb%2BmobrJE7ztzfyqrJmNpN5OuINFMN1wokulOZliAIcuV2PNe7fKhf9rwam%2B5n%2Basc5ZbEWfo%2FJa1zm54HBUPUyS9gMUdlpYjCRuqaUvTDX6YLEFy2cpepAf6oA&X-Amz-Signature=17f3a90de805ad55f789943aac1efaa1cb85e6c17d1d2f9ad3b762c22ec589cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OPC7RAR%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHipsEzDeHSn105Tx45xASMmqnqbC9tAalfgS0UbKkeAIgWl%2BVZVAEqo88vyXaNl%2B1EePOR25qNZIa8FNcQHFttd8q%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDASKQpC%2Bih1bCqvwwCrcAxMYbob8f%2B6w9LiGWl%2BJYeLCOgHyVd8llkerY9GxDG10S1C7SKPOoAaRWHzc5GRKJrYvwCHFV6%2BNvXqiW9OdPSDSO9mSBFT%2BKPj2sIf8tLjJUC%2FZFIHaqZOubzNfX53WMmFFw%2FtHj%2B0bUONQCPsXPBsto6eQzRsyXJfyKyg1Y84LUwQUsexgYK9ruDLxrvc5vgo4AIKJgZBeZTigsiSJEwLzk0qcCiEAmMYlktl60jH%2BULcAC%2Fb1WRE26logKZa09PCMjD9Or4nFZ3MYH7FXZeqUcDsoy6idRZ8lL8PVoVJjOUvpyXOeEvDuFtjy8gB66t1RTQtUKgB%2FbyYyeWJcSekmwT%2FQIaRzrefBnvTjaEHPz1X12D4j6ntMgNRiUC4q2va3vt3isudkH9hOmwCQSbe51Sx6szFOqB%2BZhAvAXINl8EcQeFaCjoIzMJD%2FQIgZd3pPDKK4U9bT6OtdsOoyrGw8RZX7z6Sb0k%2BKcX9T0uml8btV3%2Bbqi3OvKdIGcuKR6V1qTmS23rGa8pDZwQGqolWLMfwDs%2BgdcLflkwglPhfgfI%2BsB525wrgv6chfBiGu0c8LMIjw%2B7RCvVNYw6%2BZ4qQyy8rivY%2BmQpto302FcIcfeG8CpIr6wFYGbKMDMMittc4GOqUBSfenUtaTXocOG6WgFTvWMXBDsV1FnBFgui4RvzeEluO3D0Pt7Iwj17O8kpPfs0p8egjk52q5BzCLQ94belRHvgJzQ8vl9pOKNsb%2BmobrJE7ztzfyqrJmNpN5OuINFMN1wokulOZliAIcuV2PNe7fKhf9rwam%2B5n%2Basc5ZbEWfo%2FJa1zm54HBUPUyS9gMUdlpYjCRuqaUvTDX6YLEFy2cpepAf6oA&X-Amz-Signature=17f3a90de805ad55f789943aac1efaa1cb85e6c17d1d2f9ad3b762c22ec589cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EOYCZZQ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7OBcTZgvYW3W4y%2Bzvrw2J2uAnJWWcZ4shNXdIyUNK9AiEA1z%2FfgPRaKzXGC0NJ4Gl0M%2FnXYNlFQRYqdaCcNjoCFVEq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDMfOj%2BOfMoAkAO999SrcA1j2Ol%2FWWCHRjbTnBJqgZfo3BTnOhV6BEq%2B2lInrdMq3BQQRXOa0DHAErjldm9HzIZj5aKdhGM8qkxFVVLPK7fMPaPHgTJ6uSX7nOGnd7thdwY1ggE1yIgczZe3jxH4gAKrcQn9Hxv8ZAnzt6O4xFEMV1sCio67c5OWl9BJtyGOeKiOkY%2Fzdi46y9Q0mxznIAiqb1HOmte1FtZAm0nLrkn9HF1164d7zODGoRJ9WOXZBjWbS3R0JJU%2BVZzppEXI5B2CQPEKBahBB0xsC69jaPvMEyupzHJD6FjW58kqsmaZRYCp%2FnfrNwxAa4fUUVatP81eTeJkKhwOzIy7KssMuOuRp7PhNk%2BR3rEhOtb4jI8N6Dc4vUVkor7GLAX4gTMlMtQelnsGaN3QoRqDbuuxtqtEfp8zjqadEgYVqDKW7SMt1viqKq0c%2FqWfdSfvYjC%2FajICcofaOpqyhFXjLezco7iQNv6oqJBgrAqKYEdE0RHaISl56n9Kq70KfBymloaBd2CJlrOsWPqOcEo%2BbWD4yySnSbsxGBLEYbiJt5o3uE8L5VtZDkSkPcrfSRvKs1DxlpwbY5pM49I83VmBOoNLFKggFJx%2FV6HvMHIQSnBUSWvEWKpc34mrdRBady6oSMOSutc4GOqUB%2B1PnUsgv5SKPcYbey3w433VYJArZrOKoPCps70tLFcJRFwCSW2CRjVcPgRC4pEYrS04%2FW%2BsdyUtmU%2FsVGUdPPEkuMyQRSfx7QR0Djj%2F8TRi0r8aywCmsxmRvXv11193X08t8LHJzlwNRNb5a5TzZ%2FUo13dMCUnRpwZPlhZHMwiiLf0yEzNlHSv66g5iKBIInakptvn45%2FF7G2N4jSjTH1X9IK4Zo&X-Amz-Signature=22bdbd04f39c2626080824c58544cea71518ab03c3b557197d3dc50cd95e2665&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RECHB3LT%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGcCSmiGNL4bI5tpwfchqZIsYJFwQDxU6jOkxlEjBbWAAiAIlfkB0n5StzRMty9MvSaljJLT9AWA4eCb%2BG9B8jynaSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMe4QQITjwmfs6pms%2BKtwDigeTVNTYsP9XLS6pavlxV2ZtaOtg5glRjXVGLdo4icPXnxku0gaO7uVQ4HgSSXf2FPOr5yk9IzQlPy8Rus%2BhCaN0J3Z9036DSfL7wZMP%2B3D%2FhdSlAcLjtLe627YKZS1ax%2Fd9uvABN2x997wNXICZsV842f74tRt69OAUhVfPMgeXllcbnmamAOk6ZcAAmLUokFYEkEAmLZ0Z1GaiO6NOf97P5QTazUVIvT1Uz%2BqJkr%2BFMzbN7wlv6IWDElzECGTQqWCHK6dvStDu4ZnoO907InpkStfxLWNdl4GpWOgDrZtbRaFbOCPL4XgQ7GnkAAqk3aWLNjJtggtv1SjMmDwgWvJgAQbx5ikMRfxAHA%2Fa%2BHDap5hqM%2FF0JTvTn%2B0ZGxnpNs%2BAH4HEfVZb%2FW7Cb6F56IypyMZ%2FYdkYNTok3k5mnp%2Fr%2BfWVshYZGqGr7FtBs93ozqkcygoxHAvUDcWsieHZboWRylKFLKJY8nv0OEGKFad5u7xLMPZ8CGvbI6MQJFbsmRqFrZ8YRDCt7iHGXKqqwwB1lnjMo0Eliv8k4aRyUZ52DqJZmOS2YisC92oCaHveshoLKRFrSdQQ6R5uSS6hdOjRlNzwRz7EmjN%2FGRHjp8mkst1YXUfAVym6m1kwoK61zgY6pgGTGZJEi8EHoREGDZahRql7bF4iJ%2B2WXfcAgMWsFShbb11Ye7AKDgM7IvfgzTwJ6T7Y7sPfjKGmgEdZ8RlDctqdfluMRGfrgdxE6%2FRZPWgfgPeuaQYLHS2jTWMrBrizvBqr9M4BWx203944x7u89YuFAts%2BshT1bIxDaIglDHiNTORfCiH%2FjEZjh8lYYxNJTnwlcM2jg%2BG3743aN815nd7HJxrMv5zd&X-Amz-Signature=97a26c3318cbe518a9a0d81984f3450f00cb8b19f5f165d52c282d74954e309d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RECHB3LT%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGcCSmiGNL4bI5tpwfchqZIsYJFwQDxU6jOkxlEjBbWAAiAIlfkB0n5StzRMty9MvSaljJLT9AWA4eCb%2BG9B8jynaSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMe4QQITjwmfs6pms%2BKtwDigeTVNTYsP9XLS6pavlxV2ZtaOtg5glRjXVGLdo4icPXnxku0gaO7uVQ4HgSSXf2FPOr5yk9IzQlPy8Rus%2BhCaN0J3Z9036DSfL7wZMP%2B3D%2FhdSlAcLjtLe627YKZS1ax%2Fd9uvABN2x997wNXICZsV842f74tRt69OAUhVfPMgeXllcbnmamAOk6ZcAAmLUokFYEkEAmLZ0Z1GaiO6NOf97P5QTazUVIvT1Uz%2BqJkr%2BFMzbN7wlv6IWDElzECGTQqWCHK6dvStDu4ZnoO907InpkStfxLWNdl4GpWOgDrZtbRaFbOCPL4XgQ7GnkAAqk3aWLNjJtggtv1SjMmDwgWvJgAQbx5ikMRfxAHA%2Fa%2BHDap5hqM%2FF0JTvTn%2B0ZGxnpNs%2BAH4HEfVZb%2FW7Cb6F56IypyMZ%2FYdkYNTok3k5mnp%2Fr%2BfWVshYZGqGr7FtBs93ozqkcygoxHAvUDcWsieHZboWRylKFLKJY8nv0OEGKFad5u7xLMPZ8CGvbI6MQJFbsmRqFrZ8YRDCt7iHGXKqqwwB1lnjMo0Eliv8k4aRyUZ52DqJZmOS2YisC92oCaHveshoLKRFrSdQQ6R5uSS6hdOjRlNzwRz7EmjN%2FGRHjp8mkst1YXUfAVym6m1kwoK61zgY6pgGTGZJEi8EHoREGDZahRql7bF4iJ%2B2WXfcAgMWsFShbb11Ye7AKDgM7IvfgzTwJ6T7Y7sPfjKGmgEdZ8RlDctqdfluMRGfrgdxE6%2FRZPWgfgPeuaQYLHS2jTWMrBrizvBqr9M4BWx203944x7u89YuFAts%2BshT1bIxDaIglDHiNTORfCiH%2FjEZjh8lYYxNJTnwlcM2jg%2BG3743aN815nd7HJxrMv5zd&X-Amz-Signature=c88d729dd099db74f14b606c755f34c8763593f50bf5ca0fab5251b42fbe9d5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YM2YQBX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDKiwo9n9WY%2BFwzmE3cwZgwi%2FUZfQdKjiVPDuN9nFovwwIhAMHXDRCtUQaw1Lml6riBJiMdcf2c83uZ56E9DMOitK1nKv8DCFsQABoMNjM3NDIzMTgzODA1Igy%2FoRfVZgR9xXaYWGkq3ANHDGN6AQ2pZSnBdXqIyjwQVFnGgJwzZV%2FoiZRWVy1IIXdPZFE6%2BWq2Nn6c1yaV78%2FIJUdbv%2FJBk%2BUWlDa6FONaLlWOs3C57L1m%2BXbtZzRSMUtH5h8AYzOrzmqH7q4fpOs4%2BHXOWE2cs%2FcTiEvG6GxgBGoLd6C46sGBQG1i7kkdpeR%2FiRgejBBx3ME5CCjn0bWjreEYvIbPw9%2FKcvcbn1ogWfXKbsBjggN1cLhJtjsswa8vICpNcWpTOdZJt7tfutVvcVdEP41VR1SfWWTQRv12b9GBthW7DAUOjtwCB5en1ltjrSyh9GAQ%2FbplgXPjikU8eY6L2Wcz5ClTlkQAq5VMbV2yGRmUILTu3fg0Du0tiMMdfTGVOAAsoqxWXb7%2BdadN0NtY%2BCLK0ao0y9wnwnAZnEvQAICX0nvT54sXqikC3vQ3UIPoxWiLaUIVTlBQJ5Fa5GPVVN88u6%2BiSLXrwkj%2F6wmowo%2Fnm00Mb9sxIDzVI31LJ8ijCBsekpg9HmnY4WLpk3oGRBRhyzVGiB7nxBV1R3Q4gDjmvGj%2BpNJrWgKxyV4A%2Feri5HnibfkXouepHwjTfFjPMXb%2F6HZz%2BB5uX0U4tiPrWt0KSn5PxJZvR%2Fz1r2NWCItTWwdF%2BVgK8TDlrLXOBjqkAXoWBgOHFN3IrmmI2nZu3E1B3h1gBmCdYnaUDlAlTsH5gC4ZOgVz1KROeRuUkqKpihTvqjSkfdP5U9opX01%2Fao2QrLbFMy3Fw%2BQwutXJySVsSQd01dlxI2jDAnPm4hb73M1XLKkaS8SOkBMyOZmQmjxXbkOiz50xpYgUSaMk5%2FSCdWd2pPy7W%2FEonFORP%2FX04XhhtHuZy4tAERbYAFCdw%2Fcs256Z&X-Amz-Signature=fdccc1caa232d5163df6c254fb2b448541a7c03206fd30c9cd52cd4561a8570d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBZX4BEY%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBAXC3jqSULUgtoHXsXfTQH3K3q0ISFr5CUQyn%2F%2B4RgqAiBVOulNQtmWXJOcCqf%2BUiv8DIIRPOH37kYjQF3jngHBdSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMAR3PlluXwyFlGC3mKtwDK7J4LOVqpKcWkXbCN2jDs7GbI6onexVRN%2FdHy8o1ZQ01vuIfG3pXNa%2BqlNr8GCI2Nxo6ECwz7vrkOlp%2B3JDuVOXnvBRbdexXJ8yN%2BVaAoh6rmU4QwjR1nCVCDQZDfYm%2BTNqC%2FjkCZmvBBu0B1rTUU9cdW5h0L818RLSkA6fJI%2BshlE5sRovKPvec%2FRItYDJA3c6FYTmy2D%2Fhjjn5l6%2BhhxMf9nVp0DpKE65tRTKsHUW87woAePO8oCX%2FMItjyy%2FatJ0F7sfFWYZh%2B2%2FLOtnMx8f6Bk3cCEIn%2BRT8G5N5rQs0NlBfXQZJDMXtBrGszlxgWxVAJByKbzjNMFpWdZws4kRHh%2FFBGVxVjim8fZdPZDEUvg0%2Fm6m0XwCAoyY51cxj6lBNW1SWLnxggjehxs0IC%2BusEuxh4Te5FM%2BVQgafh3BxQxdiGZ3Fc2OzLBLS9DF%2B4w84zWjUGTzz%2BZ1kyBjgM99m08r5qF2BY3eDxPuDW%2BUoDsgfDG5zTnQ%2BNyHSKl%2FWQb4S0VIeqW%2BPJUcnnV9LDmB%2BJ7OhjOVigYNCa6V3aaaOeof69sCsNgrJM3qiHdxPm6uW4uNkIHIh%2BbmY41L1N7zdIXkAw%2FBk0RIWWnGgt5oN1DyfZ95RUU5ZYVcwiqy1zgY6pgHTSBiHUAKQR2Wrn%2FE2wGVDkN77G3z61jV52p%2BEf5FJN3btZdlrawg9KD2IamqM9HfpIuiLIvQgFxnyXLLLIddrMZTqyzJWgPylHSJ6s7bRNqJCiNqrR549y2HdptFunodBZoc1ZK1%2F48UdeSBFvzLuahyw63M8yJrTHDrCWhuPJXPg5Wp7scEvmpnB0BFb3T5iG%2BCIMdNROvgoq7nzhWdtxPTW%2Fhav&X-Amz-Signature=cda0af8955947a6216787d851a214ada95a1482f4973ce8ae3b875aff6fa9110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O6RKLNG%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVl0XzN%2BwbW4j0WSEAx7NbGOm9mdE0kkNfrg7MjaF3OwIgP3mKegrKrsymrUb6qzK8iJbdOILHI4yjqFSIjfyfNYsq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDHu4gIZfurS9xDHfQircAx3iuhL35nYQM9bsR39IEFX3aKa2YjRTFjsfNSzUESv9snqPjo8Sh5Lq4ga2jVBDBfq1xpkVK%2B2JSSEcwOT6UHctIRhUMLCElYCaBSdDopfmpBiuxMRcb2vR%2FC7tf%2BUUsiF5OJm3xUaR4i4DnFrIMriZK05kPUhIiCKyu1d2%2FegabUulXUcLTJMapWul8wstlSHJWAWHIq4kjoXPzuGTbdu9IdPPm%2By6JwCDJSjKsWuFIfS14TTF5rudzLLG1EN4BsJkUlodabkW%2FwjqH4OJe%2BegiLCobRPjcqFUWxnfTdY1huyPzhEx8YVCV6KNMxDh8FgObRQ37xR0zENY3shUAhEu5rlsQAu5206GEkdMG%2Bt38EF4i4oCF2sNd0CsnH8MIfOWsNTiBPbRQ5piD%2BYl6H65Noxm1H2rV74NYZipxbyNQx8%2FrSEfkRxQ1Gncwf5r9eQfQukpzcEC%2Bp%2B0oiBohjqor7wS5xSOlMIymJbtq0x1VHkbwgCFeabhPwtx8tweszSyz4cfNXpmydfYmJPEadFC%2F2geJuzxPz6QpOijWD%2FhP4Fg0QLUQ2Nt5MGlz4VqO4ijD5B4agSJfKwP8ghR9fOG1v0joViUfUj9mDf%2FWJgPygXiK3pSIsJXz2PEMP%2Bstc4GOqUBATAL4kQuv%2B9F3Qg7rAbY5AUWZiLNLdie6d7CwdKCsbv2obRbgRP3EaMvewvEYJp%2BOCOK66DZGStzlW5ClumcIzPWvIDqUc57ImnKaUyTmtDTzmOz6%2FgxPJnzuXLARrydy39ZcF1hh11Iq%2F79w9YvlpPRJVQUqtpo%2FBgtNKj3I2tQ6oKHNgd5ENQjz5b0WzKLTQxO%2BgaZWPU4mtaOtgmubmKgvhjI&X-Amz-Signature=f661685ad9447340569e396821ebd5f6a95863aa78971d7e73e37e8fc0f4e4b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG76X7MX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAV4G%2BmIcqLN87zyaazzRHariDuC7NdYUQWAbeBbZOxQIgQLx4x1qSWi6ezoyLNhx%2BOrNxndC9X4GbewS%2BMwRDoOwq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDGpDq7dEBjDJ6OQ3CCrcAzwQylPFCBSFWCTDKq8NPFBSeM2AEfM%2BxmbyDU3zbw1H7KvjH6QT5SJtBWkeU7OUvbT79z9lwFhJXOSPwE3GImdtzENoHtb8TH80bgunA3xHSz00IG6D994VV25C7%2FH%2BqG4JL6DX0LqZULxCP%2B0yVV%2B0ykVY03zewVkUA3n7dZBUoaU73OYeyct6iGfAPfr2f53zDhwSypQcebeEiUF5T4qaSnFFT7N9BCjiJsywyLr5bfnp1AywpjYmk%2FiCXV6TrxFJZM6wPr5QdezQVQqTjqoykdWUScM%2Buz%2Bchjxjm5mRK1cfTmt3gpGfYfRb35zK4BHvXN5bLR5oIUg5lGGbKJqafHIvkOmyEhJHjkE%2BN7%2FlpAj50KTYJmg5LEWQ97GbpxzW5DitDkkHlzn9vvTFwnFGqv1z2PMrLAsJ4iNehT69pfFiptrQZuQdgOswm4egkDESlVH7Adf0STcbUieHyXoo9CL1h3FhjHEjvSxZaAcMV0HouQ3KAbniQ%2BzHU9AmZWV3kqp9fA8MIyPk39zkaYmlOkxwNHxRRTKzHd0PGo%2Fa4U%2BxHwvpSrqTgYbFTIffQNKPrqsEgmKmCr%2Bfy2CyE2fv%2BbiaK%2BaPB9Z%2FS3lJQ8hxCF6ojfjZLq3NzuYpMJ2ttc4GOqUBbVcEyTfjqWvirPKKjUnVSnduEwRMmvEwayxXFu3CXsymleWkVZ6ewkjj8m5%2Fy9CGB4kNSZevaw4m1EIFYRP%2BkUN9p8cvus4tZ9yb7NXxnaa1ksAjIsQUxbSXw1hfrL%2BlUy8BPkY4xqKFLq6ceTjQiVT102ajWZ2NBllc6ldqXhMQaimiwgGsPOsEpVZJslbrQUxwZl%2FvlSSVIMk9lgHs%2FP7BMFK3&X-Amz-Signature=d92e0904fad3aa1608a3c4eff1f62b39ebb0b1634708f60b65acd7de537101ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG76X7MX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAV4G%2BmIcqLN87zyaazzRHariDuC7NdYUQWAbeBbZOxQIgQLx4x1qSWi6ezoyLNhx%2BOrNxndC9X4GbewS%2BMwRDoOwq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDGpDq7dEBjDJ6OQ3CCrcAzwQylPFCBSFWCTDKq8NPFBSeM2AEfM%2BxmbyDU3zbw1H7KvjH6QT5SJtBWkeU7OUvbT79z9lwFhJXOSPwE3GImdtzENoHtb8TH80bgunA3xHSz00IG6D994VV25C7%2FH%2BqG4JL6DX0LqZULxCP%2B0yVV%2B0ykVY03zewVkUA3n7dZBUoaU73OYeyct6iGfAPfr2f53zDhwSypQcebeEiUF5T4qaSnFFT7N9BCjiJsywyLr5bfnp1AywpjYmk%2FiCXV6TrxFJZM6wPr5QdezQVQqTjqoykdWUScM%2Buz%2Bchjxjm5mRK1cfTmt3gpGfYfRb35zK4BHvXN5bLR5oIUg5lGGbKJqafHIvkOmyEhJHjkE%2BN7%2FlpAj50KTYJmg5LEWQ97GbpxzW5DitDkkHlzn9vvTFwnFGqv1z2PMrLAsJ4iNehT69pfFiptrQZuQdgOswm4egkDESlVH7Adf0STcbUieHyXoo9CL1h3FhjHEjvSxZaAcMV0HouQ3KAbniQ%2BzHU9AmZWV3kqp9fA8MIyPk39zkaYmlOkxwNHxRRTKzHd0PGo%2Fa4U%2BxHwvpSrqTgYbFTIffQNKPrqsEgmKmCr%2Bfy2CyE2fv%2BbiaK%2BaPB9Z%2FS3lJQ8hxCF6ojfjZLq3NzuYpMJ2ttc4GOqUBbVcEyTfjqWvirPKKjUnVSnduEwRMmvEwayxXFu3CXsymleWkVZ6ewkjj8m5%2Fy9CGB4kNSZevaw4m1EIFYRP%2BkUN9p8cvus4tZ9yb7NXxnaa1ksAjIsQUxbSXw1hfrL%2BlUy8BPkY4xqKFLq6ceTjQiVT102ajWZ2NBllc6ldqXhMQaimiwgGsPOsEpVZJslbrQUxwZl%2FvlSSVIMk9lgHs%2FP7BMFK3&X-Amz-Signature=ead9feb0d2942263137c1a4c78ec85400c8cc710d89df84077753e5fc1bfa6e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCU7N2FL%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDG3P7r6%2FykqeX4SR%2F%2FMDqVqXuwT%2BdFJA6gAGYeL7cu2QIhANLhwMvXVeBAco%2FbdK34Ay1jnlcPQ%2F%2BWRT3Fx1KQatQwKv8DCFsQABoMNjM3NDIzMTgzODA1Igzcqk7Sk%2B4Vq%2FPSmq8q3AOyXtl0fTfLba6C8pLFXRRRF%2BItYMWZBXC%2B0RgnegRtbKyM8j9ci7m%2BWl1uSs0RKym9sdZclV8t34Uho3FX%2B9ee5uIREmCbq2FWXHGGa%2BtPra6t1nGXItmoTOCZkmRmzTTKpPi%2BvBwkSi6LsBiQqpZXur38s4RdcfDdnHm8m9qQa6fOMB5g16bz%2By9HqA33Ysmr4tH%2FkaugAupyTJJxYU93cz2njh%2BLkFpsdTRa29gKW%2BeM1lS5Kfzkl3G6JDCYosYjxKpT2hcmNzAKrVSjJ1vho35%2B7R0ANetbutUsX0YkMgwLKy2ngfGkLUCLV3NmGrRPVlcCjvmIk6fOlP4n4miCiWdGiEO8AzfC%2FDscr28mioO3HjeQBPWR2FIqbGVTE59wC%2B9RHp%2B8g%2BfwTh71R374Rc%2BK%2BtDR8PBzea53Aic7HgYg3PiFRvz%2FA4MfD%2Bf5h1pA9GgYj6RZXf8IdPD4wFGLXKNSJd1UbTwwjbNMC5WxiBiifCGFSvUp5KT%2Ft%2BJEeXOgtFhiajhboErsKPeNxlxzp6Y84GR%2BLAIywG%2ByQqhUDgFvqZBEFd4ZTnGNGeA8fRH4dj7WtFrU8HrFSvdUcCHe3eynwkhpJhvJ6dm45X4aV2Uy57GfukXReJf2pDCMrLXOBjqkAYrfe08DFzep%2FG%2BMqmhzkxTU2vMd1l%2B4fXPgn9wA0ksslGpwUUFGU30ivcxmoX%2FVN3WF8GsuojMuXmGTXCZzoDADXqRWzCs2uNbDnEzNse8OGnLzyYkJ%2BNBY7ZWfd82aWP3QwKLctml%2Be07JMPWfCOkOUMV45EguUK1lOaZJzHmrL0zX02zCAvm%2BfXdF7NNqi9sluI6RCBJIK%2FXPhs%2B5r4l2zql5&X-Amz-Signature=02720d82ee7c309e813455f7d43d89741604ac836039f6fa8981161af1f7855f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XGXFZVW%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHGl0vhSebdehWr%2Bo8E6R9YmTXZtUUPlSSh8MA4KEV7FAiBsp%2B7FDIMEMBXTNOSwC7SGh%2FzgZ9kNpqjygT%2FgdyRunSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMMDyYwEwzkU9lKv30KtwDy%2FHnL6DNxLcznVpkSC5IBo3%2Fo6g1jueE3D%2FR2oGga0xEUuRQoXn1%2F3MWlg3UqtTlBkIIEne5Q6jQZmNuqkEH2j4gQ16BoNRGUHmC%2BrboCzmJfzYl%2BPXL2PvZDJqf1jv%2FUkkGqZxwcBtPgMvfFIsQR8FNVhSuBXJTjM%2Bt%2FPjsQ6LNJKKbx2CEuMN47kCq7C1ed4pgSQukBpTST%2F0rdXOAm9cvfB5zvVbBl3c39HxbXwXNYpZpS%2BX%2B3aBQmZKNI0EN29HiC5fnr66%2B7arm3bHCUW5DrMRuQiRwDedAi3M1%2BXm74479DQFt3RP2wmX%2BaPBCNXPXomwISiIHzZJIaGm90E9Ts1QOVf2Vvx3wlxWnx%2FOXzjD094HmzfGBy1Xffvz0Ww7H16rb0FKdlMg5finDJ7jErqWQixrstp9O8fF9P0sOy9gIqVLgUdfcKuOjq%2FiyT5jkAymlTzDF7UT42rc1GcemNwHj0LENtYohF7si5Nef9O1zbvloJgAccHHAdh4PSKFbC%2BYEdJKmPlyiL57AkfjSoY%2F9g7hhlj5ys47h%2BIPg3%2BDaqG%2Fh6kih%2FKCfR3xz%2BNG%2BcIJWV7XeMgvhVnZVnJibpesHEWoWdPhVXNJpVgnESE5BBrKF4M%2BHb3ow4qy1zgY6pgGWMVYV2okTO3eE9hoy9q%2FEc6M%2FzTNJNJ9cJVv031ShdToCHVNXOalg0KMGSK%2FZSGZmthGJBVNcoXRt71AEvgAWhmZ7AxoYnQVavd2RTzGzpVGhXvMBbBuNCASTF7giKpfLHc2IuB15UWXVHBDYLgai2Yhje1K44YH0ygSTTpyhuVFjqlFr4SIQoUwSx8%2BQx7sxafs%2BQn0ZnAle2Hh%2FLYQ9TiwmIwn2&X-Amz-Signature=0d930465fb427fbc1f53e54a7b06b7d3f976b5f552aa79a63a8a572fbebed586&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XGXFZVW%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHGl0vhSebdehWr%2Bo8E6R9YmTXZtUUPlSSh8MA4KEV7FAiBsp%2B7FDIMEMBXTNOSwC7SGh%2FzgZ9kNpqjygT%2FgdyRunSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMMDyYwEwzkU9lKv30KtwDy%2FHnL6DNxLcznVpkSC5IBo3%2Fo6g1jueE3D%2FR2oGga0xEUuRQoXn1%2F3MWlg3UqtTlBkIIEne5Q6jQZmNuqkEH2j4gQ16BoNRGUHmC%2BrboCzmJfzYl%2BPXL2PvZDJqf1jv%2FUkkGqZxwcBtPgMvfFIsQR8FNVhSuBXJTjM%2Bt%2FPjsQ6LNJKKbx2CEuMN47kCq7C1ed4pgSQukBpTST%2F0rdXOAm9cvfB5zvVbBl3c39HxbXwXNYpZpS%2BX%2B3aBQmZKNI0EN29HiC5fnr66%2B7arm3bHCUW5DrMRuQiRwDedAi3M1%2BXm74479DQFt3RP2wmX%2BaPBCNXPXomwISiIHzZJIaGm90E9Ts1QOVf2Vvx3wlxWnx%2FOXzjD094HmzfGBy1Xffvz0Ww7H16rb0FKdlMg5finDJ7jErqWQixrstp9O8fF9P0sOy9gIqVLgUdfcKuOjq%2FiyT5jkAymlTzDF7UT42rc1GcemNwHj0LENtYohF7si5Nef9O1zbvloJgAccHHAdh4PSKFbC%2BYEdJKmPlyiL57AkfjSoY%2F9g7hhlj5ys47h%2BIPg3%2BDaqG%2Fh6kih%2FKCfR3xz%2BNG%2BcIJWV7XeMgvhVnZVnJibpesHEWoWdPhVXNJpVgnESE5BBrKF4M%2BHb3ow4qy1zgY6pgGWMVYV2okTO3eE9hoy9q%2FEc6M%2FzTNJNJ9cJVv031ShdToCHVNXOalg0KMGSK%2FZSGZmthGJBVNcoXRt71AEvgAWhmZ7AxoYnQVavd2RTzGzpVGhXvMBbBuNCASTF7giKpfLHc2IuB15UWXVHBDYLgai2Yhje1K44YH0ygSTTpyhuVFjqlFr4SIQoUwSx8%2BQx7sxafs%2BQn0ZnAle2Hh%2FLYQ9TiwmIwn2&X-Amz-Signature=0d930465fb427fbc1f53e54a7b06b7d3f976b5f552aa79a63a8a572fbebed586&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBLVVIS7%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T184044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEVkqYeac3ih%2Fh%2FrDqV0ECoyKTzHaCyLLeBruQC1LaonAiEA1tr%2BUzdAJVJgWGaZdejCeRniJyuffbY4O6D3v9vdvNIq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDJX44OII%2BcP6h6b2qyrcA605kg3s71oDddl9bmsgFbXcVDicm8%2F5oT13Xg671pjCI2K2EVPHXAT9TsQwCXb7A1jCMzssm8lC9aAsE0bRdAHAKGqhGP5QuoEww1n65bz%2B19U9ZGQuq67SbC6VuscY0QrTkey75Tw6XLwkzZr%2BXUPGcvw9j0W7dcqe20KDLxKuT7TLbgD5XJAvH8KYtu2wmjJnB8l14vJ%2F84IpiMk4%2B8ngxj3uc6ko5C8%2FwSE6cU9%2Beu72kVubD6kvZsyFWJgGFzbUUs5drTYrIypuQFbdyOjvz1wRaNFhbER387hDmUSr7owsU5MxTrTDEVA65dSeOiyuw5LooSZwnjvv9uBKQ5moZu3a2P0iRCXETbg83kLZdX8TaS1RZXngCldhXyT%2BXQ6lY9tUBWAhqKE7d8ItwjsBdY67KiQWzEhFJKCrzPeWgOhYLfn7Qf%2F44GfMyhWoCsVpYi1AkGJPJIAb4mArcg0pp6pQ9bVH7vqWGK%2Fr9yP9zJWKOPmJkktLaeP3bZXMkHAqfoaqYFIuO7gsUk1hd6uNxwmLWotqoevsd9EHUTmGnOKY4japsycQBUiNE5TQTV%2FJ0uDUdXzl2IaBd2JRTXMI46sZKKLiHksHGC7wV%2By4W0KLaj0T%2FRBcxniSMNWttc4GOqUBWIfEReMosJr%2FTTZiINiLYSreg%2BbHnOv3VkNg4RJpzrhZ%2FK2qVhlgF5lwcBZVMjwG6C8Y3F77C6VdfX3iHQ263KlhiwEb7cGoPRYmAymDP7iLq1q5wS%2B%2BPxC88h5HOVtxDkNiag6Pi%2FaKvwmtJ8B8S%2BoKWRyf5EgQStdborH%2FC%2Fafdtp90eFZLeElNt7tjXJdbi1VvZ7wZorfg7Tr11%2Fvvqaj0Tk5&X-Amz-Signature=94f2aed20a5b43d2c75db85232d66c99cdd315f92651ea57c4b64f8c8285ba06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

