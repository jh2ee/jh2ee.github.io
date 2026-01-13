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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XCOFEEK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQDLLyb0DIws27OkQVwCwQxI%2Bq%2FDaHE7TApX8wuLVo0u%2FQIhAPVEavWEfmeBytbVbn%2FGBUegCF4TXZvBBCniDQnrxP%2BEKv8DCAAQABoMNjM3NDIzMTgzODA1Igx5YB83BESZi0RAsRYq3AM9c0mK1n0qwFkZSpvD40%2FSm%2F5Y2P6NgjIHs6XZE0O4piqhKodxSpl2nt9z4nC5SyqrA0oei7UqScU5EGT1nxgoytw5%2BZQwEoMAkKAbopSNb%2FnJp29UONHY%2B%2Fsg38Rznakvnra7RN%2FUvzyA2o93h%2FCCuavYd3pmzzRQaYG502%2BXp52w9ZKjuGYZR3yBxHV08kXwWofX4UWKThzjCMtDhGqbQLeh7Qs7DWz2Ye79ijrqyqzTtu9gk1QK0Bk1%2BqQJLLjc8HWZFTtpiRtAXbwLIQdMyHVB3WB6pnWfs0o9cG7Amrs0Oty%2B67xPaNelX2rJhJEgqrQEYNSg2k3AsaSBPPi%2BAhznPzXx8PIzMQJ3WTLYq5i0n%2FzAl5Oa8iiJNyrDl2nShIPpPcBD81reXUgLqazgXGpG4idNlV2mJS9ts44wZ8BtzkrwhI0vLXv%2BM3xVviqSgztsB1OPWuMeNjG1QNpLr2prUvwhQ94Twd0jqn9MrDeYNuCX9rXInCuYz0ONXpW48DUuoAaUEa8p%2B5WKaWL2MfE8ut6b0ZWUhFLvK6ASLfrbdnBx6sacneOK5FbFcNc9YZIU7DbFxAmtTjs1xL8FhX%2BLc3BvKY%2BIZ%2B0gmJWI77weNQ5%2BsunpJblmKDDB4ZfLBjqkAYTauEa5sebznE4i1ohJLbd4VDQS%2BOWiOi4nQdXhO90LmXECVewnvxGQRU0%2Fo4zouYWL6P56B0u1h8hIWHN3fsl8oCAGw8J8fhvKBHGUaf7n5crPHUlLNqegtdHHu31g%2FABFkvq2u5ff5hhe%2BHv6rflDoApZs6pR9bljAyOr8cRESJ3xDPVfKoB3teoKq1MKn3glNduTj22ASsKHCE%2FgpXo4n8%2BD&X-Amz-Signature=ec035979a1ffbcd28fa59b399f9ab526a95a6345b5733eabc9ef8d0f4d45e5d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XCOFEEK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQDLLyb0DIws27OkQVwCwQxI%2Bq%2FDaHE7TApX8wuLVo0u%2FQIhAPVEavWEfmeBytbVbn%2FGBUegCF4TXZvBBCniDQnrxP%2BEKv8DCAAQABoMNjM3NDIzMTgzODA1Igx5YB83BESZi0RAsRYq3AM9c0mK1n0qwFkZSpvD40%2FSm%2F5Y2P6NgjIHs6XZE0O4piqhKodxSpl2nt9z4nC5SyqrA0oei7UqScU5EGT1nxgoytw5%2BZQwEoMAkKAbopSNb%2FnJp29UONHY%2B%2Fsg38Rznakvnra7RN%2FUvzyA2o93h%2FCCuavYd3pmzzRQaYG502%2BXp52w9ZKjuGYZR3yBxHV08kXwWofX4UWKThzjCMtDhGqbQLeh7Qs7DWz2Ye79ijrqyqzTtu9gk1QK0Bk1%2BqQJLLjc8HWZFTtpiRtAXbwLIQdMyHVB3WB6pnWfs0o9cG7Amrs0Oty%2B67xPaNelX2rJhJEgqrQEYNSg2k3AsaSBPPi%2BAhznPzXx8PIzMQJ3WTLYq5i0n%2FzAl5Oa8iiJNyrDl2nShIPpPcBD81reXUgLqazgXGpG4idNlV2mJS9ts44wZ8BtzkrwhI0vLXv%2BM3xVviqSgztsB1OPWuMeNjG1QNpLr2prUvwhQ94Twd0jqn9MrDeYNuCX9rXInCuYz0ONXpW48DUuoAaUEa8p%2B5WKaWL2MfE8ut6b0ZWUhFLvK6ASLfrbdnBx6sacneOK5FbFcNc9YZIU7DbFxAmtTjs1xL8FhX%2BLc3BvKY%2BIZ%2B0gmJWI77weNQ5%2BsunpJblmKDDB4ZfLBjqkAYTauEa5sebznE4i1ohJLbd4VDQS%2BOWiOi4nQdXhO90LmXECVewnvxGQRU0%2Fo4zouYWL6P56B0u1h8hIWHN3fsl8oCAGw8J8fhvKBHGUaf7n5crPHUlLNqegtdHHu31g%2FABFkvq2u5ff5hhe%2BHv6rflDoApZs6pR9bljAyOr8cRESJ3xDPVfKoB3teoKq1MKn3glNduTj22ASsKHCE%2FgpXo4n8%2BD&X-Amz-Signature=ec035979a1ffbcd28fa59b399f9ab526a95a6345b5733eabc9ef8d0f4d45e5d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJP7NJJ3%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEd35RaD0thJ8EHiZDc7U1IIzOW%2FdxJKJ6X%2FEFI5RQ22AiBLTtKcQe8fia1WvJFmcHoKXlEqVG%2FrTGJ3sEKdMPag0Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMGWIgwBxBnUXO9MW8KtwDY0EEt3xWAUZmK976%2Bp%2BSzmPn7ppkCGBXBOKEpQ5npuNGMg4oAwN4uRe5nCabesQEiNMWEHP3IgfKWUdT442oeRiV9Yc7jXBW1%2BBMZjn%2BMI5XBSLU65JoYyAxtHWpD8ehUoUOIroAGwXWbNZQtQ3d7CbYzCbgHlcV2GQy2c4G1Z6D7yD4jqU9SWAKp9s6EmV8Qec5VNynfTEO%2BsS5pue7dn2Xt7bTIu7TsAqPxaZA44r4xLsj03zhEZQ%2BU7JDnBqby3%2Be0ZVhLjWlCzUdoojQJ3Qnwx%2BupjGEvtAXW3GicfHqUBZ3VCSIkgKCs75SWUQz6DYtQrl7Wqg6bfrPpjTHHbSTLG0CcwR4F0gnEK%2B6X2gstOYV%2B9Peft5o6EKnhUYC4WqhU68gMfzoN1zUd3qFYbgiScKR4TvKYp3gpRH6WtwQff0qw00%2B%2BpN6pH7oYej4AFF%2BOFxsm11GXKY1J5KQdhrYPuBE3jkElF%2B%2FPo1E20EXbWsHACB7NZEJYpd6aNlDqDI2BAJ%2Fq0t%2BuES%2BYG2vVwUhM%2FEd1Yi4xV9UYFUjnHdCUb6OvFNP%2Fjx00B8AOduOc%2F6xnrPpLPT1yFJzdCb543NEDHn7GX611wMdnXFJM%2FeATvElYMjs5%2BjD72Uw7vmXywY6pgE2sE2KwGhun4HojzkoQC4JS3FIT%2FCPcYjPesYuzQq57U13Zhab02an0GpeykFscjNvjdoFGtZC16MkFgPFeWGmeye%2BkTF2wn5BvzSAke3VHzhjY1qddyxdp9WE85KMUzDYqz4DJWlimuZvaq4tiQH4k8HdDFW%2FAf2yRLGJUSCRCXTF3zaMilqQv4lXhQ5xA1bpK5Q5DpJrSQUtOr04j9LLvlh91yUe&X-Amz-Signature=c2ce55066bb56229f10df35844b424368c678d6809e869300b85c43299305f3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NWB6DJU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCG749z%2F3lyxaFEwuB40fq9txfN15BbV%2FNVTr3wngtnzgIgXU%2BckEjnynoIY6NS%2Fbtf1ddakIz1yrcauH5DvUbWB0Mq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDDDXDIv%2F0vVEjj2ITCrcA7Xax4bpgOsy2ftN5QELjaAeekft73eoxH%2B3317u5rDJQotn%2F8TatwDPanzhmCj2ScC60eGu8AHKE356dzenaGTTDSpP2nLRha36SD0KQKidDo76mQ26c2BJ96eGhlceuMMidiqOc0ZmC3CToVybNolF%2FnE9swIYypGPaRpJqWldapUGqu3VRBagK1zMxuD7mU%2BsDh8pJjsUrMs785Jq06iXmDvwSdp0W2MPBjZghUmJwAXitUrq0yynYESWSkVUmM3elo3o%2FKDgfXLxKncJqySlcSiStkCpt61bV6MO9OvV3Wi1WRUsoLzsMRfoArFqQPna11By2%2FPFrDUZHsq2XcdC1IP1Sye7JOa%2B2n0zvmVdfDsUZa8ra7ua2zJsjU%2FqJ4%2FXjFwo84UuAaHLlqqwGSIiBjCvbX%2B%2B8AI5se38Oa9niom8DGBZ%2F0DBaAS%2BMTWrJjfIJUT0T%2B%2B4ysnUrDsDvBxfo1%2BCgEp7skqVr3IjqWog9u9sT497Vf3w6%2FLEwo01J2Mhfv%2BTITDEln6VPTamjU4%2BToTgunR7sJ%2BQB1hR5UCHo6XciM8cTHnfn0Ps5NL8dBV3YP1GtBgCeSGhzlPjA6hyrW9BPT90GaDo6zOsJLTBPcwTGZvTb0vYlBOtMLLhl8sGOqUBtI3fuFvOWFlOl28q5hb2%2B%2Ff%2BEuNA2%2F1%2BkeY4hCqlL9D%2Bg8StDLNpcie0AzoWtbq9jgqJmdt9fB%2BliraGSf1SIy8AxwsaevfvJ%2BfPUXZ0z6ecUuGGfc1xddEZeiMHnbjlY4CbOYR0o1RThYxMiGUCKNG4lSkR1vWx3UYYehwCgY8QJdasxz8YGfP8ghNhM5uOz5L1aZjpvlgFjRozWliVzKtXAAji&X-Amz-Signature=dfecb60e5f9a7067e1f282d89cc002ca829e9aa9c33b3d6c20cc5d515b8cbf1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NWB6DJU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCG749z%2F3lyxaFEwuB40fq9txfN15BbV%2FNVTr3wngtnzgIgXU%2BckEjnynoIY6NS%2Fbtf1ddakIz1yrcauH5DvUbWB0Mq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDDDXDIv%2F0vVEjj2ITCrcA7Xax4bpgOsy2ftN5QELjaAeekft73eoxH%2B3317u5rDJQotn%2F8TatwDPanzhmCj2ScC60eGu8AHKE356dzenaGTTDSpP2nLRha36SD0KQKidDo76mQ26c2BJ96eGhlceuMMidiqOc0ZmC3CToVybNolF%2FnE9swIYypGPaRpJqWldapUGqu3VRBagK1zMxuD7mU%2BsDh8pJjsUrMs785Jq06iXmDvwSdp0W2MPBjZghUmJwAXitUrq0yynYESWSkVUmM3elo3o%2FKDgfXLxKncJqySlcSiStkCpt61bV6MO9OvV3Wi1WRUsoLzsMRfoArFqQPna11By2%2FPFrDUZHsq2XcdC1IP1Sye7JOa%2B2n0zvmVdfDsUZa8ra7ua2zJsjU%2FqJ4%2FXjFwo84UuAaHLlqqwGSIiBjCvbX%2B%2B8AI5se38Oa9niom8DGBZ%2F0DBaAS%2BMTWrJjfIJUT0T%2B%2B4ysnUrDsDvBxfo1%2BCgEp7skqVr3IjqWog9u9sT497Vf3w6%2FLEwo01J2Mhfv%2BTITDEln6VPTamjU4%2BToTgunR7sJ%2BQB1hR5UCHo6XciM8cTHnfn0Ps5NL8dBV3YP1GtBgCeSGhzlPjA6hyrW9BPT90GaDo6zOsJLTBPcwTGZvTb0vYlBOtMLLhl8sGOqUBtI3fuFvOWFlOl28q5hb2%2B%2Ff%2BEuNA2%2F1%2BkeY4hCqlL9D%2Bg8StDLNpcie0AzoWtbq9jgqJmdt9fB%2BliraGSf1SIy8AxwsaevfvJ%2BfPUXZ0z6ecUuGGfc1xddEZeiMHnbjlY4CbOYR0o1RThYxMiGUCKNG4lSkR1vWx3UYYehwCgY8QJdasxz8YGfP8ghNhM5uOz5L1aZjpvlgFjRozWliVzKtXAAji&X-Amz-Signature=ae88ea3cf4db260165fbd85784f2d9e1f69c8cce92db15857549eba6641f9f7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NKZUK5D%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIHzleUVS9RiT3b6625fV8G0ghSPc0qt6oioBzyIJ8%2FUVAiBBJzof%2B120zvQ3X9YIsDBnjDVTaWXk5vLVD9u5e0nbvCr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMj%2F5ZsPEUJJaHf6cWKtwDSMM6GhxeQz5ucdW95%2BuBTCBQUnu7DDKl5xwNWwzw%2FIAt%2F03iDMECDRBFaEFe%2FP7hWKaOtw%2BtJCFCqDPUerYxXZDKzHS3mVZuPgoQD6fJbYzEicrv6qbHTjG1Llp0Vbkbyr9sNalpf2Kf9lqzXVzX%2BPMCN9hSvRv9lABnP2TsjARfzlm57GBllUdtPGntiGieDjsvpb909RjE4Zls8GUtBWvEnwYPilipcTsd7ftIvPUehvHgw68YCkaHcVoufvfHuTwo74cNHhlV9%2Ff4WbhyHWWePTHD19Y60BojkD1HJHA4GqwmLC95tvPv4FzjRrA4RJZ0VLOMItVP6be3qS2OGxbG%2BRo7hqm49VGhQ81xMkf5dEfR6qFsVmnrhlp1yOK48sUbxXH%2FKvekWXCt%2FWA2of6L2JeNj0BcxmYC1tyb7fTGVNLU5JqkwLJbkfwddfe3EBWl1U%2B40IEAFV9W3AQk%2BF0zkFCuSvc58lrJSX%2FHpUKkMPu3qaNKOlvDa%2FYRL13g7trrBkQJQ%2FEKqloWAsI3pxD4Q%2FRuTemAMHbuQsvySeK80XSgthKN8bNPxcZwk0Xqii3R8JUv0fFW%2Fas7VKuSz1MwnEyPuHwkfKhDezg%2FBloQHe0GCwhl8dKPzz0wmOGXywY6pgGg9Q1xDfthGHXkug5BGCS7LSx7%2F3zGVQdREElqJW%2Fdh7E%2FLxHL5uURzgiSYppbi0YSvzZWPkmrZb2y1ZBsxrw0b5PmlMqD6lFxN4B4MV6LhVBXDP2wgW1Xr0i9ENPl6Qj3zLqgPAQ9oa%2B2pjfuVQ9mUQg%2FSqPpR4lCbuCLGdQRfeG2M49Fxd0IUvFsFoxtcaXSiIp8yvmndqMNZGinuZ5itbFSt4uK&X-Amz-Signature=a036f4614380c3bb90b691b51e6e560acbbb2a07cf1c3d1041eb0e8c8becf984&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIYBRSFI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIGkW6Mp8Ti5v4fk9auYp1%2FkzFfny0bteHwiw94PdOmgPAiEAluUozKO1UtFSAxejCc9OG6gJj%2BRED39m6zgkmgDytGMq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDCNoi8eifNw0mvmwJCrcA8oXLad8tzCltMFUI%2Bu964XX36A3N33iv%2BOy4ax%2BmfuK%2BQk%2BQ%2FUOW36EquzXX1d8sFp%2BuUgrWBxyf1daC41aQYrFHk%2FTb0%2B7PraggvlmliIZgeqiszps9ZH1DUS5jbX8%2B81SP0TRN4zhSjFCM%2B8fTXmXpYiyhGQGua6d%2FlDZ0IQazATxBdlbYCUHJsX68SP2cUcMN%2FDL2EJuGdYXxjNJH8fxbCMn3GqHRinsdQ68ij0jCLCcuES%2BJCR1POaXdEyLIkrImPKLVcD8Vt4amQnSnyyJtJ2ZdB145Jk1aHSwZDn6ACOyT%2FKeMTdEjsJHR3OHaFHBdxLAnuCw6VBepiUcCe4dGneBujtmJahCnDeU114YBiXfuKzJ98%2FJNAuj%2BuRoC3S67OwxPUmFzZ6jAYw8yBaNCmBSaEDtQ8C0StygX5NBZBNkfVC%2BOF6QJ2z7fBw6KbPtyiqrJhjH%2FHgkLdtGRh%2FkJYoeb326bYWV9dlWQhAuUQdRgHtIRX6%2FpEn5zh%2F8w0BP6g3RuVkxNNL6lRqub3uREsy3upwcUqJdCpiZpjQRQQXDOudgXDk0My2YE%2FGVkx6Bnd9W%2BZCn8gE3sTrXNiy5o5IvTFHmreOXR1tk0tTCunqROK508iJyDSHYMLLhl8sGOqUBf%2FAqjsZIOFlSlUKdkhbM%2FqFjsqyC7zH7P%2B7BQzJSpRNiN%2BP%2FafARUfgHQmdd4vz%2Fd1WM7CazU8NHN%2Bf0P4mx5t%2BJgYzaR3ltosQ0ux62y6NpBI8C4JqNNcHkJKBsFi44B8lUEtkY4Fii1S2%2F%2FyDeKfnrpTIVnWOCycL2Ik26GtzDoPgnskL4IbfJnBw7P4mrfmQZfLdrFMSzgUHzq%2BPMNajzGLL9&X-Amz-Signature=b9849cb07abae6f7b7c8dc81e0d32054b1a19363544dda62b9ede466c2632997&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LO5Z3WB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIBy5tM0Rhjrs%2BJnwtOOjCPfBxWcYdW%2FfcoLwcyrVjD5PAiEAnLR5yKmLRBG%2BpOHiym4wOt%2BkwJMSC69PN3vg09saEcMq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDP%2BJUTc1OujF6eeT4SrcAxLmZgy6%2B5u6QajORP%2Fufv4DYnTy3HgDjqvcl71ytS%2FmO47Y4IauqvEw9GFC7g1quczzD%2FfmCRzyCjJ5%2BfIfQCcaSxl9zs1pT%2FZefAIhduOK45sBjay0jScNnH%2BgM1KX2HrivPQoSxf8U6e9yjXh%2F60%2Bh01DkKl%2BYCWCP6kIOKvl5KU2ImeH2E%2FrqqWM06Er10FzL5E6mosOLSi1Yt%2FYxePDo8LgVy8UYiLCMCKL6TbVyJ%2BqJUnxbVGY1r0ztiAwbbk9X54EW7qcj22LEwR5cH%2FvUVevJm7yCYPuLsjgFm%2Brl8qxKw8YrBTVOYzmbCndN3KVIwXH2hKKQLq5IV1SrzZqgFvdF%2BZ9VgwlSPE8C3i6WfHbeglXeoY5%2BfMdtGJI57ZNe82h3Sr%2F5eItB58dX3Tz5ZtmyaLwureA2%2FPFsOCxnppZoxc%2FPiVXdpvfncRhacoUAGypqBPQvQw8BjRSOs9EYaoZCBEN81E28QZhw0XklOvyVQ31oPxJ2Ct8ij2xxL79bmZ5mXu2Aa4QNNU9Od17VxYvFJ81ThkuiPJHsKCwro6vXdtorbZo0hbFUCqX6EQNM5dDRoN7oUeOdRqiXTk7WNSoiSatA6fm9JTm1L%2BbLVgjbfNAxMy6ccLkMLvgl8sGOqUB5wRl%2By4XBQgvjgeA4qWI6%2FcsTqG2t8gcl6YpcVPgC8MQlZFmDjJ7nf3QRU0lmDvTbRV%2Fgmk3O6lAALoshNDTZCpP07aAQ5g7GEYI6WHMPxrIOnAWE3avSCKqnZDsT9t8inKNHSwGXccrTES39j5BKGopIIdFV4wYgVb0tGUTMFNNNum0ITP1N0yvDeBm7d1u9FYyzANg%2BwMvOqtp0HI21fS3e%2BQh&X-Amz-Signature=f4232fcc9456e097bf0c3d136c9695cfef100c18cdb5ff2b1104a5001339f3d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XJL2JS6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIChckq1FztXmOEi5xBL3kHWoHm79JosVO8X5jsCjRKZ3AiASRO1N9FH8Vwspm9rhd4eVvG42smt9idFlghDQXWPPoir%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMCLIJ7rrIZKtl0OH%2BKtwDOEV1HZlBUW%2FlNlesQfrjaMlsbPHQxt5Raz4JfCA9UyxGPzacSOcjLCxRcP5Jkkprct9C06BvPJqoz%2FmjKXCFMTSwLoSgnpWSGnHs8Gkb%2BYZkovTH%2BwAjnRJVKk7FkiFdsQXvxEuomy%2BFOU9jtmFABgmEDCdmzcYwuyrQPH%2BaEnvax1DILpECD4%2B0EfhIln97uYrtuZHvAMDhhrMqv%2BDUF6OykRZiWSO5o%2B6YKBs%2FmkaXTdRtDmEAirLIA0b9PM5Dn25dg3mOUT62wqN%2BF5p6eG3cLvznodfx1Wo8XYLKSsADdE4Ahd261FzSGk48XBzz5TIhl847wIXFgL74y9duabpElm5Cd%2B3QKWn7TA9GjzM9SX2bZMUZn9IslUHr%2FNAYqNf%2FQhBvU9jXj98h5j89TSHOYBvQQFjTXcUhluaFSZXVps%2FXfvyyoN%2FjK%2FFIdSU6MBNBnHsuCq4Bom1pCSnsrURBQxnAekjl%2Bpeqfv3x7qk7S2104%2BdIXE23RJjHH84Q8Y4hGn2BFJjPrGIND3TGVMYGhkfsAds6RoK%2BacJ02O6ZzjLkkCXouYNLq73dPWZn0AWa9lngqG06Cacc66GAzBNd66YIS4s5J4XLo90%2B6wyjojJVRy7PXDuJdecw9eCXywY6pgEGgGXeYMXzgNgqYRpCNFz9%2Bu%2FH%2Bg46GAgIIRBCYWTLfu632%2Bhco3xdqSQG5uV9NMHs3OiKcqeiDO6TK0Cpn1LgLikPPS%2FlC8KzCP%2BvjtH7QKLBhROX6RNWMbNOMySwJxT%2BoufQwVvrvANrzRDo2s58zTKFVnLfmht1Vj3Vi1OzPovDwlmOOK0Mf1uVcOld83vZd4tC0M9yeqHX%2F1E11j7J7nDsEXlU&X-Amz-Signature=b8d8c289cfef874fe499ed190b5b96f731bbb9e6354f490b6a0b6304fedd7b7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XJL2JS6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIChckq1FztXmOEi5xBL3kHWoHm79JosVO8X5jsCjRKZ3AiASRO1N9FH8Vwspm9rhd4eVvG42smt9idFlghDQXWPPoir%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMCLIJ7rrIZKtl0OH%2BKtwDOEV1HZlBUW%2FlNlesQfrjaMlsbPHQxt5Raz4JfCA9UyxGPzacSOcjLCxRcP5Jkkprct9C06BvPJqoz%2FmjKXCFMTSwLoSgnpWSGnHs8Gkb%2BYZkovTH%2BwAjnRJVKk7FkiFdsQXvxEuomy%2BFOU9jtmFABgmEDCdmzcYwuyrQPH%2BaEnvax1DILpECD4%2B0EfhIln97uYrtuZHvAMDhhrMqv%2BDUF6OykRZiWSO5o%2B6YKBs%2FmkaXTdRtDmEAirLIA0b9PM5Dn25dg3mOUT62wqN%2BF5p6eG3cLvznodfx1Wo8XYLKSsADdE4Ahd261FzSGk48XBzz5TIhl847wIXFgL74y9duabpElm5Cd%2B3QKWn7TA9GjzM9SX2bZMUZn9IslUHr%2FNAYqNf%2FQhBvU9jXj98h5j89TSHOYBvQQFjTXcUhluaFSZXVps%2FXfvyyoN%2FjK%2FFIdSU6MBNBnHsuCq4Bom1pCSnsrURBQxnAekjl%2Bpeqfv3x7qk7S2104%2BdIXE23RJjHH84Q8Y4hGn2BFJjPrGIND3TGVMYGhkfsAds6RoK%2BacJ02O6ZzjLkkCXouYNLq73dPWZn0AWa9lngqG06Cacc66GAzBNd66YIS4s5J4XLo90%2B6wyjojJVRy7PXDuJdecw9eCXywY6pgEGgGXeYMXzgNgqYRpCNFz9%2Bu%2FH%2Bg46GAgIIRBCYWTLfu632%2Bhco3xdqSQG5uV9NMHs3OiKcqeiDO6TK0Cpn1LgLikPPS%2FlC8KzCP%2BvjtH7QKLBhROX6RNWMbNOMySwJxT%2BoufQwVvrvANrzRDo2s58zTKFVnLfmht1Vj3Vi1OzPovDwlmOOK0Mf1uVcOld83vZd4tC0M9yeqHX%2F1E11j7J7nDsEXlU&X-Amz-Signature=724abd4b233bcc269a0f293243248a7b434471929a98f8480cc241f2a706f28f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3O6SNBO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIE19wO1cqhHT%2B7TGPRwW1C9lFpAhHa923i1AAFXfOpmWAiBVr%2F1oXtL8KEPeHNWtSZI4ZOu3HXUYFjcFa4Jr9VrBZSr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMIiNUIoqwvkbqza55KtwDEFYIGa%2FcwtPTb9%2Bgpg%2F8YArhvI%2F59%2Fskogs%2BZRh0WUrlu%2BbnqQa3j6C86xOC2%2FnpkXbMGz8oXp%2FAVKaPXzXJimyTptEWu3QrZjsP3BZp5HhKfGruYoIZaIVTI0LCpeHqcDYCSh4n0S5CkU6bvcKTZf625zkHMSGoT08NArva%2Fualjoe3Vt771OG1ZZ4DaRcTE9bIwcsKwAFnWwTfTyFYELYIgnTi2yvb%2BFlkyx%2FGoeqx2ibWaQpA8ykUgZskXSMSXavW4iY2cnBQCxsbEH%2FzEQmd4ZjJ7vGIaz7qJpJ0zgxOclTASi5CzFHdRrzc8mQazWdPGdG4K6pzPEMUEqKmdrML4wPXcTnnFVQAU8pBlu9Eo%2BP02hixU8wCd7yFynR9WpwZ7cFoZYGQ%2Bj0oJB1Lkiem99SKSPBq20CMaDYhTUiRcjtj0%2FTcVjAF9Vw7pZXW2QVO35jP0fdIyXhW4uiamJH3hv8c8H3hRBg34XykD5x8g7mvGe5nwHJKAZ3RT1%2F19xjzd0v205EhzNCgaDf9fVpyKx3MY28GYlTrBxjqyTC0fY5hAQrTDGaL7N6rQSIiz9AUff%2FN5orfLCwmscGFGC9cNWPrUhq2FHMTEHM08ym3EyDtHpMEKzZUrrowu%2BCXywY6pgGnszKleYhGIBdjgQvBlWke%2BlrZmFbS4XtVVTDA3g%2BBQmVXyXWXqO7Smm3L7piLveV40DAIXZX5Q%2Bu%2BvN41bK%2Bs4%2BR2Gzg2F%2B06oivOn1mNtr%2BmaVPz7MrBRpBzwI8mOFzs3LDxF0WCoCncTY1vGm6efhtEk6FdPZUAuyybAdQMHfL4WOCh%2F3Diy4AKZ2YiT7BNjoGb9%2FqK6FttmDF8OzFSbjw%2FTlIr&X-Amz-Signature=4c35ff5f9936c43a55a3cb47a75c476ac41046a054a8f455612cf7ded9a34b49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BQ56NYY%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIA2SUvnW5SliDgnEaNSbin9zMJdmWXoy49RbtjNChLC2AiAef3LxMlQVF34inJIl3smIP8qR14j6SftSNaOsd9v1SCr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMZ4%2Bi8X7rlCohYoRLKtwDMR%2FFba%2BC4twvIY7QOMeBDw%2FYdyZ5tNCRdG5nDUn31NCk7eWgt31Pd4d7AVHOD0cSLb4sjwBlftjgLrHun1q1yk76u%2BpaPeLFMwtizO46SoyIMF9sPanP%2BUAlvPp56ueH9SiZ7cEO2lJpq7Od%2B%2B7veUtwu53Hp9AILw56DEfbUEB2OGJjTUlb8LzKApJhCJMfvnVq23s7Z04CmrcTHex4Q5fbjfz%2ByMjULPY9iKyL37CZJNQCl5hx2bzWBXsejFQT%2F4dM7sUqgy0PprWMN9%2FRGhHImeq%2FfgynJ%2F0kjDf%2Faet0FEtfAFcwm0fUajKg%2B%2Fn%2FH%2BGMiixZwEz%2BoLBxys7AJB73QgfXwJhwZup%2FkKG7I1mbFYfrUh3xYsTwYzymvkBHb62gLuvNOj6kZwWbMF05YjYoFtZM995zOM1x5z4PZnnjoR2klZOxKjkA2VZa4l2t1nQBAzia4K1CJr%2BlQwgoFFm77uZ8YAWWOpe9sWdy45kqbEukiVUWLz1D4bdYCo2bggcVg%2B%2FhMmrgHINSCR1se2UBLAv0Y5ql1TeR%2BLSCAtPbFLO3WVi6SWGfhqB23L5cDoPGxUwbfe%2F7UGHqQUrIgisyZApL5YmKweBVFSX09J6M366jRhtBq2c6%2F88wreGXywY6pgF2v4khHqJgVBX%2FiV7qE2kCPTfzWskFK6x9GUfpG12t1m8P0MlTRQg7nhenXtbT1Nv4LNm5Dppk8EUHvaiGhdc%2BXruYA1xxGTVdaipaV25ueERZpAiKPFWmwSx79h9FcUA%2FmrvdkKRkdpvADjXxujE8hg3KRfG9Fjbma8Gm9RqAgxU%2FLShXnC%2FJKDXF8lJwZ4BHEt6dqjhaciuFhCtGFoD%2FYUCKoqo%2B&X-Amz-Signature=2cad084b9952ac2d8ee6b2c9f5a9f4dde052ff92ef6838ad01e08e72605afb49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BQ56NYY%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIA2SUvnW5SliDgnEaNSbin9zMJdmWXoy49RbtjNChLC2AiAef3LxMlQVF34inJIl3smIP8qR14j6SftSNaOsd9v1SCr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMZ4%2Bi8X7rlCohYoRLKtwDMR%2FFba%2BC4twvIY7QOMeBDw%2FYdyZ5tNCRdG5nDUn31NCk7eWgt31Pd4d7AVHOD0cSLb4sjwBlftjgLrHun1q1yk76u%2BpaPeLFMwtizO46SoyIMF9sPanP%2BUAlvPp56ueH9SiZ7cEO2lJpq7Od%2B%2B7veUtwu53Hp9AILw56DEfbUEB2OGJjTUlb8LzKApJhCJMfvnVq23s7Z04CmrcTHex4Q5fbjfz%2ByMjULPY9iKyL37CZJNQCl5hx2bzWBXsejFQT%2F4dM7sUqgy0PprWMN9%2FRGhHImeq%2FfgynJ%2F0kjDf%2Faet0FEtfAFcwm0fUajKg%2B%2Fn%2FH%2BGMiixZwEz%2BoLBxys7AJB73QgfXwJhwZup%2FkKG7I1mbFYfrUh3xYsTwYzymvkBHb62gLuvNOj6kZwWbMF05YjYoFtZM995zOM1x5z4PZnnjoR2klZOxKjkA2VZa4l2t1nQBAzia4K1CJr%2BlQwgoFFm77uZ8YAWWOpe9sWdy45kqbEukiVUWLz1D4bdYCo2bggcVg%2B%2FhMmrgHINSCR1se2UBLAv0Y5ql1TeR%2BLSCAtPbFLO3WVi6SWGfhqB23L5cDoPGxUwbfe%2F7UGHqQUrIgisyZApL5YmKweBVFSX09J6M366jRhtBq2c6%2F88wreGXywY6pgF2v4khHqJgVBX%2FiV7qE2kCPTfzWskFK6x9GUfpG12t1m8P0MlTRQg7nhenXtbT1Nv4LNm5Dppk8EUHvaiGhdc%2BXruYA1xxGTVdaipaV25ueERZpAiKPFWmwSx79h9FcUA%2FmrvdkKRkdpvADjXxujE8hg3KRfG9Fjbma8Gm9RqAgxU%2FLShXnC%2FJKDXF8lJwZ4BHEt6dqjhaciuFhCtGFoD%2FYUCKoqo%2B&X-Amz-Signature=2cad084b9952ac2d8ee6b2c9f5a9f4dde052ff92ef6838ad01e08e72605afb49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIRTUNKJ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T081437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDTb0Ft8KhDstjfhXLqnPtUp%2FdGSXzg1ErfOdZANeYmvgIgU8uodLhC9acXlU5HuHDq5VMPu79GiVvPE9aYYSgPUhYq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDHh3pReC59sfCIWM2ircA7AwjIFvHYIXh47tbloMsJimmYKWyMWAWTzcSRCrsiLJkVA0bl6IFjvE%2FbE%2BVq4NOG7hvo0w77LBzL1kIsCMK1%2BNBz3OAMLJgT3b541mPnLla2mJOtgq4eO5h7pA6OKQW%2BN0P7l18XFgl%2B4GYrJMqMs53FSm5HHUvfhxPg2tzvvRzl%2F4QlJCjgeIQuv%2B3HB1m10EgODIs7Y7ZAlLIDxBjncfO2tcj2aIJhPkh%2F%2B9pvsWJLtBWBidTeFEEEZwPmTziwYzh%2FHg4ps3FgmUW0ZC7cWtQJrOlT2h53ZrWOQTzgz9BIdOrzPzG2f15Dq1DmKxyRD40Ms9zdaTDooViXZY1ueYArVYDutttM4LnFjjTigUXbIbEs9LFtb9LDi6TZtWHsmHouVxrZQ7vaDT0hTDM4eLzOqmxsAj1UjxvXLwveMAGfXBFIqNphgeYt18wAIx0uEBrMtcNE4gIcOuw74Eaj444%2Bkc7X1%2BS5d%2BxI5HnvXrBiDt8fRBhpGkEhykpq38LoGwVPbgM8cnAQpRlNPzcZAztyqoFDOyB6dViBnuNU5YPUSq3Df%2FSeGK%2BSLlH9f0W6D%2Fx%2FCmNBCQ6Fegd4Zzqco%2FO9N%2BC389LwRE3U0bpLD0dt55ttqQgJAANvgOMJz9l8sGOqUBNkuPjM0LQoku%2B8V%2BqvcTw9CCGLZdCfaK4kZDk%2BZzQxzZ0eqy8lTzn0TqbZehXiEJ63rcnXfyvoFfj5mPwXoPc1HKJbpgRcwOsYaoGgjX8fqDlFb4vd8dJzL38VurgFvSIFih1p0w3pua3n4geKTUEQ%2B2bThmxKjK9G86v2kvvd9jQx01VDCf3JzFQFGUC51m%2BnlblkBsY3KtFoueJD4DDZDZyo3c&X-Amz-Signature=6424ded3cd26db6cb24021bdedb6e4ea56d83044cd34e95ea0f1200dc7cace7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

