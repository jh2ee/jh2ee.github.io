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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ6Q7UL6%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDhOW%2FPaRU4sgNX3hfE8PrAOnMN3jtfITmE1hTGfT%2BnlAiAmF7dvh1Cxo7NocL3ijqK%2F1JkEqNNQe4an3mXVuku3JCqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMq8S%2BcOn4FP%2BosYsmKtwDltszWNlnl7gEBZ%2FBvLrRjychDdJ6qAuap2mtxjX3pdS9oGGv70R%2B60M8oIJoQzVCIi65sRrUyIyQ52HyYUMZh0t1nce5D0RNkRDb7GcTwOs85EqA6Ayz9nLsVX11w1Zyhoox6hEOFeQzcDbCFjR8xgY8WFgZT7DjWDZnpw9XdqCjSFIMfIWcG%2B1l9zppof6b7C3%2F0fc7ySXLytAVEa4vwqlg70wXVOYwbwPCNFAOh8e16CyE0LjmbmuTQsLbns7Zsz7j5GkcqOg6nMqFkv7XU2IP7D%2FP%2BfbzfXhJiAAQXTOObFGnnKRy%2BFAJmyYUdX%2FfQPB5do%2BYQsR1mDE3GMDw7ueaMiXnsEjqYfCaRIqm7ByV%2B%2FDRKWCvPYd9sT2xZg4QKTojy2JyEGqodUwYJGbzAYzCP9dA%2BA2f1a4ZVg8bC%2FOc3r9CFkvpKFSC%2BNyClvv5qQGZ6F93ISWfXCJbNBYntFSFjG9qqUaFpGxBNHdtl8x%2FzKsze5zNLrmDgYiK48hZY3br2enAJ4Dj2MAaBGDvw1G%2B8o5PAi9k%2FFxv3K5Xlv2%2BfXsCLEWq6nNdYNtj%2BL62I9bUwDMyTeOb%2B6gr43tlPmNEK2ZpqeuHtRGvbL0DTr7m%2Fo8ymo3%2BxvlOKo4wz6nDywY6pgEa1b1cNcXgbhgcJo05svN7Qm1B5Bijrovx%2FAFZWxxRPxQMH50C4KoRKknZdZvcJ2WpI%2FeJswE2NIJr%2Bcx%2FvWgF7g%2FFE3fvC3Xp7MHHTIW1LdwLwbTsT%2BFeviv0FaPgqk95s0ArowqC3SoiMnplE9rJMJWwFsTWZRVxemBJykoHUWfiktOb4y3y3YGGFCwNGJP%2Fm1PES2cTCjyBw0Cvy6NWpDPY8h2L&X-Amz-Signature=f4575a4347c704fdae96af0f0772f9d7e66ee02eb2a63a661cc58a36c4c25b91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ6Q7UL6%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDhOW%2FPaRU4sgNX3hfE8PrAOnMN3jtfITmE1hTGfT%2BnlAiAmF7dvh1Cxo7NocL3ijqK%2F1JkEqNNQe4an3mXVuku3JCqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMq8S%2BcOn4FP%2BosYsmKtwDltszWNlnl7gEBZ%2FBvLrRjychDdJ6qAuap2mtxjX3pdS9oGGv70R%2B60M8oIJoQzVCIi65sRrUyIyQ52HyYUMZh0t1nce5D0RNkRDb7GcTwOs85EqA6Ayz9nLsVX11w1Zyhoox6hEOFeQzcDbCFjR8xgY8WFgZT7DjWDZnpw9XdqCjSFIMfIWcG%2B1l9zppof6b7C3%2F0fc7ySXLytAVEa4vwqlg70wXVOYwbwPCNFAOh8e16CyE0LjmbmuTQsLbns7Zsz7j5GkcqOg6nMqFkv7XU2IP7D%2FP%2BfbzfXhJiAAQXTOObFGnnKRy%2BFAJmyYUdX%2FfQPB5do%2BYQsR1mDE3GMDw7ueaMiXnsEjqYfCaRIqm7ByV%2B%2FDRKWCvPYd9sT2xZg4QKTojy2JyEGqodUwYJGbzAYzCP9dA%2BA2f1a4ZVg8bC%2FOc3r9CFkvpKFSC%2BNyClvv5qQGZ6F93ISWfXCJbNBYntFSFjG9qqUaFpGxBNHdtl8x%2FzKsze5zNLrmDgYiK48hZY3br2enAJ4Dj2MAaBGDvw1G%2B8o5PAi9k%2FFxv3K5Xlv2%2BfXsCLEWq6nNdYNtj%2BL62I9bUwDMyTeOb%2B6gr43tlPmNEK2ZpqeuHtRGvbL0DTr7m%2Fo8ymo3%2BxvlOKo4wz6nDywY6pgEa1b1cNcXgbhgcJo05svN7Qm1B5Bijrovx%2FAFZWxxRPxQMH50C4KoRKknZdZvcJ2WpI%2FeJswE2NIJr%2Bcx%2FvWgF7g%2FFE3fvC3Xp7MHHTIW1LdwLwbTsT%2BFeviv0FaPgqk95s0ArowqC3SoiMnplE9rJMJWwFsTWZRVxemBJykoHUWfiktOb4y3y3YGGFCwNGJP%2Fm1PES2cTCjyBw0Cvy6NWpDPY8h2L&X-Amz-Signature=f4575a4347c704fdae96af0f0772f9d7e66ee02eb2a63a661cc58a36c4c25b91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTXEL7NF%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGpPXDJv7gLx7hDnrkJofXOrvwSyqzAhRStHtJEFD8WIAiEA9JBs1Ybx9YL%2Blu13Ml2AHIE4WMhZYf9ReMVe%2B%2FAtNw8qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIdPAzjPfkUxYFgF4ircA9oSlSyIHWwJFN5%2Bkg7Gxk5BSGfUl%2BO6EbiSdx7EvgARhv34%2F0NwbhttZcDpboXbnTi7NCo7iIvUtIq%2FX%2F%2FbUToPhSI%2BG7GphZtdS45F3LrGmr6%2FVGYJqcSjxzY%2FYnY2M3uVSh%2FXjCigg8uMXQKe8wZhkNWpJqJxht41S76PLzUgiJV1BncFHOUWYKrHu7hnOkpu8h8VEP%2BNRyn3U0WvPk8EHC6%2B3SqTboNYR8WLWZ4%2FagEmOHMiSn6dKNjTx6pgnH93p4FkxEvgOh9M6Wcdl1ZpTrQ9UJGyfkWWgiNYa1PBum4PZ2LLpDF92FopKeaDduvjdEtwMOgueyOGsyYUsGDW2g0w00rKYg9%2FM45%2Bgm8iUgT2TkhIspBz6X%2Bs%2Bv7nb06v9UArlK7GDs%2BJrA4ral9OejDYrmMXDC%2B5vxBS53o5xKR%2BZWGaZxLSKaGL6Viao0QKxWohePJEQRiN9jLVsdhsR1TtsGXpQLVBTM238bcq90jBDqxpkKzJa4NjYL%2F5qk69%2BzxkfueAStnh5ilL1uPtMMx4eJKZ%2BX%2BRdqCZ5Y7eFl2ZWDN0WM23MEi2bsar45ISsmvQTI4E%2FTSCScbMGIMDALOR9QcO485DK45N3aPJ4H4d1reTr%2BSYwV45MLmow8sGOqUB0LJcUxBXlAboYSkg94XtCtWLJy2h%2FXGoZZU8rD4Zx380n1ivwJ2NgaIEU5EyFaYXmtOId8mSjLjhNVFg4zYqmT1qhp33RyjbYsHEbeK3BPEnmvPHGokwmejnjXB3w7b3a5kuPqKJfhdsWg4QoC1IdNLw3G5SE5wzMDQKHwSyafGEkcHofsPCuJ2TB%2FdC0LqqqV5LERd1lWI%2FUwIKe4CRatTAKYDI&X-Amz-Signature=9c62b176289a9f84d10ee018bf5896a8d88a9ac1721bdde4edf75eceaff704c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZ3Y2BS2%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDevuXL0RpSFcIYRg4rfkVWzkOhtMWDE16pkl5e3qv9gAIhAIRiHDJW5OfSyzrhqJJdN%2BYZhz1c%2BQV9MMtSdFEgoRw%2FKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNu7%2Bf8Q%2FGbLZ56xgq3APs%2BIQEvj%2BanuWogqRDAxC57LPTLd5WAQMnGi6%2F6aOclQbVjYOJRJAod970bWstDFAq4m3br%2FXcvRbhyVrbD5Rcq4mCEbk98j8vZDgLIIHyuNUr2z1luqaof7DvH%2Fn5FmakWu9AZ9KXMNhLRGVAuKr%2FgH8AQjwVyoH0G8xXhIh%2BIRZ%2FMxDtdaV39QxjNw9NVz6wtiscA%2Flpq9jZkCNxA2k2k3M1zfio7UBVlQuUzEGYZNF5J1cg1LntVjJMcuJ2OySc8kvoGMK0SDjDfuySXof5QL%2BZiso61ghN403BI82eq2sZtfMVF%2FCRPC7J1DWzzZHTIR0PgYBW%2F05xAgdjQIaX78f4j7602iEpe%2BuJ9kXPhorpyfnwUDelZ1IXFGafrIRmWw44%2BPixlJvVpnzc7%2FWVAzjWI%2BKsqVqWsufaOWykp1rxGJ5s%2Bj39MZS9GmDM%2FpVygep0Wr2GuGeMJfcaQdyMk%2B0coRj02psi5MT%2FhggP1Ktp7jWPT%2BoGkEHKoHD4%2FWeYKGuiYvvxWRFfVrTvPiux0FaIy%2Fze8ER26xSogS2QL5JIO58K37T2jF4MqZSdEOZJRSO0sz21kCbA%2Bl63cKcJb08Vg2VuhPaSoZnTxnqCEdmW4irY1YTfwAVRZDCGqcPLBjqkAbgiNVplM5qN%2BnWknvQ16rpcpQemOMkIhbXOHgfxAiSQr28lvcwHmhxLf4WlUlXWi3Fcuq92vfkKpktLrfk1EWpFkgg4ZjLJyZRhIS9Yq4dzDymqv8pXI76QnTar99PdcaEyH9HP8QQSyCk2HzlzLPzg%2FtDJ6iBPT9ouGZwXio1pOMLt85JkF2FD66haXFJOvWJyak%2BQV3xkiBXDtVTKQPayGxXf&X-Amz-Signature=e7538fb74a739fc543bff511a007cb6645f2c4e7025611dcf4d2fe0b0a7391c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZ3Y2BS2%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDevuXL0RpSFcIYRg4rfkVWzkOhtMWDE16pkl5e3qv9gAIhAIRiHDJW5OfSyzrhqJJdN%2BYZhz1c%2BQV9MMtSdFEgoRw%2FKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNu7%2Bf8Q%2FGbLZ56xgq3APs%2BIQEvj%2BanuWogqRDAxC57LPTLd5WAQMnGi6%2F6aOclQbVjYOJRJAod970bWstDFAq4m3br%2FXcvRbhyVrbD5Rcq4mCEbk98j8vZDgLIIHyuNUr2z1luqaof7DvH%2Fn5FmakWu9AZ9KXMNhLRGVAuKr%2FgH8AQjwVyoH0G8xXhIh%2BIRZ%2FMxDtdaV39QxjNw9NVz6wtiscA%2Flpq9jZkCNxA2k2k3M1zfio7UBVlQuUzEGYZNF5J1cg1LntVjJMcuJ2OySc8kvoGMK0SDjDfuySXof5QL%2BZiso61ghN403BI82eq2sZtfMVF%2FCRPC7J1DWzzZHTIR0PgYBW%2F05xAgdjQIaX78f4j7602iEpe%2BuJ9kXPhorpyfnwUDelZ1IXFGafrIRmWw44%2BPixlJvVpnzc7%2FWVAzjWI%2BKsqVqWsufaOWykp1rxGJ5s%2Bj39MZS9GmDM%2FpVygep0Wr2GuGeMJfcaQdyMk%2B0coRj02psi5MT%2FhggP1Ktp7jWPT%2BoGkEHKoHD4%2FWeYKGuiYvvxWRFfVrTvPiux0FaIy%2Fze8ER26xSogS2QL5JIO58K37T2jF4MqZSdEOZJRSO0sz21kCbA%2Bl63cKcJb08Vg2VuhPaSoZnTxnqCEdmW4irY1YTfwAVRZDCGqcPLBjqkAbgiNVplM5qN%2BnWknvQ16rpcpQemOMkIhbXOHgfxAiSQr28lvcwHmhxLf4WlUlXWi3Fcuq92vfkKpktLrfk1EWpFkgg4ZjLJyZRhIS9Yq4dzDymqv8pXI76QnTar99PdcaEyH9HP8QQSyCk2HzlzLPzg%2FtDJ6iBPT9ouGZwXio1pOMLt85JkF2FD66haXFJOvWJyak%2BQV3xkiBXDtVTKQPayGxXf&X-Amz-Signature=58eb6b4cab5ad3de73c5a5c0cd453f90b8fdc6d64a7ab63b28eb7d0a5df8ac1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUIAB63T%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIACHxBgwIDuZ5WC7cHCJ%2FkYRjvxPVFgq7ztRaZ8t%2FRoWAiBzS1BRDve4OowSAQdwmi8hqFIrvR10srjuCkY7fQp2%2FCqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMEFWTFpU696F47axUKtwDSb%2BGFq8u9YhYbCN2%2BHSvyxlpskHOsd%2BQRpeXg54vTk6xynJfpSwU32amGIzkuQ%2Bnu23V%2FgDn25sAmayje9z7GsdqyeHy33FoABLE0F1qsDrQhsVtxHarFTCWyr1K0dFTLKOENdJXSfCIKTbSsLelJRy%2FC5r3D4XY6zgx6v8gUUnnfuYknPuuEWlY0r3g%2FjP6n2i78ItQ393rYUP0rhOGAo6IV7Rb6ypsasS1k9aRECsLKfJtHeo20YnbMlTd2VQ8haCkqLMH7GZWxJZCcfW9zDIauJAaKJCgzGRg5NVVT8zJMFQoHq90G6h2V%2BuqO9YhoSzMBRJppTi9HLyeek0Gz5DKdlV3m5uvV79ZFhyEObhxtBioRuSkNp06dCyMrgP%2Byt5Nis9sd4InCTUCiBbGrbDHYfs4SRnno35uNLkGIkjubW9XhHdvlGuozn7nmkIrXL%2FqgnXRKhW7%2BW2dLL4tFHOich4wa7kZRotYEi%2FenFIFCoNXgktJpqCkrOcmo%2Bw%2FAf9tNTGsnu5oUhk400yF%2B68vF07dQru1dwEuFCBVKGKGctkZsCs0l9BOTShJw25JT6WPapOlKXUvRfmKAMQlWxDsamT233AVsK%2FUrjbgli1ty1sLQRnjZSAiBzQwianDywY6pgHdknrXA3C%2FYIrE55TeNEkMmANLPKQmdQOGuQ%2FcVhNe79NUsqFTpSBFIyWeGmijSeSWxyncHBsZieVtJE4aFziWr%2BekunNcggDd%2FP2WFcQBVNJTTFZSdyO5YhPdK3B2hOm%2BKTvXjL8oGbZkERHfEY1PlBOc9PYIPN8r%2BFeESF8oa%2Bfk%2FcQ4x%2FQxIQ1lotU%2BdQYEYd%2B9Prgef2qTG3Xm6RWaFuZF1Px2&X-Amz-Signature=b7acd121fc73de2c68f1acd4ba89525afee9453f77300e3cb35ea4454042138b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPOUD7MP%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkr7lDxjuaBuTuwVdQb08MrEL33GQOLNYYCOxA0vSZjwIhAPuuxFw9xhHb8eXDfsRbEr9rNmvNnHwMeAbFUxaNiGSIKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzYF9vugPJCFYJKq2gq3APwO8nyJq56bJOAlqSskBqhP2lp6LqWJyq1%2FTuBkGFf6xYsKyG%2FzUNlZa0ddU4dlDh6n6G7rFAO0uT4TojSxliZav6q2pPvDXQI0RIAzC0IQDNRUNrxNmml5m0IGTGgsNEYuWJpXHflTUpUvrqZRjtGV1M%2FqsacwOMflikIpQCtxi%2Fd1t3rAz2ZaEJET5CoZ5gIUHimvgcIuNuFW5dhw%2BAilNDr%2B8Znjg83J97Z1NxP7V58Ac6CyqZCd2Y72emhyVFYAsHm%2Fa88qD8wne4zFvKbl%2FIR0RIXDFcnAJjHr6eug0XHxmQCIG4Y9Q5GFMKMaD7oi6bCbUwyujRCVgfO1b0LWsE%2FF1WO2ECx4f4QZ4e1db1nf2Lekzgtxwu%2BOdpvHRHSgdnj3JKYuHG96SNOXOjhw3ysdRXoOl105XJj1YN7YknPcdQQTwrNvYVhCW5GTX%2Bf6oOxz6f2J9uoIsLf5EPBynkOP%2FDmPxzNI%2FI6qTuluUiMAmGCgWHT4DM1JPAIg5ZnFPE4eLQP397GsN9MSCFu4gkWLBP0ppda0CCu%2BSFtG3Tid6i2sLDnxMbdK3mQV32LhcIUzONXLSMkB21FUIWsIf%2F8o91OKPd3swUu80p%2FfZm0cPzSpdFqr94jIjDSqcPLBjqkAUd%2B%2FWElXahwsgbz7waSnQq7zV5Ye1vnteCBwHsflHr8hqsf%2FQW0BK5oT6nLYVAJ9kBsccvGIRqJKae8KowwrNfB3thrro%2BC5KPqBrS5MJeg9TyikEfQB8hKK8j%2Form07cZ5O3I5PWCwTpDePrPBRPLReMW6%2FGqU7D9Cl5t5Zq5M%2BO8ZfGPMZ%2FCXDDVeVXYij42vtQ0zs%2BSIm1KLOzX%2FFfiyw0%2B%2F&X-Amz-Signature=2e3b7cf689fcffefa6b100fbfc709e4bc26cbc36d1bb449e04d998c56e4c90d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZT5I6RWP%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfqFBQxCGeVZ36w%2BCINDLeppBPXBCf9gyo%2FAVEvku4fAIhALs3Y43gPHdQEMUg6%2Bv7S0QxCFgqqe9GnjodvSV0og4QKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9KRkSEhF0%2BH7flnQq3AP1exn0vDP4jx%2Fm3r9cIy43sJnKP5X%2B5fYFnG5bwzrYte%2BPMIZ8ezGfDupJq6Mgeh8YqWANitw21Zabqn%2BWRflPUoQsPze%2FuqWLsvFFIfFnnNkzp%2BLG%2FEhnxdeNiQW%2BX3mVQCSp7T8F5tFDo%2FnB7WcW%2F1chhKQmr9HPOt0SDNn9R2QQv41Zd6G3idJeQhhHM6FpCw9UPiUxAb1liODfunfPwf7eaM4ozyYgObOhGfZHSXaYOlN34hlRY3HJxiSvx4l79dXN%2BHbuqAxTpQleKL18x3dfzG8NOD3LeNuSlrwBDrzaOvuzFnM9kXJRV%2F9yO8od7iJtNtHo3qtbyKCD0kkC5V9F44mkhmbi%2FTMNnUc4l1NaZM2HuBAyioJJKbPUCeSv15DxSRa%2FdB1j%2FRuxFUZPPh3wG0wqrxwPSwhNT0f5LC%2BjdjQGOqcj9d5LGylHIUpagtGi8pgMRFbrChHJ3EBccehHa4BCgQnXP87wW3%2Bmu9Bb3jeK%2FQBId79tVw%2B%2FYL%2F%2Bt9UKgYOb%2BGvuTlVbyJmIpkTkMuFvw68pLQwYPrK2osMJVs1QntEpdmdz96x5STuYPdbqN5oEYXy6LJvQ6Zo7y54zomnARaKzgjTza0ES8H5FngREc1Zw1aybQjCFqsPLBjqkAU1SK%2BC%2B2oflzAocjSreR13e8HqTXoCxK%2BJLGsl8Xo%2FQf2gwHEf%2BmZ5WsBrWXDI%2FdhqAFC%2F4vCuVnpzK%2FGkXaEItB8KkcRf7n2S0G4GgPE6XBv89kEzJaRgKUvtDrJGtcq%2FKbtgGaVt3jekIdWGw%2Fqoz6uvVcQbT%2Bq1IFcZc5fyDx5f5NAefqnH%2BCAcMk%2Brq9%2BRzd1c66hku4zueCG%2B%2FQzOrOCBi&X-Amz-Signature=f2cb7f2f44c827007c91510528861287e9799b674c69999fb2501ae3186e2d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEBEE4E6%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAScUBNj4XrOzIw3m7pZAwin8kywZgnMDFYxEy7XCVQCAiEAzgTWr%2BHFbVvYgDET%2FgdYk%2BMfPN%2F%2B8k7K8%2BnHUv9Dux4qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCL6w8LIVQtAOi2BxyrcA5%2Bh7ZU26HTkSrfv22%2BxXJJRKxUZfld%2Fozrinh8eSFtJ9rCcRZsbvBnhblHkMw8qI4tqB0Lbf9RXVDHBCx3FON27qYSbS5nYoqAlPwOsCYNSsrIJjP7TvfyI3oVx4IJHsk6a8v5FVBIiVDeN8g89KgJPPV40rWQEWp%2BDK5EFpbamXSzX0c68CKg6kZUctbMIlqV1cdfKfcSIECuxr4qv8iC6imlRmM%2BUvBn4WowI3oayygRUKJCl%2FisSbCWXn4M%2FbIzbGtF0dNWtV5zu%2BSYr%2FeswOsITIlJEOZo5Wmj09e8y5JuYlMXerASpsdxPOXKe9vDedRmQM7rZnZngbgNjJoAbHJI4D2YVMlvVSvIvxWF92VcLDrSNkkw9x%2Fh5mpaVzRvXh63Xch%2BJ7v4XRyQtXeKbPMabF6qRC%2BWwFGsqAfmxbg8vZGQ5sb4jMOrO%2FprlYdO8%2BRYuY5VeCAhLgGSbe0SsTBXd5YhXePNNKEOzCbrWrDtvzaQaeUs1WpnhbE8WOjONF7EC0Fcx3fu25eyl0J6pfbvYHAeSx5zFrv7LmPjyRRENPeYV1EaF3NWupiwCbUK2I90zlEOZkGEQ5KPlS%2BiBKvTvCZU5r5c4CtP2UYuu%2BJfPgKTBnvk3%2Fzy8MNGpw8sGOqUBEg45NyQ106clJk9vTM03qFID6bvW1Mwr2dGxWPi8CWExMbCGntnuZerOPMjyuFEAKCUljO8vg1mBwQY3GimJCHVLY9R3MU0C1CYN67SVBicrU8ydTGqKV5XOfaVLuRSG%2FCWT1H29RpP9ZnKaqXeLZKmGnKjvDHFhBPFEUoNprMSubr6VoQBz1D%2FxUXGeVk0UDUWIK6CE%2FYk1V9IJHS2mu8FSWg1K&X-Amz-Signature=a757f7f26c1fb677fd531a18cce5a01317fef94596294d172c83b9d7cad415d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEBEE4E6%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAScUBNj4XrOzIw3m7pZAwin8kywZgnMDFYxEy7XCVQCAiEAzgTWr%2BHFbVvYgDET%2FgdYk%2BMfPN%2F%2B8k7K8%2BnHUv9Dux4qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCL6w8LIVQtAOi2BxyrcA5%2Bh7ZU26HTkSrfv22%2BxXJJRKxUZfld%2Fozrinh8eSFtJ9rCcRZsbvBnhblHkMw8qI4tqB0Lbf9RXVDHBCx3FON27qYSbS5nYoqAlPwOsCYNSsrIJjP7TvfyI3oVx4IJHsk6a8v5FVBIiVDeN8g89KgJPPV40rWQEWp%2BDK5EFpbamXSzX0c68CKg6kZUctbMIlqV1cdfKfcSIECuxr4qv8iC6imlRmM%2BUvBn4WowI3oayygRUKJCl%2FisSbCWXn4M%2FbIzbGtF0dNWtV5zu%2BSYr%2FeswOsITIlJEOZo5Wmj09e8y5JuYlMXerASpsdxPOXKe9vDedRmQM7rZnZngbgNjJoAbHJI4D2YVMlvVSvIvxWF92VcLDrSNkkw9x%2Fh5mpaVzRvXh63Xch%2BJ7v4XRyQtXeKbPMabF6qRC%2BWwFGsqAfmxbg8vZGQ5sb4jMOrO%2FprlYdO8%2BRYuY5VeCAhLgGSbe0SsTBXd5YhXePNNKEOzCbrWrDtvzaQaeUs1WpnhbE8WOjONF7EC0Fcx3fu25eyl0J6pfbvYHAeSx5zFrv7LmPjyRRENPeYV1EaF3NWupiwCbUK2I90zlEOZkGEQ5KPlS%2BiBKvTvCZU5r5c4CtP2UYuu%2BJfPgKTBnvk3%2Fzy8MNGpw8sGOqUBEg45NyQ106clJk9vTM03qFID6bvW1Mwr2dGxWPi8CWExMbCGntnuZerOPMjyuFEAKCUljO8vg1mBwQY3GimJCHVLY9R3MU0C1CYN67SVBicrU8ydTGqKV5XOfaVLuRSG%2FCWT1H29RpP9ZnKaqXeLZKmGnKjvDHFhBPFEUoNprMSubr6VoQBz1D%2FxUXGeVk0UDUWIK6CE%2FYk1V9IJHS2mu8FSWg1K&X-Amz-Signature=0578b992dee2afbb2e05f2bc4d1b75a1fe42b45a9c97d7d4d3d4ecd9e0de5ce5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V42Q4P3V%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmuciNViFevfesrGKBDyZy0Ky5jVklkCFgdiH3WEiisQIgaBJVzWBJv%2BO1MPMtaB68e%2FoI3cKII0WsVzUacETvdmgqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ4vr4SbVIUd4pwuYyrcA%2FqCyHRJiGP6uNmlF0qcWKBqh3E5cOELgROWv0amkaLaxDkxq6JCjs1lZPJPA6YkhQHgWQmaInXCeYn%2BDlQk2yXzks6tlNwQkHnTm0EYBBhk7wz0z6D82B7Xg%2FOnNnbsaP89BqlqV2IVop%2FSS8jZulJjLcIF8CKrbcjI7TwqCHuGjSQScPFFoRWVsDXuIEYtgxQtNK4vIFJON79jWWFJtFcwcofK8RB7VVuSXyg4PryRG9CTdvC4FWppn3u2vHp7rElU8s5cV4xnFYLCoGAbWy2613yHS%2FT8K98G4OIVu20UOaJnyyCkf%2Fq5hsKEur3CY2ZdhQnUBlF%2FojML8xiOGVaC%2F0Ua8inGXx7RxG%2BygiPTtGQPw1YkDkdsSvKRC7og1OJ5DNxlREeSKI2aeBorHWIwsnOtP4f%2FRVeR3i36B%2BnFu6vLLl%2FvE3Abqe9XAC6z5Cop1eUZBjw2Ga7X5d9iR7c7tqb73yZ%2FJWlkmAeFpOivzsi%2BkRrkdDC1hkAsQyOQ8nUxAPB4vi1fp4Eq48EEdTdXJ6AKluKB5YmhXitOXLVgZSpsXRfhTf7cJ1y2OcemNi2qnlaW8mqEpRRLdoZnNU0Qzeu4NVCUou1urG6hKTu%2FStg70YPBejU%2Fua8JMIipw8sGOqUBWK%2FMWUt%2FqG8kJG9aTzOuz%2BwrnTajD%2Fu8C1pNvAdJ1lGLH%2Bp8MVQ8WYKjGmbfnqcMb95wBP3RVA9lDSdfi%2BjHZ0lSCEwOof8jTdzzG2FRXyhiOJoOT5XYFe0ygDG6zPqXN390rI8WoDXP9j5f%2F0%2FglXyL7%2FJXK2yCfhy0tbbSpOQjwVqrPDTuoPu6sFrBbw%2BOKwYjsIJb4I0v9scbqrfc3ZXZoZVJ&X-Amz-Signature=fe1ac80942cb9f0728b5e1a19ea9864ca546097c22b3bef44674a6a761bb284d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCVQPLBN%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDgVb9%2BMYwNhfknAMxo1416GWQ5N2WEKiYlWBuQNYwMWAiAzVkv790wBKeLz4%2BK9Kh2OXvVbt0xMmNWeeZ5wbtWGaiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5oSMfW%2FbqtLe7KtTKtwDhHBuuKUFKGUBb1hzIabMkW%2BTrVqhxqNNaEoBPX%2BPCpd7EWv0S002B8wWzQZQGYHnc4r%2FRON2EVVnBP%2FRuOsnf2xwssXpAlAOv4roJ0TPjMgcpgRRmwRyhDmIYZd%2BeSK0ZMQOlypmXevmZUSldV1LnF%2F5LDpshSxZm%2FxSdZzNYwfVkfyWJXsGPtr0k6vLLal%2FEvC3eE%2F9%2B3GCmCKONbcOy%2BKBKsqWsfB%2FVcj3pEtruJ%2FWnbioe%2B9YMibTbwMjq2hsVElPgVKNm1H2zU2bcr75afkNdyxhpu21poCAJqwShwtpvqGk6BzB3jS4cvrMm0gF0qfC1powRAMTREYOhqxzpewqI%2B3yD%2FiOX%2BmvYw8EO4Hjm2kwZhAZ2gW6%2B%2BP2NYg9idi1m%2F28tEku6Al2Xp%2BEcvDhCuEOsH%2BPkCkmptndEQKDo3yoWW9DUpOAuoT4jD5vrXplCzScEvFpWPw0jirGrghDFq1vEHrrPzhaPtllEk7A41bX5E6xxgIw2E7jsSufQJYax5%2BVkEdAGe2qxRvZtTZ1u35hQ5aAj73hGkfRdUYM3gklpqRqvwvWUhO4DWkq0YhNR6gGRdljVB7jXGYjmLrlhrzdFUk6vD7zsKYK%2Brg4r%2BdDwxlB1yYJHUQwz6nDywY6pgEQxaBK43RjGUiuF%2B2qGj%2B7DC%2BGwnEw8%2B%2F1IbAg79%2BHIy3pQBeBtOescFrjNaYhslR5kyamGiCGeNtAw7OYrNRqU6TcMLQ5u39SBNcF1xcTzn%2Fnkcv8B42vYHq6tLBO4HTpZML3ClXDLFlCjWnb%2FNgZ0mt%2BSDjAyemcBw77kkBJOXHDSC%2Fd4f8LCG53Ys%2FkBU7smhUFVoPmu%2FALkN7mbtOnOd%2Bf00Bm&X-Amz-Signature=9d3f52b8bbf39ef9becb5e3fd2e96d77583e445662140fb6d637594aba79147e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCVQPLBN%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDgVb9%2BMYwNhfknAMxo1416GWQ5N2WEKiYlWBuQNYwMWAiAzVkv790wBKeLz4%2BK9Kh2OXvVbt0xMmNWeeZ5wbtWGaiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5oSMfW%2FbqtLe7KtTKtwDhHBuuKUFKGUBb1hzIabMkW%2BTrVqhxqNNaEoBPX%2BPCpd7EWv0S002B8wWzQZQGYHnc4r%2FRON2EVVnBP%2FRuOsnf2xwssXpAlAOv4roJ0TPjMgcpgRRmwRyhDmIYZd%2BeSK0ZMQOlypmXevmZUSldV1LnF%2F5LDpshSxZm%2FxSdZzNYwfVkfyWJXsGPtr0k6vLLal%2FEvC3eE%2F9%2B3GCmCKONbcOy%2BKBKsqWsfB%2FVcj3pEtruJ%2FWnbioe%2B9YMibTbwMjq2hsVElPgVKNm1H2zU2bcr75afkNdyxhpu21poCAJqwShwtpvqGk6BzB3jS4cvrMm0gF0qfC1powRAMTREYOhqxzpewqI%2B3yD%2FiOX%2BmvYw8EO4Hjm2kwZhAZ2gW6%2B%2BP2NYg9idi1m%2F28tEku6Al2Xp%2BEcvDhCuEOsH%2BPkCkmptndEQKDo3yoWW9DUpOAuoT4jD5vrXplCzScEvFpWPw0jirGrghDFq1vEHrrPzhaPtllEk7A41bX5E6xxgIw2E7jsSufQJYax5%2BVkEdAGe2qxRvZtTZ1u35hQ5aAj73hGkfRdUYM3gklpqRqvwvWUhO4DWkq0YhNR6gGRdljVB7jXGYjmLrlhrzdFUk6vD7zsKYK%2Brg4r%2BdDwxlB1yYJHUQwz6nDywY6pgEQxaBK43RjGUiuF%2B2qGj%2B7DC%2BGwnEw8%2B%2F1IbAg79%2BHIy3pQBeBtOescFrjNaYhslR5kyamGiCGeNtAw7OYrNRqU6TcMLQ5u39SBNcF1xcTzn%2Fnkcv8B42vYHq6tLBO4HTpZML3ClXDLFlCjWnb%2FNgZ0mt%2BSDjAyemcBw77kkBJOXHDSC%2Fd4f8LCG53Ys%2FkBU7smhUFVoPmu%2FALkN7mbtOnOd%2Bf00Bm&X-Amz-Signature=9d3f52b8bbf39ef9becb5e3fd2e96d77583e445662140fb6d637594aba79147e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMPB2TJA%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T141910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD6d0Rtps3P%2F9GbSJIN5IbaqIsu6LN30Sit8WfD6AGuoAIhAN%2Bsx6xi0WsyVlUdQ9LTw28EqwFDvWUjf9XEYLXeWMFoKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyfjeO2xIfU%2BaT5Pwkq3AMBbc2xEkR4Ap95u6XK9jencuAo%2BilAb89rdFjeeoqBoDhLqECiVkatTF%2BKxXcaIrMffAbV2t724yH7DNepj1KnISl2N32OI3jIjqoN4OiP5k0%2B17fT4e9oIyAw25OJDo0lW1S1CAWj3HAecVDV9PYnPip%2BegjsIiV3aZ%2FzKgrnWrvrnRUUkDmWcEVb0CcJAilFmZh%2BvKDnu3AsAt9xUDcqBNzy5pj4CDQziMzXXU2wYlWZpzOdQWegLTmPEELaysVMne2jQovnbBs%2BXBdVY687Wr4tN94nhVCtqXjupYjAzGsDGuzmTmXYwx7Sjfo0skF%2FdeXosd3FW4%2BIIaQF4WrWlavTqKc3mQPWGtzezE0s9ik44elMFL4Pxok6kbfC%2BqmBRbHb1LuxyAGWgLE87S1Fb0wyEuj1Nc89JVpGhkWfuqlKJd1tgtT5t3hs1nkvigR3k0ni3lwV4Cc0Y2ugHWm4EjJx6OVI50OB2mrHl4JnMN92d7mRdvtXOXzRDpjYZMgTExvpMkBivYHhnPP804emT4XYKMCoe4iBRh6bym5JMAEnb2fToJ00ISk0vhVHK25RCTK1762PeytwLDk8RoyndXScBRRZsXBr%2BMP0IxhW5IY1tHjUPG2xw5oU8DDAqcPLBjqkATNIgovdDcmQsY4NKWsZSTEix5eAPFNurukniRxHPwWFfSIMFJXJNRC8uL%2B2OsQMOZp9ZxQkIWfqVjj9ScJvoS2ugrXYj%2Buxs%2F%2F1UfxpFA5XJhsRhGWo%2FgcFPiSBMN3DU2UyLWAV72uayCaAgmkJSQNKHEq2KmQgNsqPvlXedHVHKzTmWo7O95xUlpnEAMP8RlQO%2Bk%2BQ5zvq9TLkmgj2sOtooabV&X-Amz-Signature=bf05f278ed0865b64a4dab540a26cee56fc64dacbd729a2b7aca4f8a90a08632&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

