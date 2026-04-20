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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CFAVRSX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDemrPGbesV%2BZAhQWaozzBi%2BckiJ3KxJMtAzqIImeRDtgIhAKcH%2BtXWf40hZIh0W6hnnaFy0D5mweBS27I0ykO%2BUqNUKv8DCBIQABoMNjM3NDIzMTgzODA1Igx2PyhmU5WxtouDpagq3AM8rNKgKcgRHh%2BkkAEI6y8KHMzvDCpMDBTsYHczijzqSX93pig04RIpPrLaiMbIMi%2Fmlwyesfm79I8YmYhhRCfO2Hs0eTYT73eNMTaf8KRwUx%2F%2FKyfYGMxnu%2F7oxy1D9DUFqJUM44NlAl9HSmmqOQwTJgU6l%2FNBMCihnJr3ePWH4%2BHrlQI4IFy0ueOcf3WcnywEY9qdFVNIS08Tvuf7uVYNKb4wH8%2BkJ%2Fntr63qsj66Ri4rsScOdwfmlekbgvaXWBuUhZPLEBm9l3puwBgS5%2B0b9667DbNEvpciRbWQ%2Bm2Do0tZIGqNY9UWFYdcgMrWmNk9%2B5CFzO0X%2FbIRDyfeTF7EYRKHqt5GHxOCPkPEAIaY4tcOQWLkdqtTrfUwrDTR1BaNqIe0FjmGAPv8BtHKqJqTatOmwG88NyX4AyyxR%2FwRN5j6La2Tkb38RPF9wZYySy0kJkREqDsIqDBIZ5x29b5rPVTaJPcRJhGOPskh81ikP1EUEbd4nBHPaEnDpyQQW8ybUbJQMNrl8%2FZR35g%2FSMzvn69N4m2%2FMVjBZzSCaPXZ5r08svJI1J4cslidi6%2Bg6QLeM%2F7tmINI8TtOBmpAuU9UWgEopTYqEtT52lJjAZNrxteNYh%2FXmxSwUbVoADDF%2BpXPBjqkAf%2Bi%2FTmRiZo2bbsp%2F1sVktns0CU7Y7cRAYP6eyWSPDFjjQw6553JwDtIXjgx7FbvbpzO5%2BXlTBb60IQyroNkziLtoq9jWXaKO1H%2FNCcwmbV5O8%2FZwwU%2F07W%2Bi0OaaTEi5W%2FC6QgPhMhIHaDQecnFQfTqoC1haC242J3aWLnkwIjc%2FTyZNhIAeNcGJKsDseOgKHhQjIqPQDoSnp%2BwxfzetYyrfBhI&X-Amz-Signature=df94b7d051798c42ea2df85264ffceb7ab308964aa63433d4002f7038c3f9259&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CFAVRSX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDemrPGbesV%2BZAhQWaozzBi%2BckiJ3KxJMtAzqIImeRDtgIhAKcH%2BtXWf40hZIh0W6hnnaFy0D5mweBS27I0ykO%2BUqNUKv8DCBIQABoMNjM3NDIzMTgzODA1Igx2PyhmU5WxtouDpagq3AM8rNKgKcgRHh%2BkkAEI6y8KHMzvDCpMDBTsYHczijzqSX93pig04RIpPrLaiMbIMi%2Fmlwyesfm79I8YmYhhRCfO2Hs0eTYT73eNMTaf8KRwUx%2F%2FKyfYGMxnu%2F7oxy1D9DUFqJUM44NlAl9HSmmqOQwTJgU6l%2FNBMCihnJr3ePWH4%2BHrlQI4IFy0ueOcf3WcnywEY9qdFVNIS08Tvuf7uVYNKb4wH8%2BkJ%2Fntr63qsj66Ri4rsScOdwfmlekbgvaXWBuUhZPLEBm9l3puwBgS5%2B0b9667DbNEvpciRbWQ%2Bm2Do0tZIGqNY9UWFYdcgMrWmNk9%2B5CFzO0X%2FbIRDyfeTF7EYRKHqt5GHxOCPkPEAIaY4tcOQWLkdqtTrfUwrDTR1BaNqIe0FjmGAPv8BtHKqJqTatOmwG88NyX4AyyxR%2FwRN5j6La2Tkb38RPF9wZYySy0kJkREqDsIqDBIZ5x29b5rPVTaJPcRJhGOPskh81ikP1EUEbd4nBHPaEnDpyQQW8ybUbJQMNrl8%2FZR35g%2FSMzvn69N4m2%2FMVjBZzSCaPXZ5r08svJI1J4cslidi6%2Bg6QLeM%2F7tmINI8TtOBmpAuU9UWgEopTYqEtT52lJjAZNrxteNYh%2FXmxSwUbVoADDF%2BpXPBjqkAf%2Bi%2FTmRiZo2bbsp%2F1sVktns0CU7Y7cRAYP6eyWSPDFjjQw6553JwDtIXjgx7FbvbpzO5%2BXlTBb60IQyroNkziLtoq9jWXaKO1H%2FNCcwmbV5O8%2FZwwU%2F07W%2Bi0OaaTEi5W%2FC6QgPhMhIHaDQecnFQfTqoC1haC242J3aWLnkwIjc%2FTyZNhIAeNcGJKsDseOgKHhQjIqPQDoSnp%2BwxfzetYyrfBhI&X-Amz-Signature=df94b7d051798c42ea2df85264ffceb7ab308964aa63433d4002f7038c3f9259&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJVX53FC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIHKOyFc63XCqoA9MX1TIHzcR%2BJGHvMEgoLHMB8AnPI5vAiEA2MGdCFyWhtz2gQcKYI2uUwtACLaEXXJhJlCKnyH2V4oq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDF2PuhU1QZu8uhsRiSrcA3ACbpw0B7QEQ%2B%2FQMUDekLO2IPqxgw%2FL5wv3oMY0XSBHbUyI%2FfngiKE1dJfBOpzhnnnICS19bo3cXJE8XcPC8exRCr7IOL5vABIw7evGgBGq%2BKMHgXrrtFKiEDRyFhPspPcw%2FpY7Fv8xfgVNToOOW01KWn3EZ1LVK2lNNWfvo10doFyV4L82PFUmZm1fbtmriWU0dwASlW7xaNh3RzeyOdc%2FN1Cl6Vo5Oiel6YYkNPnaOr0GtDhCFicekwo4M6A1EsLpX5QfrGtvohEmI2NPa3GRe9Jrjn12rBCAZgrx%2BUplCQ9Hs2rs%2FE1Pyz9Q306wFvmndK0Nui96i%2B0ni3lD3jUOT%2FYTk147jfJIYCf1G%2BfUvY6IbkuSd3fz4zXHB6RHooUZN0cZQb%2FxL9f1VxZTcLABLI7ETmT8BjZzfM1QLcOz9%2FJdqgnx8O6YsexOmLGat1e5IdjWpKEdROisRlRlszW9LOlFsQGIYlkT5RQboQ9jqYEasPV%2F%2Bj7BUh8NU%2F%2Fd141n8CdosukdiT2%2BcrfEEtiup6zP%2Bhx1wVwVU49HdCwipmZw%2FiEKubi46iAvwv6lKGaoankdKetCRgJ8D9ZrNSDI6MdzYIo%2FUQ%2FREsmFgkgVBYdubaPK9W9jxpXNMMP6lc8GOqUBO025NwwPuPi%2BZN1IvzaZpnjhiO2L3k4CS8fxQVMSiNYGqLWbzgBzaUAzPsLuHOdbGA3qZ6gYVelqqLMZxKLkeCRFOdxSbA5tflxePw3oGsH84iVDDX6B0UAcNrqEaQk91V55N%2FfMA7Cv2nV%2F5QcjrOpfVjWPQp7T8T44CeGfPcC1u9%2B%2FJtMI5YYhy0aqAlMNs6VOzYQ4f4hMlZOliZId%2FjspF0jN&X-Amz-Signature=0721bb6ff78fc100d7601632459f6fa1f7ed7ea4a4350fa480d49a1b58df32bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYACUNDY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIDtbv%2FFhCVKPdO%2Fr8eNfm%2F6j9XqRht1DNZXFQz3nD%2BEzAiB6Oi0yOT9MrqX6j%2BMBrqqCnjXI06DeObhzMPv5tOe3JSr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMvjRB7HckCCCUVRv6KtwDXPE33EfEKBWOyVABUE%2FCyj4E7bul1ZPWJ%2FBdBY0F62F%2Bp8CupHAAhEl7gEcyx4lFrpnsR3JlZpwT36%2Fpmbte7MuMQzJqttPn1IUKZs6ze2Ie9RTsouhIVpbMGRbfelo%2BWNBcKNc1UsRNwVqH30n68bHmpSdQvypjH2JGXIk6W2q7xoUEKM8tNu7yZ7kunIjzSlmXT%2Bnzx%2BRFT%2FUdda%2B6%2FnFPky2K0AJ5rgkkHx%2By62xCxSixoBGVzLf9ATj9UmubNr91cE2lUKMs508FxH5Wg28ckk91bCbaL4WKAnyi2jHhcD22ENV5kW%2FpkHBFTK0d1xHyGNaqhUOQpUiXDD7PHtd%2F3r5tXpxKKGLJUxXF8eFoA6SoDavLsrfKiVOHxqPvrsGhUFAYzZOKcGrnFMA5Qe%2FOyOF6tThU7PT6eHV9eZNjH3tTtyWaWIhsr%2FgKd%2BEpQO1C9pBHeoEO1PgU%2Bgxa58LaIAbZjl0PYhIo1lNZUEKJz%2B1LH8%2BE1ZnAFkGbqiGGM%2F3zGzITLr5nXMDOHbVGDCwObVakgu%2BFZYtBGNntOhhqC2wwOulTx0BAqhbTcZwAMfkCJJjfIF18sgXA9kGwIey2%2Bs3VFOT%2FKfm4UtGWC2Oh35mxQ316lhkio40w8PqVzwY6pgGRmENNshv1xKF1PUYha9CrBge6oMkF5tIIuyWpERAqm9mCYnCPCzI%2BpqzpV211t0MCJqGBfu6kTvcBQ5lSfnIQxz5pCJFJTgucZDU9%2FZKHgaTYLqXCOGS79s%2FVQGon9HFUcDjdUlLLnieBfXxhGjwiRWdLvgiJQ6V5XV4gmjVAUENnqrywBhuPfGF5IGcEAxLdAKthmRoM5WNlb2pMYbLJZgmt4Hu9&X-Amz-Signature=c7edb72126d549671bdb9ed9544baa6a759d6d18ec3482559c25b92f5874ce33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYACUNDY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIDtbv%2FFhCVKPdO%2Fr8eNfm%2F6j9XqRht1DNZXFQz3nD%2BEzAiB6Oi0yOT9MrqX6j%2BMBrqqCnjXI06DeObhzMPv5tOe3JSr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMvjRB7HckCCCUVRv6KtwDXPE33EfEKBWOyVABUE%2FCyj4E7bul1ZPWJ%2FBdBY0F62F%2Bp8CupHAAhEl7gEcyx4lFrpnsR3JlZpwT36%2Fpmbte7MuMQzJqttPn1IUKZs6ze2Ie9RTsouhIVpbMGRbfelo%2BWNBcKNc1UsRNwVqH30n68bHmpSdQvypjH2JGXIk6W2q7xoUEKM8tNu7yZ7kunIjzSlmXT%2Bnzx%2BRFT%2FUdda%2B6%2FnFPky2K0AJ5rgkkHx%2By62xCxSixoBGVzLf9ATj9UmubNr91cE2lUKMs508FxH5Wg28ckk91bCbaL4WKAnyi2jHhcD22ENV5kW%2FpkHBFTK0d1xHyGNaqhUOQpUiXDD7PHtd%2F3r5tXpxKKGLJUxXF8eFoA6SoDavLsrfKiVOHxqPvrsGhUFAYzZOKcGrnFMA5Qe%2FOyOF6tThU7PT6eHV9eZNjH3tTtyWaWIhsr%2FgKd%2BEpQO1C9pBHeoEO1PgU%2Bgxa58LaIAbZjl0PYhIo1lNZUEKJz%2B1LH8%2BE1ZnAFkGbqiGGM%2F3zGzITLr5nXMDOHbVGDCwObVakgu%2BFZYtBGNntOhhqC2wwOulTx0BAqhbTcZwAMfkCJJjfIF18sgXA9kGwIey2%2Bs3VFOT%2FKfm4UtGWC2Oh35mxQ316lhkio40w8PqVzwY6pgGRmENNshv1xKF1PUYha9CrBge6oMkF5tIIuyWpERAqm9mCYnCPCzI%2BpqzpV211t0MCJqGBfu6kTvcBQ5lSfnIQxz5pCJFJTgucZDU9%2FZKHgaTYLqXCOGS79s%2FVQGon9HFUcDjdUlLLnieBfXxhGjwiRWdLvgiJQ6V5XV4gmjVAUENnqrywBhuPfGF5IGcEAxLdAKthmRoM5WNlb2pMYbLJZgmt4Hu9&X-Amz-Signature=a1ec189865d3f46b51ea98528f8d07464b153417bb4cac552de3ded9e423ad3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FHGAQ7N%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQC7tXwYspHCCeuKxZ9lYZBcZXlK5S8pb5cbkyO6slnVNgIgJiPkt81jTWCKcf3eRQBlcCFbJstqRIBibdA5lzbueu0q%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDDzv1jh0TnjGojhAOyrcA4MPxOFQ5b8a0yqRkMx9I13XyHV343PY19bng%2BG6rawocAozxPyI5XdkU1LwocU850cZlP4ANfTvOB5yc2Ntuxhvx%2FiJL0YU24tZvZQuGYUBUQ0amdy%2B%2BruwDqaX7lZRA3vNGfXsE2N288R4%2Fn2BW4X5Y%2BIT70XNZBSBX8IdNw2z3iy7SHmEupoe7CgYnmeIQ%2FbQ7MQJI2MWxdKLt5%2B6byEnKhTBDFvykL%2BKYvnD2fhBlq2VWOUlhE5QVtWnmySSyiJURVIBDArU7i5JnGJAwVb5WfOkU73B1GmEw1iecF9OIC2s%2BrsA%2BtnkuTHEFqgCJYbjNvst5YklcnDsGcwoCiGj7B1fGR7ZyWeJ%2F88USqVqwzD74n3BIDa79qXBRoqSUyM1uP80v6yiIbpqjC%2B29jF9JoUn3tN6qEv7si%2B6dWJEDp9anVHGSYVZCZ8A6G1VHId5aOzTPtxAGRkZONn%2FPgLgailWJhhhuPONVXTVd4jdBUUSxXKUJhhkuum9NdWvrTx8TvPe%2F1y3yJ1D0obx7oUAGGjpYvxGOHQOcsVB1mt%2B2UHZAgh8TsjFGvzf0tPqaEY48zHDSsM%2BCjnM43PijjSXp3W1x475jBaOTKIPzJ0wJIk3ZvyDio%2B0Xx%2F9MMb4lc8GOqUBuqbotJBuduxxZ0ES1E%2BBKLWzOsdnZMeYuRcX9c1l838rppTuif%2FbTmafEIc8Ng%2F5Wt79NuEXzjbfqixX5CyqTvc9ZtEXNLLMthyjimITmG9%2FwiR4eTtU0cJO%2FJBc26ZQjTm1xbC5ez4lp9UlKX44jxBbzdTrPKYtH6iMkNgaCEwsKN%2Bq8eeT%2BIOAO7qX0O%2FSxnEXO7kPOBWUHMNxpm9BAwvRwvEb&X-Amz-Signature=49f4ac2d31f5ab65cc723ab7c8348756680cf7f174a6ed2af14ae8e806aa84b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQRWUXS2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCID3MTSHtbiprHFlbaRheSt3RAC5oZv44ptQuPgbIoanCAiEAn8kzykjvuFJ14lvmCFjatyxg4fgifQaPodvtkT8aeSIq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDLIsYVip0Ys%2B1EiuACrcA%2Bv%2BUJZdB8vMg78oRJreNXz3xC3RNlzVK51G9eKNUbHV5sy6VoCErrVMRk%2FeX1n%2Fg7TZylBjIOq0ypNTazg%2FRZhXv3tNe3Oyk6GBEyXCMLa7v7gjmruof8KYlgbvyl4s7%2Bx%2B%2BeSbd06f0uFhTKfHLeyUNh3tA5nV0MuD3KaSutXu5jJEQ6aVOc8dqydpV1JgBZLT9o5v3KieNcKX8HMEApMV0EjHxLRey4nnVOQsVnWU9ociJJ8icWYj8GzIRS0HAqPkiJ73jaPgJ%2B43cesh9lXNrnh43uCz1LyyKEUQgQ%2B4LRC02jf0wiQKkhhkUDV4UUY7HFtKjvVoWNgre7MySFvpGkFLn8WnvmaVyMcNrgaD7yFsDcVEHbqqUikRjijglho4BTmOumFlR0kxoGv4PfdN35xBh%2FP456N4MxmcniAuWiu%2BXK6hiH5nhvp51qFjq1kxGT%2BydOzPYwPyyf7mt%2B34yDeFMZijnqSKemQYPc4ov5JMlpcrJrx%2FIoUsWAwAVeFiqu7NHK96%2BqjJWgbHk6NZaa98ldedT3VsOQ%2F%2BW5GOafA4WR%2FOz2gS4ttshfNUEz32d42%2FsNEHplSpDHBdor3kUyGQtvQG2rGm8LfRAQ4QDm47rlvHHpKbSyqgMLT5lc8GOqUBsppv8ySTxhQ8RI%2BXHCOpdjmmBFnQKsgfw4veomQ1rcqK%2BKdxTafzKAAplxK9KWhIPKx6nVL9nl6BfxVYO9f3a3aZFJw7OlHJq1wQqIMTvLEYJbPnvtwnrTXEfyexsDAJ9mkwb5IHbx%2FuwaOA7FWry420qKgLkaOyItuji42M8ZHWtG7TkhiueEpt%2F4%2FqFR8lMusTtsDWswKCdSs2MaqtiEnzBHF0&X-Amz-Signature=f2a8503adec5202be3d253a7764c8d3c1c25fab3511f6f49052b2a0b8417b46f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDQ6ACGJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQCbHyrnrpj1nldgx%2BfUi%2BQDkv7hodyc34%2BHWHpWKHqA9AIgFxtcDpa0Dg3b%2FN8kFI0T2IuctXOvgFgllEwFlU2QnRgq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDEHJdAmZq%2FPXexTMbyrcAxHYp9KGdydRrJyPzuKln5e%2Fx7xNC%2F7KSo7XJwxN0aLlJuTwdGa6JmrNqYpePotaN0ZM01DZQSNghHpezNtErb%2B8kZjaXPjda1y8ArpbzABvu3L%2FdHJ%2B2kDdQoIhH2jIjOuCDkTeyEI%2FkOLrkyzK4Sm3ntUP%2B2YOs09dxNfZ%2BARh8ErZhlmpB96nr2lLca9PSx9Dw6eWoytT6lqrUora6k8N8gR01gka1GjxumyOP66j58niT2susGlbLIRmDaT3NhAFMXXzNDVEiI5IvkLvs6UHt9XuEEfNuTJpf0LNgtTHKSLs2t4G0NJ24ilILb6NRSffp5Xe8ftmC1GLJwCW3Xlrf2LKkc7zwlckcAWgbNmYHiEAbu0ioB26sEqY%2Fx5mtdnk4T5%2Bv%2B%2B4qtPNywWkkvjK35Tqnc3jbdfZZ8hrzuAIlFeGaEKZQFeM9BMqfqBG9XfqrJqL%2Bg9ONS6lssFq4YFCe6hfc4xecu1jsqnHaMRBWOnsEitxRvqItWhMbRUCZ627gVMGhvJ1vqUE5%2FE6wmPny%2FOwpaui7eFND8ANwe8IqL5Xo96GEgtZZ201QuPKMVFiRXdVXjbtoWqi8bIvPtMIUU7gCHSEj6F5HwP6WU1oJCNfWoTlBBqX1qAxMNb4lc8GOqUB3KobiUH0wcPAXoLnB%2F71vgclR9y05j5P64ILPkMCcsDrxNwuLapLyuVTHJ7ScnzQKvFVqUZUE4N1e5OMUb7Lx6hQdbIATO5REIcOyeSWApGe1LRPRhpuYQ4bMCgWd38HK2ElZOvg1hlPCR1OHCImQ7xYpixIMkbFdzPMRj6GvYzM92Pq97xxLnWP%2Fo8GwOXDOZ3mwVVzoD%2FU86xJgOckYR%2Fgv7Rs&X-Amz-Signature=4ecd9812afb228daf98ed7b2100f53ca24a7badcbc4001ec3a7625353c258d66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677FGNDCE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIBOqk7x9f%2FsUAhBAI%2BVTcY0AdGVlOo0jWDhn48loO%2FjuAiEA6IrC2Tuz%2BriiKk2g5Z09Gp%2B2C1EqoevupXpgTDqOTPYq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDM0lmP5LmZajLHgi%2ByrcA9AX1taFKZU7wIB7d29dx7XUU%2Bj%2Fr%2FYSPa43rNWAAcUtCDUtXFwoARvU%2Fvns7eCm2eZy0541GoNKopqx7G12FsRogZDlilxdV8f%2BQHKpXMEJLE3n60cnKmhfE8BdYbjWV%2FM2461zvWt8kYtYnKK14SMeZukdVWqplajl%2BkS0WG3iwkfi7Ukgf5RpzeTMA77SaHJuEgJMK4UzEFPxn%2FLhvYU6OF9qOzZAdUuxkDsa18NYlxWVPt2rJYVQ1Aqv8zDUrywAyHAqldmoK7JAIfIMAkSv%2BgJGsVJxagxUpkrqOh85OuL95%2BGY%2FWpBt6pB76RdnTldsFF5MaArcdHG4dPDB6MjLZDPVsFCRirhYSAbCgCMQ7jSjHVPr%2FuYlNkA%2FAbL%2Fh0xNBCzeIz9FJc5LnoAViwimDWjtHcCDqqBbj%2BQ%2FjHEsSSZMPvXJxw9d5GLLL4JbwCq8GHLnWKSR93%2B61XrldZy39bDEJ%2Bf%2BQg0sIEw0TEnQULiKfccKuASsgDvbJBj0OHCjVXbiOoj2DxtMRUjRsWIoGf2rL1fpBnvody%2BeGXU5yIFBcLfW854o1F%2BOq233HMrDJf6oMSN4J7x4SfV%2B7gb%2BSFuf8oajfg7u9jwZn2aD1WRDl1I9SHWAOClMKv4lc8GOqUBeFroz89%2BE7lRhCLpCOevgAfanPzOXB0BvnIVUZrRBye47IeBzzeOH7i89rvjUuqrXPZhIIo0P2G7QgmLMKy67kTNAc5n%2BYbeel62dQ4t8ACht66dGlFBvVjHlUEVzP7wWUZHK9IE%2BPXA5uBb20NGf2t7N83MaJt6UINenl2eOiPXKCZqUWw7P163NyTyt8DiQvh4112OlkQiE7L3pBrysYRfiV3c&X-Amz-Signature=49e77b11c7248827190d12f94cdad1efe174a1751ab4e79e457036a9399659a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677FGNDCE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIBOqk7x9f%2FsUAhBAI%2BVTcY0AdGVlOo0jWDhn48loO%2FjuAiEA6IrC2Tuz%2BriiKk2g5Z09Gp%2B2C1EqoevupXpgTDqOTPYq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDM0lmP5LmZajLHgi%2ByrcA9AX1taFKZU7wIB7d29dx7XUU%2Bj%2Fr%2FYSPa43rNWAAcUtCDUtXFwoARvU%2Fvns7eCm2eZy0541GoNKopqx7G12FsRogZDlilxdV8f%2BQHKpXMEJLE3n60cnKmhfE8BdYbjWV%2FM2461zvWt8kYtYnKK14SMeZukdVWqplajl%2BkS0WG3iwkfi7Ukgf5RpzeTMA77SaHJuEgJMK4UzEFPxn%2FLhvYU6OF9qOzZAdUuxkDsa18NYlxWVPt2rJYVQ1Aqv8zDUrywAyHAqldmoK7JAIfIMAkSv%2BgJGsVJxagxUpkrqOh85OuL95%2BGY%2FWpBt6pB76RdnTldsFF5MaArcdHG4dPDB6MjLZDPVsFCRirhYSAbCgCMQ7jSjHVPr%2FuYlNkA%2FAbL%2Fh0xNBCzeIz9FJc5LnoAViwimDWjtHcCDqqBbj%2BQ%2FjHEsSSZMPvXJxw9d5GLLL4JbwCq8GHLnWKSR93%2B61XrldZy39bDEJ%2Bf%2BQg0sIEw0TEnQULiKfccKuASsgDvbJBj0OHCjVXbiOoj2DxtMRUjRsWIoGf2rL1fpBnvody%2BeGXU5yIFBcLfW854o1F%2BOq233HMrDJf6oMSN4J7x4SfV%2B7gb%2BSFuf8oajfg7u9jwZn2aD1WRDl1I9SHWAOClMKv4lc8GOqUBeFroz89%2BE7lRhCLpCOevgAfanPzOXB0BvnIVUZrRBye47IeBzzeOH7i89rvjUuqrXPZhIIo0P2G7QgmLMKy67kTNAc5n%2BYbeel62dQ4t8ACht66dGlFBvVjHlUEVzP7wWUZHK9IE%2BPXA5uBb20NGf2t7N83MaJt6UINenl2eOiPXKCZqUWw7P163NyTyt8DiQvh4112OlkQiE7L3pBrysYRfiV3c&X-Amz-Signature=dc3f6adbb46f45d06f9c5a0af0a36cb5e1c4ffc485ed0203c752b10a68aaac68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RHONY2D%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIE0OPgbNfgFcLZOisgKIWid7FBW3q2NnI3AkzukwF2C6AiBKH0xJ4wO%2FyL8ztfgwkNvTuBHTkzNMlcJfEUihOk%2FkEir%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIM9bAbEJVNW%2F5mDverKtwDBs8wV%2BmMWHhctb6mBOsb9e4WkmAPYWP3jzHdgs9gPcj4j11qfW4Hpt%2F6J%2BtoM%2BIWcKV%2FBEv0F6dssF9No9K2gIlUlEouN%2Bt1bZ23lscyvz%2BSCktVlFDYDzecwy2H1zg4oeOe%2BJcWYZ3JwimNtUr7pRNPOmPwG%2BVkvLIEOCqNGbWaqfuLiDoPaXO8dccXn8ELRvOtjje%2F6NZo6EHNkFoebNS3hiN6S25mWIgguKlU5j8bR3%2FhIaxYjIn%2Bs1kclXwSTSeuyfB7VSx6HA9jpSgvI0zAeFIyeeLdHFr2OTGMZZ%2FY3BKjQqaBZe3Ka%2BmJDJPuv6f9xCZDlxBQwBpkfT4MvYKnp%2FtEnqlmGj8lL8f1Mgdsm%2B3iLccwKi2iKLa%2FeGPm%2F4fkltRCTmS0TympuqTrK83buUCCzn%2BT8SSNMsdgR0GShP4u5zCuYNmy5U%2BGL%2BIS6fyJJKiIi1DmujwywG6hETOXi789mnzvC8%2Bz25v31mGNYxKI9hvgMF09NBA1einwNK8sf9xSgf6YLMMbePx62b8eErY52SRBCyGNUaitYnPIqG5jgS1Xc9Qad9brz3JOQ7PT2kT6AqjQEsxLN%2FP4Z2lOHcRDxX9Oi0v6%2FCogNHSEZWZ8yXXek4u63R8wyPiVzwY6pgGo%2FbE9eCwJAolLaGjP1zHxg89G2vLNWahYtDLoAV84tGWFNPugnd22GcGSTkDWDdbDKlBMM7Y6V1HFfHKGfsx0vXlgSE7P5wdy1p1GyVH2BtNyRylAwjvO1CfS6Se16Oj6SgjEm0NUxQtjKZzfWzoCvyJsdNQo7kcaYC4uyaKHshePXCCNSdX26JGNiFDyZDxl9Ss%2FeVY4MmNlNt6tQnUMhIhW8kGQ&X-Amz-Signature=57772ec4a5658809f7cd3d562137dc5433508c30bbb9f9ee4e82560c6161af08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNOPQAQY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQC8qFRcSyF3z6Zaw0UQYbukNF0keTxgMu7W6SJCaPVWqQIgLN8PhM27b2VbMp%2F9N3MJbUGQbb7jaAbYNZR%2BZjZB8dMq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHJ43rhp%2BHFgwlXx9ircA76K2NZxQHBepxO3Mw7Mf0%2FRgsNuEUxFHWHremNw8q7RW9bebh4WbeIvvEWUB2JK%2Bddjd3wACEFqdQ324d6pqiGCjrhxQrXLz74XUNhtE0wx0CDJRzMUQ7EG4PdT2vXPR5ghCBWVFuchZJy0rU6OsUvH5HarjgEnyXbQwRON6HOYx5UiecqM3ucjdNpqaJLpkOh19eOfH%2BVMikO7ClMHSNZNwLOk1JcOxPWfWdoH6Q6MdxrkP67l4X8mob2PV%2Fgb0D2%2BpVcJycBlBOUrXXcHBxHWSiFkuAUhupOmVrHxHGW8YbSnfLis39Y%2BYBcRYeP8wq1tVCtJzvT29Q3YgYEwh%2FUJc2nSCRhqDTyOUL4m%2BiL83Rl%2BJ0F6pi%2FbRJvcfYje9sRm6If1gnH1U1m1xAZDoRuGweNvKFNFTqXFfz6b%2F9xKe1V7WCJkWzpU3tZYYl5ho5vuTdjyab1k%2FxMI55VVxbmOhBNgzpVOpGIsUDg%2B8mdQN71Dv1oKBleGQa7hMtUIkqy9axlwXcliFZoi9byMK0g5w3zwT5XtvONHjURQTzp6jjHaMQGhB1Y5UY6iUKGzbx4f%2FkcXUitHmiB20%2BbC5YIl5DoT6Dajx3tdkjKXmjbRb5miENT1Qa5JRwJLMJr5lc8GOqUBidZsz2H1gWZlgj5HiTVz%2FbtagyY98en6ykvfv%2BeJVxaPBPZoZGvpZKwH%2FVMRVqoTnZITkr3eA6%2BfrL5fxJnQUDDie25lXREuDsyezt4Vkgwq%2BEd3Dh1yDR3XZ5sc2Qf0%2BbsxUxyjl7Qr5Ij01G85Cxx6YVmJEkOWdtPtt2y4sVjQLTNZsPT19Oijuk2SnjfX8U5srlZOzdASbpu94ZE0Rwz7OQ4i&X-Amz-Signature=eee18eb74fdfc211933e08d4884f406083c8c016469dc9d51b70ec30b6a0c04b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNOPQAQY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQC8qFRcSyF3z6Zaw0UQYbukNF0keTxgMu7W6SJCaPVWqQIgLN8PhM27b2VbMp%2F9N3MJbUGQbb7jaAbYNZR%2BZjZB8dMq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHJ43rhp%2BHFgwlXx9ircA76K2NZxQHBepxO3Mw7Mf0%2FRgsNuEUxFHWHremNw8q7RW9bebh4WbeIvvEWUB2JK%2Bddjd3wACEFqdQ324d6pqiGCjrhxQrXLz74XUNhtE0wx0CDJRzMUQ7EG4PdT2vXPR5ghCBWVFuchZJy0rU6OsUvH5HarjgEnyXbQwRON6HOYx5UiecqM3ucjdNpqaJLpkOh19eOfH%2BVMikO7ClMHSNZNwLOk1JcOxPWfWdoH6Q6MdxrkP67l4X8mob2PV%2Fgb0D2%2BpVcJycBlBOUrXXcHBxHWSiFkuAUhupOmVrHxHGW8YbSnfLis39Y%2BYBcRYeP8wq1tVCtJzvT29Q3YgYEwh%2FUJc2nSCRhqDTyOUL4m%2BiL83Rl%2BJ0F6pi%2FbRJvcfYje9sRm6If1gnH1U1m1xAZDoRuGweNvKFNFTqXFfz6b%2F9xKe1V7WCJkWzpU3tZYYl5ho5vuTdjyab1k%2FxMI55VVxbmOhBNgzpVOpGIsUDg%2B8mdQN71Dv1oKBleGQa7hMtUIkqy9axlwXcliFZoi9byMK0g5w3zwT5XtvONHjURQTzp6jjHaMQGhB1Y5UY6iUKGzbx4f%2FkcXUitHmiB20%2BbC5YIl5DoT6Dajx3tdkjKXmjbRb5miENT1Qa5JRwJLMJr5lc8GOqUBidZsz2H1gWZlgj5HiTVz%2FbtagyY98en6ykvfv%2BeJVxaPBPZoZGvpZKwH%2FVMRVqoTnZITkr3eA6%2BfrL5fxJnQUDDie25lXREuDsyezt4Vkgwq%2BEd3Dh1yDR3XZ5sc2Qf0%2BbsxUxyjl7Qr5Ij01G85Cxx6YVmJEkOWdtPtt2y4sVjQLTNZsPT19Oijuk2SnjfX8U5srlZOzdASbpu94ZE0Rwz7OQ4i&X-Amz-Signature=eee18eb74fdfc211933e08d4884f406083c8c016469dc9d51b70ec30b6a0c04b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EDSN7RX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T011408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFVVG7MlJALaRWFnkMZUzxFHZNVKcdm4T1rThG62unPiAiEA9w5hF%2FjT%2BHT3%2FATjXMxvI7wkadZhoHVhNGnkZ6SGVNIq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDIAbCknj%2FdXaFV2sjSrcA2P9JfIRU4Kpy4WmfZg6m7l1f4dnoEwsnVMk1ukFzLguCGFPWU1dAOaE%2BydCalTBGIatKwT8LJJzMhog4%2BkT4KCtNr0xAm9ZAL0yeYNJENrdDBpS2EiV1k5EC9lnSVbbtq0yBZ9YD%2FP2zDbJ0FK6N%2FzD0UKxj%2BqL33VfMZ18uYk%2BDtj4EN7gg6LSZcHLbx0i0Q9n0htkQUP795ANRg2ET5Hr3BrOh%2BzpNew4mJ6gEjra9r%2FBWfyCIZiwpd0bjgO1QeCjlumgveiz%2FPeNtwI3hGoNfTQY2wdgEijL7DQeIvOWZvfZPAZ7LaeknpXjoKEgAvPl7Ww5xz%2Bkg0AY0NQmQz46VcuTIfTAjC6G6t9Ui40kF89PsSFplUqHQ6YLr8PB%2FWS001yFP9hAtj%2B975zYKzHLMsbJyfj%2B7wH0ltDBK4p6zspY3i9avPZACn%2FEWDCjTrbE2uXm4iAkKnBSjNTFzYqgBYPPwuLvnbiDic8AKCoGr7AAsDqiNMqHd71ooX%2Bnt5h3%2FxO6ZmnCRX66auXxPdiMrxWdJ%2Fh0AIrJ5IsWz8xyNnBd7IWjX0fGl8SOthSTzBu0oNM%2FE22xfuzDCz%2FFCNOEKFP7Scqar5hd6JLsl7Uh0nPXDzUBug8bslmCMI34lc8GOqUBTC4EhbbnpqNVM03dVUMc3GjBHZPVtYAWxX0pneFYeBoxs%2FfUA9fa5KD1kMAya%2BHFD9%2BsAC0xs4Dvx9CqoXA5GuZTrV3aadIyIq2RTsfymGy6qmp5QnvBd3kPsS2GI8f5Wt4n3FPhvUs3LN3zHbNL1pEoj2zxmIcLITCBjNypWV7m23ddyt0I5PAigURxefgO%2Fixfg9mJunj%2B4JI8M%2BoV1x5eIjiP&X-Amz-Signature=eefa0271b0866fca2313a761448c82be5ec1f3b257b32c5174c7f57468617bc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

