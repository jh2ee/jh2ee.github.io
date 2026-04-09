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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGECPJJ7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCFPwmjSMubxiLRT%2B1yWswj70QwIzVmjmAv3PbRy7wnPQIhAOMdA0iYLcLRhvRNsxuMZjBhLr3pof1jugpOnRb1EIPJKv8DCBoQABoMNjM3NDIzMTgzODA1IgyCnRmi2GtGXqkTnmgq3AMY0VX5m%2BYJgXIfccWXeIBrj9pybhl7Byv9EdA670F7BmkIWrRC%2BWcCevkXyqqZi6oeCzlWwnl3oShw06LCRghfiXJA%2FwSBJKUt8WFqrrcq61ua9O2cG1SZEvPC4e7ICaD%2FKhGt%2FLmKfyua9ElWtvPjR3yNtmYOoabes3Dv79E%2BvZD6sHnfnmre0PO3DIb4h2x6YTTIo4qrVmoD0QnaEOWDsDk1%2BrYAGNL%2BGAkpWUp%2FOGSIsVdHiqWr12x3gQwPqF4wB5RPvuwIyHc5leck%2FlATdBMLCwKCeiGb1HHTxXDYV3iNKnV2dnUeBdgIqbVpXIaEXS9lq5fWDgG0D%2FyGGPW1TNqzYw0enNfAe0L9EPTANnOATVNIA7xiYAa93gvws56OC2l%2FAXJEv6tJ0pICGKMpZYfM4RqhMue%2B%2F10Va3mXvMB5ko3ONy5egfvldk72nAPMPLRxvUMFbgBxyPejnYMJghFWVMPXNLBE8JUwOiBOJ64t8mjiTvFkNG6SeFWgGB7IJafn%2BUeCRqZaE%2FK9lRvh9bX375EJJkM95xhWsMcpH6Rm7p9golXDLY4pcvQB%2B1PMvHe0OGkHg23lxbk8Tt6gRvo1%2F6dF2W9vPd3ZSoPCsov861v%2BxftriNfRDzDjuN%2FOBjqkAVhk5n1V%2Bhr5OhDA8fFDZX%2FomLzA2Duem3pN61bcaklqyOhgAiLd6mSBBQEYoM8dOnTufKZbGfFX9z6HyiRkQpy9uR%2F2rPjxLTQF6UFNhS2On5mVvH4BJBWxUEeMhvxUrkODtZXm2FHZTW%2FHXFHP6681OheZJshAnw6DDXIvpp29dFLgu260EBMFhOknjmZ0%2BleHhyDlUr0saH1r5NQlLQyRGpaj&X-Amz-Signature=4de211870ec108b4b737fbbb28e28c81cce92386e365b74945db43bebb4d01d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGECPJJ7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCFPwmjSMubxiLRT%2B1yWswj70QwIzVmjmAv3PbRy7wnPQIhAOMdA0iYLcLRhvRNsxuMZjBhLr3pof1jugpOnRb1EIPJKv8DCBoQABoMNjM3NDIzMTgzODA1IgyCnRmi2GtGXqkTnmgq3AMY0VX5m%2BYJgXIfccWXeIBrj9pybhl7Byv9EdA670F7BmkIWrRC%2BWcCevkXyqqZi6oeCzlWwnl3oShw06LCRghfiXJA%2FwSBJKUt8WFqrrcq61ua9O2cG1SZEvPC4e7ICaD%2FKhGt%2FLmKfyua9ElWtvPjR3yNtmYOoabes3Dv79E%2BvZD6sHnfnmre0PO3DIb4h2x6YTTIo4qrVmoD0QnaEOWDsDk1%2BrYAGNL%2BGAkpWUp%2FOGSIsVdHiqWr12x3gQwPqF4wB5RPvuwIyHc5leck%2FlATdBMLCwKCeiGb1HHTxXDYV3iNKnV2dnUeBdgIqbVpXIaEXS9lq5fWDgG0D%2FyGGPW1TNqzYw0enNfAe0L9EPTANnOATVNIA7xiYAa93gvws56OC2l%2FAXJEv6tJ0pICGKMpZYfM4RqhMue%2B%2F10Va3mXvMB5ko3ONy5egfvldk72nAPMPLRxvUMFbgBxyPejnYMJghFWVMPXNLBE8JUwOiBOJ64t8mjiTvFkNG6SeFWgGB7IJafn%2BUeCRqZaE%2FK9lRvh9bX375EJJkM95xhWsMcpH6Rm7p9golXDLY4pcvQB%2B1PMvHe0OGkHg23lxbk8Tt6gRvo1%2F6dF2W9vPd3ZSoPCsov861v%2BxftriNfRDzDjuN%2FOBjqkAVhk5n1V%2Bhr5OhDA8fFDZX%2FomLzA2Duem3pN61bcaklqyOhgAiLd6mSBBQEYoM8dOnTufKZbGfFX9z6HyiRkQpy9uR%2F2rPjxLTQF6UFNhS2On5mVvH4BJBWxUEeMhvxUrkODtZXm2FHZTW%2FHXFHP6681OheZJshAnw6DDXIvpp29dFLgu260EBMFhOknjmZ0%2BleHhyDlUr0saH1r5NQlLQyRGpaj&X-Amz-Signature=4de211870ec108b4b737fbbb28e28c81cce92386e365b74945db43bebb4d01d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5O6ZVQ5%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQCcUNOzWv9xZ3IMq%2FSetvhWAx1se%2FGPmahFbkgxOFjU2QIhAKwhB8gmZpxPaG0ZtokGnlnhioao%2FwwlcnROExDqFZ5HKv8DCBsQABoMNjM3NDIzMTgzODA1IgxzXCLnwjUViyv3YyAq3APFlEkM90RqAWa23XJmECl2%2BVGW7O46MBTLFijEpnSBDk%2B3lcD6B8kZvbv7bCmK0eSi5E2%2FEn7XF2qfOrtjAyan3WdW11GpPGoxmnjERhNBx2rPHbYVbDso9%2BjsMkKfQg3xACnFLSPn9ZC4OFbW%2BrxOgnvmONFjEQ8jjrULos%2BiQ%2B5upc9t5FfUk%2BAChoPyErkh4FueMFHO6o8nzFr0XLBpMANdWUlAsnRbeki%2B%2FJqr6S5GNd7NSa6j4mzxbY4hd1am7kqsT0VWjmv6dXEm2m0Gft6cJ2PzQVKbHaf3fmljXQM5xmiPGa44u87WvbMl%2Frkt24uDas0ml9bovXqR9XQauVX5YIETPPRpQmgkROo8Ai4PgXov6UszDx66yPALMLiRMd5WxNxFfG9qDXQ94Um7y3HCKmVkDAJtAZ27twNEubOrz9g1EkcCSrKLN8sWSSyqMQAeoR5DcDr90ckZJvASnXlEJpBJbd7wgbD2d23bwE%2BMb6rBKsy7GXHw7wv4EJpzw%2BmKNh%2FZI7HzoTldUz9ZrdA0Y4LQNQRTRHr7b6ipGaKRVPgEyfu%2BxoB7jBN4MZn4TgyxWQU1nlaBIv6Wvci7cKTiH1GaX7FVsoZm7BU6Q5akrNG%2BPIryR17A5jDVwd%2FOBjqkAbC6r36HpEuTw0Ga8uL0bKkYHX77iUxRzcT69Qzr2gVOFzGDCYDssaLPUONVQwclFgFLdOOO9QUohX4doO5WV1Z0AeN8uNKcC7UP4NIKNMYrqviD2l4541LvWBEtCZ7NQvOG3iMP5yQFx166GhWuKTfpE%2BsOdZiBd0OYDG3psVLBMsMx7DiZNjcsidw1a%2BbZvH9Vnz4e5y9Wfc0QFDZ2FKdjrCyJ&X-Amz-Signature=9512659e734234e284ca07d22338ee4a059100a93dea8f5480df7ee415c47552&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBPHGGSL%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQD%2B80nbVQg5qaSVGwZgPHEUhD9l49Kyqq%2B9q94%2BVpwT4QIhAJaYPvnPsp5uqRSAM22CEMcZ7xLhyvDo47A%2B4jwp9oBOKv8DCBoQABoMNjM3NDIzMTgzODA1Igy3yMGoF4HUXnlwvaoq3APMmN7kyMQO9V9yPGRqLmACbS1EaJ%2BoHPQ0nkaFAAHavieAkG944Fukv6zBYpSp6xTjebq1Yepoo9a5mJ9dCyUzJPS778UlcY1TJZhPQZCQpvMAywI3B7MrFKHnfmxHtA5cm8DBot6MzpbtxEah7LI0mwJyod3GxIyCL53TSdKcqBX4tpmLSo0Al4NzzwYgE0AXPAJ%2Bh1Dyp5DpdauKEVokcPZQJttgwJiYbQ36ktbOx4rjmiGrG5Xk4s4EMxTxc0CYgqIyaTrMGLBR7ZU0ByL7ihZIs8hFFpgSJy%2FXBLVgeAumud4ffG%2Bt4pZfMjakMjyy4%2B5mNTGnRQOr60HGfBOOhEObYS7rXncOAIxNf5FmEKRuaS33OurdMDHNINKC6bOMSlJRTWci6Ltx1DbjB1nyW47zxI2YFfQ3BRR%2BATyKcPRZulKRl%2F%2B3q7%2BQrHPSWn17CbT%2BwBv1GKyfN%2FesuSHJ63ZTsPlJWhcBkS%2F%2Fg%2BSQ3zww2mznv%2F%2FBwnCMa38FfwIuppkZvM0a9SKzVhOAJrAEdERKJToeHcwUzcNMtPHx9nC58hSGkFQ4COA5tfbcNxBxHY5HfnPx6isbgnv3tKm3zzC2KYjQs8BUlIyTsHvI86p0qsKNZ8pS0q83%2BjCVut%2FOBjqkAW4P7DQhFO7AJjmeGWjmxMcGcfn%2F1IcJkg%2Bqcz%2BAxrj5zocvTKGtGFSPzb%2FmGhvbXeOWfl0KOvO40gr%2FbKj4fJNzhMhBQLGbhkuil6DLmRAZRhLkl2flVBjxOs2q%2BRnwJvwG%2B4kJxSUwmn8oGJVaW%2B%2F4ywh3YI7bN3XP0oGqZMhBxGeTNSU2t9EX62PLpudBrEUsxGA770QSXx0AilIyajCniGvd&X-Amz-Signature=4a9439f020fa36abfec605ee95c875d0d545d7227a4b649cbd1a9f8c5a3aa826&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBPHGGSL%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQD%2B80nbVQg5qaSVGwZgPHEUhD9l49Kyqq%2B9q94%2BVpwT4QIhAJaYPvnPsp5uqRSAM22CEMcZ7xLhyvDo47A%2B4jwp9oBOKv8DCBoQABoMNjM3NDIzMTgzODA1Igy3yMGoF4HUXnlwvaoq3APMmN7kyMQO9V9yPGRqLmACbS1EaJ%2BoHPQ0nkaFAAHavieAkG944Fukv6zBYpSp6xTjebq1Yepoo9a5mJ9dCyUzJPS778UlcY1TJZhPQZCQpvMAywI3B7MrFKHnfmxHtA5cm8DBot6MzpbtxEah7LI0mwJyod3GxIyCL53TSdKcqBX4tpmLSo0Al4NzzwYgE0AXPAJ%2Bh1Dyp5DpdauKEVokcPZQJttgwJiYbQ36ktbOx4rjmiGrG5Xk4s4EMxTxc0CYgqIyaTrMGLBR7ZU0ByL7ihZIs8hFFpgSJy%2FXBLVgeAumud4ffG%2Bt4pZfMjakMjyy4%2B5mNTGnRQOr60HGfBOOhEObYS7rXncOAIxNf5FmEKRuaS33OurdMDHNINKC6bOMSlJRTWci6Ltx1DbjB1nyW47zxI2YFfQ3BRR%2BATyKcPRZulKRl%2F%2B3q7%2BQrHPSWn17CbT%2BwBv1GKyfN%2FesuSHJ63ZTsPlJWhcBkS%2F%2Fg%2BSQ3zww2mznv%2F%2FBwnCMa38FfwIuppkZvM0a9SKzVhOAJrAEdERKJToeHcwUzcNMtPHx9nC58hSGkFQ4COA5tfbcNxBxHY5HfnPx6isbgnv3tKm3zzC2KYjQs8BUlIyTsHvI86p0qsKNZ8pS0q83%2BjCVut%2FOBjqkAW4P7DQhFO7AJjmeGWjmxMcGcfn%2F1IcJkg%2Bqcz%2BAxrj5zocvTKGtGFSPzb%2FmGhvbXeOWfl0KOvO40gr%2FbKj4fJNzhMhBQLGbhkuil6DLmRAZRhLkl2flVBjxOs2q%2BRnwJvwG%2B4kJxSUwmn8oGJVaW%2B%2F4ywh3YI7bN3XP0oGqZMhBxGeTNSU2t9EX62PLpudBrEUsxGA770QSXx0AilIyajCniGvd&X-Amz-Signature=9f64c6ac95da5c382d8f945686e31ae9318e16f847b303522f014342b7031ce0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663Y2Z4GZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAtddAq1LdRVeCax9dK7e85MRti0hMjMU1tXuleMKFtVAiB4f4fcbUriXqvtBlznmV9lqz%2FK55Yuu%2BDg6FF8Gq9gRCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMlQ1TGj0tMxpRPCJ6KtwD7TBzg2934kZql0SEqd1U4L%2BF0dkij3XOzY1DwwugrZNIWvrMI7kWIwJyNc9Cgw3zMPHTXp3saLUufUtwHuGx5WhRGdGrH3m1QPPYPeM1tHYCOUL4CRTfr%2FAOeSVnsb66jDWbbOGqE8R4mistguzMSL4jhcsIf0JBJ%2FeMcEWNxn%2F%2F3RbtKeMZP0GamW34K8B5DBE48eZA05fucQpgyvQWuK7CydDcQpPTEgJs7CKZLq0UC7gcldOoIfEbBMCFVAOJXD%2BJU5ug%2FFknyd62RJS0Q9L0qgMWHcB2%2Bf%2FfVFnClEUF6hF7jQEbeA9ct3QHCDsJ6BgIfAdlvawK4bhrz80PRjOSHYLTNeQw0z3LsFo70gxNBLauP%2B1LeY3Ie3NwgJtIKzNjK2bwenrxvQZGfmqzNs%2FsnTEltq0CLePH9oaZ3Wp20FTTcFV5WiXfW76TRpsNbOeBpdG%2B1emYCy2Qa%2BC%2FpLQkO5VHyl678wdayTTQQWQ69qzVtUeQ9%2BjsQ2qfAZ6NepVuhjU7%2BQXsNDax3M3evEALeBt9cuFrdIWx%2BLTtRMO8bqV8tbdEnovzQXH7tQenjmA64U%2BfItpATqgFHh1YKrKETKIXeqWr1BVk2dszIserQxIIh%2F7b537OXDAw4LjfzgY6pgFGSyES32NSuF%2FSkhyIJfkBG3f3dVkYc0BWhZgmd9%2B1MNqz0upUaIhOzYvdmui28ubJoue5YhtMPysnvdPQUpe%2BHPrUsNf0Q0OpxN0wnNIJuOyzk%2BMqFWXiG7vZ%2Fz6lhtxTh2FHOmu9rEKVroKG6qd16TjLu211S%2FSLJcLisZ2lxXyT5pzhAtByxIyRzq1ENJ9vbXBkxVX3lVXVt5dR%2BOUwci37L7vl&X-Amz-Signature=f93f76c6e18424f21e4eb5764043b8660991ec7c75fae8b494a8dc20d09685da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YALFJOL7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDvnVffo3Ro8%2FLeshxFqEmbhS2P%2BjAdXHOlRLrjQO29JwIgeHPkYoNsvJE%2FL6V4k4CyuDYNG%2FBcb9ZMt%2BuvSByCU%2FEq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDPeoTS7fwgPoUtNVHyrcA2nXYvci0CZKe%2F4cz5LY56NIZPWWMsI5Mw9fs590OJpbKw0McCq5AbOixs46ENx1fgxDY7IkG4n1Nqw2tFxiJ51XurIWZe9ANsiyOxXRGliXHNZ4iemj00Ili863CWWGZu8VzTPoeEu4A4HdYWhaTccldNCLVg4AXbPFpFR9T%2Bu1zlrnNQugNEA7sVbKqgbNE8oZ7H2HHNFF%2FZIJzr9oh9Cm%2BC2ZZLH4hs8GnU2suYxX7RJ47Zec4lDpfZ4etLz62KGKWU9Xrp34T7D0ceANnTEolj0W9rH%2Fwgll8GUtUQe77oTpVN2oiKa64QSSvFZaUbU7wz2JAkFkFrfIOelO0Dk9TT1OkAuc2mrN9u9lGfECcMSUGRppUU3NsLjY5XdtyiFjzIYLLcoZONLVcEVIwUEEMvCPXVL%2FB3UYFXDGtRPsv7aW%2F337OfbZhgmKKGZs2uPSHDUSiHGO7rKfdMoJPj%2BsSouSaYXDTst%2F6kMdt5J6U%2Ff1NEKJBGvRBPTYpME4guJlubjqnvWYXpXxh52z9iS8LJAk0vkqA9t8Gk1xWDNtNV4qsCzvQjNgjlw84ZO13n3ok0hrmiAEM6H4VNP6WT7%2FD2XSUq95NLwhDEf2n940nEoX4FehCO1rKOHFMNqG4M4GOqUBQUzp%2BaDKNlLrTdBnt3s4obzZYPRD9Xslf0efrtKNzL%2BzT0XxqNMZwLqsrNWw3L%2BaQm2iEWTWPmrru5zTESyZIKkznmW8cNHsKNKVk%2BKskz8HaPZlcLwsiv7W09%2FJsYf0U6DhlznhHPmjP1NE%2BN37aLxe1XA7FrC%2BqitRiXsjT%2BUPPfvnWEvXfLjGdAJI5hIXdkUCoL1Tw0FDpUbmThYh4gZ14SXS&X-Amz-Signature=f084243db508d26ed63ab6815eabb3300664f0da9c70970bd8ce7027eff40590&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NSGH2TP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQD8XSV8pKC4JdOqQwvBCfhjugetku0gsUVeK4FQTrb2wwIhALJAMj4NP8rylipdiR24F%2FvNbStiE8T%2BfjUjkmd1eF65Kv8DCB0QABoMNjM3NDIzMTgzODA1IgzoQWiyAzlq%2BZ%2FQosUq3APbGyfdJdfyiKYiUx0%2Fx6Zu7DteGzVn5NQ%2FFBSMQe0tqlffZhWdbMTTe6CtOKrNVd1mS4Jfc6zmfdgTTyyvqS2JGySQbSJIOagUmdqghQcQo48N%2FpODfbwh%2BkuuMvMlhLAVpOTyGHhkN%2BynIEQqaS7n6g24FNXGlDEtn1j4TBTgRL0UxWV1sBncV3hIw%2BO8JV2bdLPsGp%2F6p2eX7RC1ircZ%2BIv%2BC7tfuL7UV%2Blfq0BJI65xyw%2BhaZYmC%2FGF0bDqA8RjPxeVW5uCFmq61XzRVBLfmA8NJVQPxZEDsWj1hTsqYGcRSydnlu1S8om9%2Fydqb%2BtVYnf7%2F9R375f563cxWDBzqZC0BE50Vc1X5OoWYC8CcrtXTxYCxfA1e6JSpl43JXzG65kIU8tgiyoffb4imKogYacl2rcWU3%2BwvraiUp16trm3BnQkn8WsiXKHqXNUF8sHvMmD3r0YyxWgdX8R65p0QtSLL32uck35RGrUbpba3ZhaFhEoQhbIFQN6sblMkTlc%2Fth%2FnPzF51Iyd72MonK9J8PA4TJZe3GGWGxH%2FuGWka6bQ1TiXbxLqS7jbqHnTRWM8IDZbcK5OV5Xes3HdRt9eTYbAuNkbJ46HW3Zp%2BWQzqDnIO%2FyeY5kgjXLIzCthuDOBjqkASlVJk5g2N%2BnV1tOkDTwOY%2Bq7h0QBl1IM6likaGt2omNEJsTaK%2FZUceEQVJ7rNQeeR9atWhLCc%2FZPevoCUAoPg7ez6H7THYeifW2erdU0KXvkIgEMrPgsxcGiDcAzmPU%2Fjgqv3z9EjYvOae%2FTdyDklirTCOHmTJ8TWVPXC6Te0U9%2FpMFeLGmrF1QCT2CwlSDAs8mLbQP1cYUvy6KsS0nKUyRp4II&X-Amz-Signature=90e4f21d89309a1ddbf0daea314fc4336b9bf72ea9bb57e17dcb1324dc3a0e08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674OHL3OH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQC4Hsz%2BCg4x%2BUeCIRsOiqvW%2FynJpRhfaJ0pr8Up0bfuQwIgT3aOwbVv%2BXb0sUGJEwOJv6gyemmpNEsCdUPc8W5j%2F4Qq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKtX6JtJCqQtEVZsRyrcA%2Ffx40zJ3WcfSZ04fMKJ36ZiXqraU80jKjBg9jjEDpdsjKfSHKV0567YvAC3FKWgcoqkuxXLCuMpQ8aEG1G3WQOXmtVbxgb5xB8gSz5N4kUdoETlF5RksMnsmrDXYY3xCylT9NEqZekM%2BMNy%2BqCrpNLACuEZgPdxLAxJYvQ41wuJ6S938JLwu8nw00s9DIN0y8lXCN0L5Yk2gZ0WB2gCCDAms%2Fi3IJASBb5DxO5Zzv7Mqvuwdw48sbdEys6boTk9BH1CiBoIB%2Fla%2BMq%2Bx%2F0jPvCgqhag3U6VjHVYcxh9IgCLFqSGwi1Ks7x%2Bgsit6wmbRqcUDN4dfmLES74ch%2F04CFM6ZPMQuKtA%2F3YlCKkCCJbdlzx2K%2BTbDx1OPVZQwhTaT5IxfB6B0p7saQPi1uff%2FjVBWs1L5Q2%2BqK0Y%2BgffVkXa0Ikl4pGWvN9Fb19ZjmLHjSSYlBpQbRs1W90u6UvQXs9WNuU1F%2FF8wY%2FsMjtXNG4FgPAyuRRxs3RwcEBvAsbVD92F5BD2KRKZy%2F8c%2BlcAGCAdmXLktanOkNZk0qvznqdOc%2BlMiHI%2BSqhWpGR87mvpzBEBwwB674nsk08P%2FINvWRTZ7CywjKk91cnvfIrB334%2B%2BFuCrMe2kVYPhfhHMPS4384GOqUBJpYMswXRKX%2FFgD0fg%2BFu%2Fqs6ER%2FDwW8ktDSsLvdmvks68xzUpnjEaNtAYj21NoDtJhz%2B30m%2BIHBIWTdeh272%2FPLFXWg%2B66uBjT49%2BG3Ra%2B9883YBenpMpkvd5V4vzzJg0sH7%2BRBtSZBOZ9zmtEQa2%2By6Y8egGQrPsVNoprnW9fxZMTaZGHXudNDCD89xYKetFKrCakt50isPzZtwlFCQ%2BI%2B9brbD&X-Amz-Signature=5629369afe2d5947f73ce8ab145264b27813ed835c3efa4b2cf6ca64462a0790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674OHL3OH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQC4Hsz%2BCg4x%2BUeCIRsOiqvW%2FynJpRhfaJ0pr8Up0bfuQwIgT3aOwbVv%2BXb0sUGJEwOJv6gyemmpNEsCdUPc8W5j%2F4Qq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKtX6JtJCqQtEVZsRyrcA%2Ffx40zJ3WcfSZ04fMKJ36ZiXqraU80jKjBg9jjEDpdsjKfSHKV0567YvAC3FKWgcoqkuxXLCuMpQ8aEG1G3WQOXmtVbxgb5xB8gSz5N4kUdoETlF5RksMnsmrDXYY3xCylT9NEqZekM%2BMNy%2BqCrpNLACuEZgPdxLAxJYvQ41wuJ6S938JLwu8nw00s9DIN0y8lXCN0L5Yk2gZ0WB2gCCDAms%2Fi3IJASBb5DxO5Zzv7Mqvuwdw48sbdEys6boTk9BH1CiBoIB%2Fla%2BMq%2Bx%2F0jPvCgqhag3U6VjHVYcxh9IgCLFqSGwi1Ks7x%2Bgsit6wmbRqcUDN4dfmLES74ch%2F04CFM6ZPMQuKtA%2F3YlCKkCCJbdlzx2K%2BTbDx1OPVZQwhTaT5IxfB6B0p7saQPi1uff%2FjVBWs1L5Q2%2BqK0Y%2BgffVkXa0Ikl4pGWvN9Fb19ZjmLHjSSYlBpQbRs1W90u6UvQXs9WNuU1F%2FF8wY%2FsMjtXNG4FgPAyuRRxs3RwcEBvAsbVD92F5BD2KRKZy%2F8c%2BlcAGCAdmXLktanOkNZk0qvznqdOc%2BlMiHI%2BSqhWpGR87mvpzBEBwwB674nsk08P%2FINvWRTZ7CywjKk91cnvfIrB334%2B%2BFuCrMe2kVYPhfhHMPS4384GOqUBJpYMswXRKX%2FFgD0fg%2BFu%2Fqs6ER%2FDwW8ktDSsLvdmvks68xzUpnjEaNtAYj21NoDtJhz%2B30m%2BIHBIWTdeh272%2FPLFXWg%2B66uBjT49%2BG3Ra%2B9883YBenpMpkvd5V4vzzJg0sH7%2BRBtSZBOZ9zmtEQa2%2By6Y8egGQrPsVNoprnW9fxZMTaZGHXudNDCD89xYKetFKrCakt50isPzZtwlFCQ%2BI%2B9brbD&X-Amz-Signature=c5606edb1b37b0ee13206dc00e56aa24a3024084cbc16c209f696a4467ac7bf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UTUHGA5%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDs1XW9QF0eiq6ZCrQLG%2FDDm%2FPp92PvR1sS1CEskfz%2FmQIhANyq6AsBeYl%2B5jXoO0wGKDT3%2FO70tpvaNicqeE4DWwIuKv8DCBoQABoMNjM3NDIzMTgzODA1IgzcpHB4b%2BKpICtI0ZEq3ANi3DcMkpg4JURsLWwH6EP7UJRlDecEvMSD4JZfNRK9zA6kZ65gwqoz1bYsKkBANQzxExNEumKwZWs4FQK5asKVQOCiMH0n5VSz1yOGqtEumgYg7GUyf9XMV5l0pex%2FCUycPV2aAsK7M0HO1vu3403REdw3kLGVM8XNgnTmSFRl0wTSayQ561D5NNTaiuZ4%2FxzUeHpN0PUtCrBjSWMOhzdbUsOJ1smnR97Vq5tJY0RdaNBfupQx4Uv1YeTzhFNMMCk2CPJOVPFzp5vm%2Fczu3%2Ftai6GZGUJtihSwttcpjNdEJOfWEWCLFegBre4eHj%2Bd3nFKn0c2ejDmEQ0tiGQFVg3J9rjZJQ6QzyYa%2FZ30rdHQQD838HQCdejoMj%2FgB6gRGv9FsxfglDvDIH5Tm8gO6RrJr7ef7K8FbmnjqTqbMz8qi4s9aXmYkQgRBLX5ZYv3JngkwBf%2Fu7IkLDCTzB5GHGDYjUL21MsH%2F9AjVNWgbMyxk23Ov3HT588SqNm3qkLAcWoQhy%2Fak1lFle5hyd6fbw5n0kmb%2BffKAWsHIUGVASxTWqioTek53dnhpds%2BGpbgj0yYoVi1hU8AV7LTzxnPSPO1bqnoJsOPGcbJzoxMwyK8TzZYJ90Cbm%2BA0i9FDzD7ud%2FOBjqkAQcgvZQHtR9NYYZysBE%2FuEd%2F4JT2nVi0Gb8bWfE5lchaNRi06eE2U02rdNPgP%2BC%2BBpKFTQzEbqI6IxTnce74cEJw11G0MwaHNFkyOveu%2FiPZMavEpn8IFVIRPNVJcB4jRFPl35HG6Gs550XeWU79V1RZ9%2F%2BuawCuqv61KCKkNvQexX%2FsiW8hVJaHQRrJsJkk6Wo56%2FORZcwI503j0wsJY8OCJTlK&X-Amz-Signature=b4d38034224cec1944c7a979d9be80a5d982a93de7cf186ffe25426e57e9f3f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7NPGFTP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIGIC0ET1VJ0Ze71FXb5VQ7TEJdYCSbgBEb7wxzI4DJURAiEAw4tyMroR%2BeyFWw5UXWU4aIDcmMb6oYZcTM5fSnXPGAAq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDCxLVGSgruJzOZL%2FDyrcA2bHHpz%2Fr4qy3lXOauFpCbFZDkxUuRhLaQnjcO4OG2BJ3DJkFCeUvWRoc3mFrstUBT2HMspOa2RoFw2PsZBn4C8J7j1J6rFbOcaO4%2BiaaJx%2B2uaarJ5iWckXeEcNfxF43XKZURTembvx2at1%2Bn5Mt2gdKhrslNvjfLZ3%2BYJlLMkncDudmRVtnYbixG27z8%2FMNjedmLZJhpM0BVKHZBWH%2FKBFGfm1rg4Zs6G3pWo02OHnpNHs%2B9PZD6D%2BjKpjAzW3baN%2FMc4M6neJcI9wCCpXcDylale8LJMmgcv%2BQdGvbBkdmZiTX0rhdTiAuMFR9aLcF8rVgZBRm8tMea0cj52SMFF%2BtNfMDi34HlnHgIufsoMWYzLh0XsUIS2g98J3XdynZpI6jsN%2Fq6DWyN15%2FoqeCVT4q04C4EYxaI097CW4SmqZdNsatU1pZBPv7vk1W9FtYeGkPdCSCeUpXMfSrbeTV8iPLuB%2F6XvLd7sxrqHh27KyzEhfALZNZjYtsRIlNKaVwWF7RcplWK9v%2F2Ro%2B42qZujhCvhtReMpmJBn4vrrFk1DPsStEQxJmDfFU6MsfLTJASefqTirEsBXQFd4Ar20Zd6dzJEHd8UjZ8zZ7RsISDeYzgnTy8tw%2BOrzbLiFMKKH4M4GOqUB1B2ABIZyK1132NAUyU5kcSkkVYXrcNmorpzSC0fQn5ZNm0BBZXw3%2BpxA11aLxkz1H%2BBqIisT74xAImaEyDlN3PSIjbISszjirjIEE1J8iLkvrUmfTSWfgUvowO8lNBpbdnkoP76pmRh7zvseSuYLuPtSdhAsvgWFo34e8S35xO6n4HHdNPtRysxjZVEdPzVMtXVhHNTNIxUdZYYXm74TYUK8Er3o&X-Amz-Signature=4d7be510474339807e1a15c037408684cc9cef59fd880db0de791fde1e99c59d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7NPGFTP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIGIC0ET1VJ0Ze71FXb5VQ7TEJdYCSbgBEb7wxzI4DJURAiEAw4tyMroR%2BeyFWw5UXWU4aIDcmMb6oYZcTM5fSnXPGAAq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDCxLVGSgruJzOZL%2FDyrcA2bHHpz%2Fr4qy3lXOauFpCbFZDkxUuRhLaQnjcO4OG2BJ3DJkFCeUvWRoc3mFrstUBT2HMspOa2RoFw2PsZBn4C8J7j1J6rFbOcaO4%2BiaaJx%2B2uaarJ5iWckXeEcNfxF43XKZURTembvx2at1%2Bn5Mt2gdKhrslNvjfLZ3%2BYJlLMkncDudmRVtnYbixG27z8%2FMNjedmLZJhpM0BVKHZBWH%2FKBFGfm1rg4Zs6G3pWo02OHnpNHs%2B9PZD6D%2BjKpjAzW3baN%2FMc4M6neJcI9wCCpXcDylale8LJMmgcv%2BQdGvbBkdmZiTX0rhdTiAuMFR9aLcF8rVgZBRm8tMea0cj52SMFF%2BtNfMDi34HlnHgIufsoMWYzLh0XsUIS2g98J3XdynZpI6jsN%2Fq6DWyN15%2FoqeCVT4q04C4EYxaI097CW4SmqZdNsatU1pZBPv7vk1W9FtYeGkPdCSCeUpXMfSrbeTV8iPLuB%2F6XvLd7sxrqHh27KyzEhfALZNZjYtsRIlNKaVwWF7RcplWK9v%2F2Ro%2B42qZujhCvhtReMpmJBn4vrrFk1DPsStEQxJmDfFU6MsfLTJASefqTirEsBXQFd4Ar20Zd6dzJEHd8UjZ8zZ7RsISDeYzgnTy8tw%2BOrzbLiFMKKH4M4GOqUB1B2ABIZyK1132NAUyU5kcSkkVYXrcNmorpzSC0fQn5ZNm0BBZXw3%2BpxA11aLxkz1H%2BBqIisT74xAImaEyDlN3PSIjbISszjirjIEE1J8iLkvrUmfTSWfgUvowO8lNBpbdnkoP76pmRh7zvseSuYLuPtSdhAsvgWFo34e8S35xO6n4HHdNPtRysxjZVEdPzVMtXVhHNTNIxUdZYYXm74TYUK8Er3o&X-Amz-Signature=4d7be510474339807e1a15c037408684cc9cef59fd880db0de791fde1e99c59d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRQ2ZXHO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T195436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIEa%2BwfYYqCo35692YSurOgcVsKsLEC7pDzG9arDUviXfAiEA21LMaVe1pxCTXCFwhdIOPHPqkZZWs1Ma5wJbezqAOZ0q%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDBW%2B00V8ZH3WgBSoxyrcA7Vt50oCkp%2Fc%2FnY3Tw2zy9Ks4QkxFa7BrXTlp4XRdtdt4vFSRu5%2F55OeDTFrWdEX5GkWho5lDkRXY7XrwbOZtXzr9fAWzOELVSResiDkxwrA1vpRZ%2BVetH8wLBsRpAfypRb3iOieiKK78FwJdBVMOcDK0VxNbgus9mS7PIKmWvYXhtAm7cnehQFkpK0ADvGR0AqWpyXpCLIa1wovG12561i2PzgX7xn85GrmQ01%2Bybs8KgpsloHqZ%2Fnh0wH44Ynanw3FATqC0cDjCLXtFRUQkVUXzQ2eSPx8b44%2Bipojx9kIufmKnjT5cfX4ezW6cYXt1x4ENmM61hjqqXLP2Vx%2FIh4HN67fMTbhI%2BAIa2NeYqtXcrYjgh8cIlBBGMU4J4aO%2FFaq99E199uvr7KB7Vpp20j5PfkqhUYATMeTnWgNR6tLtUc6yeM3GkKBnqcR02VbWapfK3yLtVNe6%2FS2KoVbdLUZk%2FYVJ4%2Fku%2F%2BKAvipBwgaGYTAaIejgksM8HOI1YRZvShF40l%2Fx8GiCaeB3blTHVFQglT1M4VSrFTkrEHiJOTHP88B92ZOb4I7PNyRkMuHIPLV8%2B%2FOy8XYWaoQ%2F3QT36yKIXLuY39VldZH3XxhQmHQzMz%2BQqdkVH%2B6cL8YMImH4M4GOqUB1FMVgC9P3AQVTpJ9a7fFWFLL2p4DWu0kIMX%2Fg%2Fk2jXY9tLlQqDpBfRb3zNyWceDCbXwJNhPn1ID1tFjAPbs82K3qJclFVY%2B%2F807zxYzpsYksN3IVUf0UDWAhVAnbc9GN0ndeqMgZUF9IvlWXNqQW9gUv9eTdK%2BM8tYA2Ax3X0ayMDrr83pDolRnsstAIo%2FpSuhsqsFp6n67idQVfcKznJQKU0Fvm&X-Amz-Signature=456964a42e28ac6aaa1e7a50fb889e0c94470351bd13ef2db934d308e0706f31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

