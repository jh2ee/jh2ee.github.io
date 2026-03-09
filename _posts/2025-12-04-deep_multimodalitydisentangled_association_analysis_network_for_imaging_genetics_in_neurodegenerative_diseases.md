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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CHBACTK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIAM%2F01EJcyZ7wduC1MsEa4yOl78zQSiolSnzlE%2F8Uu5SAiEA79YMnlYN9EtvEhN6Mn6S56la4Z%2F8BSFHGx4cyHkCY4Qq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKT4BQ7s72vDW%2B8pdircAwYEv1XHGW1OMf7FEW4c6cq4CmwPZ3Zw8GVRA9UkEFpjlHNBDDLbkNc5agfpMU2DOIS6TkNXhTem7Sp3HZQPwoK%2Fb9T4OlUMcq0jBQPUS4TWZCklLWWSRPQQTs4oljx8Pv3PlfJTExzEBOJcvh26lEuKYL824Sveyk2HaOYNtAZY1FxX%2Bz4qdVLHMCR%2FGYX8Ah9NGe19tLRn9Uo%2Bkfif%2BBa%2BoC2NXtspAAiUtg6nhmQnv3OeneaExWNrBkhzIOo6iF6iYA3RgqUSeLET%2B%2BpCBq8%2BkxPot0TW4enY9UGXLAuYXX%2B%2FpuGXqxvmUSVL3DxtThNSG9a0TNrY0nsKLFHO0F5FFd9zczkVDkji6zZQrb0c%2Bh%2B09n3VsXiR4cUutjAYM2c5Gt%2BocarQXjet0GsEn%2FMuygZkFRYSBCyHT5JhLGtnc5R%2B6lXPjgCHbyy8m40NnD7mVzJIUrYtX%2BXpcYsFR6dZ4WGcSrNEWvvAbCblGoPQSZVinu%2F6Jkq6r%2FuANZcNmuJikBjwTvtyZ6EemuYYNdhz%2BkFrbM1QNBdvG%2Bq80dMlrH8yN22mSs7gUUQiNQTJ4n0K9TQipvjVeZ5z9qwmt27je6scynhCC%2BEqYO6LX0NMdIQ20w8YAIaJlDrcMJWpus0GOqUBix13Q%2B4Jqq8r6%2FjjN5g72QqFQEhKY3HwzqMCsmgQvoMlxkmIRnfkXorUQPZkKEEZiKaCcFjxb4KRUpmri%2FOMO76Ng2yxqFAtyDLSU8cOQBn5Cr4W9a9M0h8haIKXLZMYzFZ%2F61VJXGWqcFJzW2VBc1wxvH%2FVGOxuDoZb0t2uTQyln%2FjeMrjme6svRU9vgYyD%2FJ9vAx6y0hNizWUTaRioiFx6zW8U&X-Amz-Signature=519b99c61cad01bb9393d22631f9032cc00df59cdcf7f9ecd9ebfc7b1f37e6ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CHBACTK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIAM%2F01EJcyZ7wduC1MsEa4yOl78zQSiolSnzlE%2F8Uu5SAiEA79YMnlYN9EtvEhN6Mn6S56la4Z%2F8BSFHGx4cyHkCY4Qq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKT4BQ7s72vDW%2B8pdircAwYEv1XHGW1OMf7FEW4c6cq4CmwPZ3Zw8GVRA9UkEFpjlHNBDDLbkNc5agfpMU2DOIS6TkNXhTem7Sp3HZQPwoK%2Fb9T4OlUMcq0jBQPUS4TWZCklLWWSRPQQTs4oljx8Pv3PlfJTExzEBOJcvh26lEuKYL824Sveyk2HaOYNtAZY1FxX%2Bz4qdVLHMCR%2FGYX8Ah9NGe19tLRn9Uo%2Bkfif%2BBa%2BoC2NXtspAAiUtg6nhmQnv3OeneaExWNrBkhzIOo6iF6iYA3RgqUSeLET%2B%2BpCBq8%2BkxPot0TW4enY9UGXLAuYXX%2B%2FpuGXqxvmUSVL3DxtThNSG9a0TNrY0nsKLFHO0F5FFd9zczkVDkji6zZQrb0c%2Bh%2B09n3VsXiR4cUutjAYM2c5Gt%2BocarQXjet0GsEn%2FMuygZkFRYSBCyHT5JhLGtnc5R%2B6lXPjgCHbyy8m40NnD7mVzJIUrYtX%2BXpcYsFR6dZ4WGcSrNEWvvAbCblGoPQSZVinu%2F6Jkq6r%2FuANZcNmuJikBjwTvtyZ6EemuYYNdhz%2BkFrbM1QNBdvG%2Bq80dMlrH8yN22mSs7gUUQiNQTJ4n0K9TQipvjVeZ5z9qwmt27je6scynhCC%2BEqYO6LX0NMdIQ20w8YAIaJlDrcMJWpus0GOqUBix13Q%2B4Jqq8r6%2FjjN5g72QqFQEhKY3HwzqMCsmgQvoMlxkmIRnfkXorUQPZkKEEZiKaCcFjxb4KRUpmri%2FOMO76Ng2yxqFAtyDLSU8cOQBn5Cr4W9a9M0h8haIKXLZMYzFZ%2F61VJXGWqcFJzW2VBc1wxvH%2FVGOxuDoZb0t2uTQyln%2FjeMrjme6svRU9vgYyD%2FJ9vAx6y0hNizWUTaRioiFx6zW8U&X-Amz-Signature=519b99c61cad01bb9393d22631f9032cc00df59cdcf7f9ecd9ebfc7b1f37e6ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625TFRFW3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCICwRTvRHjGYfE8k%2BCAkVpK%2Bp56rNzpxV59nvuw6NZuRSAiEAp1F0HtV3mm9hwHI9scHfISy7l%2FGmGo%2B6mro3v5k2w3wq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDBSyJKyBU%2Bcbrg%2BEESrcAyBROHaqwOLnRg3TLHp74z7dsgHvs4GHyjHR4iM04hHDb2AHK%2FpBEhlCNKvb4JDmHtNRIbo7wHq8au03azlW2eDs0JN9XllW7lS21bY8UbTCxhPFVshQ2Cxof4dt5s7iIpks7wgTpuixy7DQjd1%2BtB%2FH5RxLPW6fUjUZJQ4WvVuep1zdSMj3rxTjrZx95TybigHWdZyJ4QdPx4iQoHsxUfF4vssKeQrge9AOdar4c2DafDViIsEFg%2FAGHGvTwtdqAYU44uW4yf%2FqUuMrksBOmyHWgwcC3Vzm%2BkBvStdpBOzZXT4VxtGhJBpl%2F9Bj6skHvWlAveSJsz5EOyBrEsVKNCefxD%2BIiqDdJmceYfZyi3BsUBaUu%2Fj26QhCid1RJiiuWtpvSyBzCHpBQ%2BVSGB454VepQ9xLbXG3YSdZH1Y5CBOKzyYnjTCpR7RqEboJ244mGnY8Gc77yCsWLrfh5Cv3fbmwfp%2F%2BSoskbHg%2Fr%2BEAaggbxS9HGBqYR6ltwg3ycBR551p5ch2AfrO%2BEWf2XNdLKawIgi%2BEO%2BpqfkdOxhSbyRbAZWKPsa4W2j2V0CK3CmihLtuU%2F74ncJmIelfeKtOr%2FOPRvomtHamJN6OU9pwfCKBIY7FvZBLPUHpC4M%2B5MNapus0GOqUBTskpEpCZsF5tA91%2Fe888BilJvKQSLZ2Itiz3E%2BjOey4v2xQ5xWsnP8ab9CNpRlLuv5GJLrsIYVnOrgDzu2Qkp5d8A7YZH%2FvE89dt8Khs%2FMYY2OXA8bMfs3TNGZyDS8x5SCTQPq65Nz55yc%2BZgKW5q8CgyrW0KkJMgPpWpm%2BeDP%2FFanVCb4%2B0CeOvH0ZHovie6Tv8U4hWlR%2FZ7Arttp3jcNNKLfYT&X-Amz-Signature=0e0b163c112c08125a1025450da33f18c5279401da00d38f5e703aa3dc334735&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TSZDEZI%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCgCUnOn6dOqKK3qn13SRwOpOgBbPlLSGH7CT%2BPqQzSXgIgKcf6cC1Jwp3x8wpckU9Zoux7RUvXhd6gLpF%2FCNjm9jEq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKT2BwWdExSKi0GayCrcA6ET%2Ba7kVos2PkxazGB7vu5Hxm%2F9iYfCfUfUpQR2zKUdd19QFVr6uzSC9%2BuZKYix0Iiap3UdZKGNmla9H1ztteoYev5wnqpoXgAXZRqwNDI1Z3WIW4dZo85noNzDnGyV0SIJevnJfBs8gkuzMWjh5XVPG21SrDDtbsqyaDOHbu3lyYOwfsplJXhR%2BE780ls9UNQlUyU%2F1LAfyFGbEfKumgfnUeej4wdW3v6zdZGUHXGzZOH%2FewqCEopLISek9NOOTZLAHh5xLrr1qTcovP7BkZqKLHHSRNW1UO%2Fq1I94PH8VPILmg2QLIJYg2GFa3R1IS8h4de46BOfA%2FjaunMv%2B4FsZQZ9x%2FHzt2SbFI3goJWpInjkr7i2Prk00JWFR65dMuQqfOkmzg3KLGQUaInta2%2BV17I%2FTxzrBzS4YLEhlS0YOMxVsaxhvN8RnmBY5%2F60VgWhQKy0S8S3lOhkdUt6J71DRviyc0j0rqO%2BOK4aDd7U6Me2CxnF4PPHiiVGilGlOEb4%2BlSxYirhozp2N1KkvJH5z3J9croC1yVrhpjE9qcPzzcUSXxPzop9fUFgh%2FNPTl4T3nO5wJ2XbbSTvQ50Z1Nk49vXrMKb2XuBet97AqhC65cyf4GMsqkXI%2BNoHMLOpus0GOqUBRWTM36EyWRsIX72BshNhxgn1SAvvigUlXCutXAJEv8hzBtnXwPU1IVC6mVqA7PkpmRVVfe67Qvk%2Ff86TrhbaMshMv5MOCiWO8fRccp7Zm6I4BvxwrSkuLcSpc%2FlN1EXST1sZTDmuEJPXCSMPVY644iFEZlSicjKG2JnEB0yg2RssU7SbWaD6lVQfeU1MykCBeK3zLnI%2FMKlRSPV599E88wXycM%2Fb&X-Amz-Signature=65e6783ca42218a20620fc91063ec0968af1fd9d8cdc3b0ad6b2e779cd6b955c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TSZDEZI%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCgCUnOn6dOqKK3qn13SRwOpOgBbPlLSGH7CT%2BPqQzSXgIgKcf6cC1Jwp3x8wpckU9Zoux7RUvXhd6gLpF%2FCNjm9jEq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKT2BwWdExSKi0GayCrcA6ET%2Ba7kVos2PkxazGB7vu5Hxm%2F9iYfCfUfUpQR2zKUdd19QFVr6uzSC9%2BuZKYix0Iiap3UdZKGNmla9H1ztteoYev5wnqpoXgAXZRqwNDI1Z3WIW4dZo85noNzDnGyV0SIJevnJfBs8gkuzMWjh5XVPG21SrDDtbsqyaDOHbu3lyYOwfsplJXhR%2BE780ls9UNQlUyU%2F1LAfyFGbEfKumgfnUeej4wdW3v6zdZGUHXGzZOH%2FewqCEopLISek9NOOTZLAHh5xLrr1qTcovP7BkZqKLHHSRNW1UO%2Fq1I94PH8VPILmg2QLIJYg2GFa3R1IS8h4de46BOfA%2FjaunMv%2B4FsZQZ9x%2FHzt2SbFI3goJWpInjkr7i2Prk00JWFR65dMuQqfOkmzg3KLGQUaInta2%2BV17I%2FTxzrBzS4YLEhlS0YOMxVsaxhvN8RnmBY5%2F60VgWhQKy0S8S3lOhkdUt6J71DRviyc0j0rqO%2BOK4aDd7U6Me2CxnF4PPHiiVGilGlOEb4%2BlSxYirhozp2N1KkvJH5z3J9croC1yVrhpjE9qcPzzcUSXxPzop9fUFgh%2FNPTl4T3nO5wJ2XbbSTvQ50Z1Nk49vXrMKb2XuBet97AqhC65cyf4GMsqkXI%2BNoHMLOpus0GOqUBRWTM36EyWRsIX72BshNhxgn1SAvvigUlXCutXAJEv8hzBtnXwPU1IVC6mVqA7PkpmRVVfe67Qvk%2Ff86TrhbaMshMv5MOCiWO8fRccp7Zm6I4BvxwrSkuLcSpc%2FlN1EXST1sZTDmuEJPXCSMPVY644iFEZlSicjKG2JnEB0yg2RssU7SbWaD6lVQfeU1MykCBeK3zLnI%2FMKlRSPV599E88wXycM%2Fb&X-Amz-Signature=b9e409cbc8de2753f1a06b0cda75b8289bdf9076a0ff0483f07834a79a593d42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNWEO5GJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCJCwzhoMx5mSgFq4IOVGkaiMNyWm%2FQ2vrx2nmOVf1IagIhANsS1FVqwdkwTJAbl03e3V24LXXS90YGcsarhcpUwbtVKv8DCCsQABoMNjM3NDIzMTgzODA1IgyuenA6qIyBny6c9jAq3APobuWx8b0Kklv2DDbwletEpEtTWNj1he4ofKYzh5%2BvPclU4g1pfEYmfso4Yl8AaQGmI0c5AjTaonFIC4Y%2FGBpCkXMG5A2BKq762erOXkI2si%2BCNd2i%2FNOG3xv%2B3IlWkdteLDHHVlqxZJA93rTJH3DarWJlu560xPN8itIVEqmDCsRbSkiNNOQZF8%2B%2Fgt6pf%2BeEuVl74s2ma0d58a6trvu%2FJA9Hg19N1sHabuMT5ixudf67aHbmP%2FX88IY6FSawcFkWbJ2lyXFKzVLOzidJu19Cs1rGgZ1jpG0frYjTd0k215k%2FWkD99XEWYMYLcIQXKIvsjOgFITpJB7ez%2BHjVC4DHDTEEqFNYb9DYWKx3oGfL8KpKvjhbBUTFZwtXVQ%2BF44lZy05CWYogZy3Un7kTmzCrf7UGHOxyDHAXgvlDtYlnq2juc%2BqlV0UmSwfPVYNWqxl06mzOGksgEPmLZUiQKI%2BKK15uGATdO1AJc8%2BgYEfRZbzQqTseqD0z43p5RIj8SkMpH0jgbPBd5lWCgglfnxwD4UHd8c2MQfvbnT5aSPULIthR9yuelbeAYtha6T7HVmdzx%2BX1aq%2BgIp38NWuS9S0xGixExXLEwdtZjgYndASHLd2RoaF3r70Laxxs0TDVqbrNBjqkAVdXuoUnG3n05EQnWZoqrhSZr%2FbZKFzbI30HYLtHL%2BOsmL6Wl%2BVaXsz8zA%2BzbbVVenHKmBGpV2KmVS3LurymvEecIjRWEkrTuq9xrrQLACtpm9J%2Fq3lGXmUv5qJKQtvAvGzJ2sS6Y8xnnODNDZ4VOyDDYDEW7cZYFajHZAY1KHaAsUIQCQ2ntNtnQHHS3QKdnYvv6PYRE66TcZ%2FtVdZSZMS0IDSP&X-Amz-Signature=fbdc557b4b91ec08556e6c40a350783116c4c628195309dd2ccf64bce7db77fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672DE2VTR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCJWj9tsOmOjFPCdvtfoiR5evNCT2Qu%2FjPw7l%2BZRzfSkwIgSCZGeHC0Ir17%2B2J%2BRQCI%2BvhdZM4WSVxf%2B%2F7WqNluHLMq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDOv73KsLDvWEiqkfByrcAzS75Yhc3gfvw%2F0EgOUwUg8KGu055T1vtI7IrOqduarPidWVjNfE4qrqpvU5pGdTTfT0f49uDvfw%2B4WzcDgBY32tiU%2FofNsWXhVLBdEbhrwS9fK80tYk20A3fVj2I54SCSQjRD49biUE%2F56p6U9Ngie0jpDC630N7WxQhSY%2FRQFZGu9l65i1NfiDn6id8Y4dUNY5DSlICxvelI%2FchCyf9U41BAnZHmfsAr1RUKFnGnnDWHZ3%2Btddi3pWqebDnYwkZOe3Bwt3oK16LHQBTPgzSFJ%2BeRnUpquNEdMKHAEAcm7IppXV%2BW1T404BpfNDYvF%2FJ9tITXhszq2BBxKkA%2BfXETG%2F65E1GyCmWsrdgCRYyEd0bG%2BZcqD%2Fjt2WRkEtX7uH45%2BpTCSXSJxgJ5sIY8GwChewf3jjJf%2F95aYoGMYdQY%2Fkx0YmX1WkwNFfDxyGFQra6EgGSrRD5Q00fKFusNrMemgHfxTxVxuNwiQyzAY%2BCNxLRAvElLAMLg1LG6IZXIACuQ12B%2F0kwjva51ReQhZIH%2Bo%2FweG1N0wtpcNvLwoNdBlx8ghNyLYih2ZzWFhaUypzVaJfWykUWXmy5rGNR3MdpYHqX1nGhxWYAidJKdKDNpgSubAG%2Bd7qS5G5xtLkMP2ous0GOqUBBIGNkSyCMGHANFiDXLLzWwLnpEa7%2F3FfwTWZ88aCK5LTMpxc2EAXHU%2BBd8fE21UAED7zHdEYhYga%2BTmadKhV%2FqSveeWEpz1e79pvxWtK37znxJUmR7VRJ7KQ%2FYM8qgtLJXlD3B7OGZTyPbT3fl4aFObzLhomOBCUFH1jeJV4hVuPEHUmyMLbmVFC%2BlycjRQHMuO7v7ne6J7p5khBs%2BHDMDBckowc&X-Amz-Signature=5a30ac79b9513d389af35ccbc643b2a5f6fcb18d7ac2ea6e1b10f339d4325918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWVWE2B5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIFjM1YyXrfyTeaW1NQFsiQWT03i%2BI%2BT7uAfK87baUMTJAiEAwYczbz4Be6EwueoM7bIsf07VRuPRCDtvka%2F8xJUtTvYq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDM3209fu2hXheASjDyrcA9NNvKCPQlryJyRubROv8A%2BTGlmicPfxZt5k2c%2Fmdtf2FMVGGAh1i9CuQ77PZv8ugr6CMCph%2Bveezy3RUaG%2F%2Be0Rem3VAJwZdsX3ZMSm%2B6369RneaQPui53hrKCgVjt989rOhAJmpP8sMH8c77Ro8MuwL1Mtq47bah3lkP3eoPF6Te93KB%2BlwjA75nhpM386uTjmy5Y8jBzwwj98aUx21LTc4yWFCtE0EPp%2BiSqZ5JdxGpfK3tElZWHCPSjhRJDFlbY%2FrqcaCy1w89VARqLQA3vU1A4K0nvubvMCNcVXrUxEYxc9WNxwSEGqopixXCOZPw8tkLywB8TjtVDHI900%2FZMHDv5V%2FPPDC8BTG3Vfko%2BypiU3k3fJzaP9q1IgO6X6jrP%2BSl6DNzed5a6EBQaTiWp%2F6yDGOMspqeB7YnQBdufGGZSfIMQWZr3fI4aNRyftNZbFeKjDKJAWgTSRwBiVrcP8WXrp%2FPt30JlKDCuD8m1A%2Fxx4PNGSk1HH1rCsT0qrKuiZ4gj4EGLM0DKyxgL4b5CDZYDHTGZJKLscf3372%2FTCZWag4qFPycDxBYkbPKrzuPCSrQyTa23HZj4acwMW6EDolq6aRdu4WQSdvNRXB5miHEEDmjz01lJTOgZbMMuous0GOqUBDc6LZeTP3Zy7XbE2Y%2B5cu%2FL4h9247A5pCgAYoIK2ATICftuSqiDJpb9B6h6cjHNuxzkGdHGOJcBffQfATJgzOroGJ%2BpVf9CpQz4dSPdjpea%2Bx74juxXf2k%2FDajl7%2BjtUIuvYF10LbYvMmB3DtmjvVZokoi%2FX%2FjGzzXz6Xcti6Lu%2B8ChgLlpCP4BJpZxRj1Kt5QcLk7b6yrxuLGcPqDi1gJ6mVzBN&X-Amz-Signature=0d4980df2c401e4ac5392c44cc7232c80a9780c82a464e316181bdab4a302592&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V4DI3AE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCad6fPWlnoZcHv0MNOxMU59G5WYOCai16%2BfMh13KNR6QIgeU02M9U1bj8k7L1l10Y5cpI23%2FpYso%2BqH1PVBtqAnPUq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDAssr5TRtYY5qORsjyrcA8QXtEwSvuCBalEQnHvgmg5nRfbVHUUUWI8uEAbKWMcbfTaoh6YS1ZgQRCdxflqqTjmmFzzS4kQn8pbHpF74PLY5QXhCUF3YOSRpJXeBxsS%2FQ%2FmdsQky4X1TbmTSHDXPypmQyqQ%2FbJKqj1mVKaMLAtzf7iG3qjciWGGQnDQQt4s02oWnNiFjjhnwyCaj4fsMNG9uW0VB6Q4jNFf2p3JCOIcoJ5wVHmFogHoPPVuxEgJTzg9DlrBzsDlsjzwSC8JInkkWje%2FINox4zk6%2BwrYA7JIA59HKp5%2Bcm%2F82jA7DqDBzfx66o%2FYKpR5N9%2B5nMaRUxXWK5RPvWYEd%2Fj3qg9eIqBID1HV0hBC8Ulg0rRogUG4VsXQ3NompfcW00f86uZFF2By91lwXsPc9FUAgJvFyhc%2Fh3gR3WGn5LpLYOQ%2BuApRA2LSkajEzfxhiC6pNBbA1Ud5QsPnjWU3PiR0IIAosfTahgO1ZxPjli94A6pcOSVWnHTnvT0MUY1ERECglxSUaYck%2BWKMv%2FakiEBD9VIEiL%2Bev9N4Z61n6cQzPHf%2Bokkin1ip03h%2Fp7KDEX%2FSa%2Bk9T9UsdIi%2BPBcHVA6yIdU4rIQAWtEOUGmatLHBxqoUE1GJyPZg7kwfOjrqAdx0QMO6ous0GOqUBCWWOGkOCP7LlpNgYpAeJIRS7%2BYJQ4qbt1MNpo68p80c7T7oVc%2FUoXV%2BxTrDGQDFDjkbLW%2BJdAnmWbPQZiRnctqT9oqlIiv3oMzGCvz4a9lSemesZTSBJJd9AQ3Tqq08bzFGSTtEZB6l8QR6rn66QZ8ipbPsnx31XSJP8Kn722rFt2cdfyqgqVphoxWYHPXhHiVoIvjd38fqfONUTMdk8ql3PjvxW&X-Amz-Signature=4fe39aaf040fee6c159857832b3d3edbf2ead25ce0f3f7a1c96756c734523356&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V4DI3AE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCad6fPWlnoZcHv0MNOxMU59G5WYOCai16%2BfMh13KNR6QIgeU02M9U1bj8k7L1l10Y5cpI23%2FpYso%2BqH1PVBtqAnPUq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDAssr5TRtYY5qORsjyrcA8QXtEwSvuCBalEQnHvgmg5nRfbVHUUUWI8uEAbKWMcbfTaoh6YS1ZgQRCdxflqqTjmmFzzS4kQn8pbHpF74PLY5QXhCUF3YOSRpJXeBxsS%2FQ%2FmdsQky4X1TbmTSHDXPypmQyqQ%2FbJKqj1mVKaMLAtzf7iG3qjciWGGQnDQQt4s02oWnNiFjjhnwyCaj4fsMNG9uW0VB6Q4jNFf2p3JCOIcoJ5wVHmFogHoPPVuxEgJTzg9DlrBzsDlsjzwSC8JInkkWje%2FINox4zk6%2BwrYA7JIA59HKp5%2Bcm%2F82jA7DqDBzfx66o%2FYKpR5N9%2B5nMaRUxXWK5RPvWYEd%2Fj3qg9eIqBID1HV0hBC8Ulg0rRogUG4VsXQ3NompfcW00f86uZFF2By91lwXsPc9FUAgJvFyhc%2Fh3gR3WGn5LpLYOQ%2BuApRA2LSkajEzfxhiC6pNBbA1Ud5QsPnjWU3PiR0IIAosfTahgO1ZxPjli94A6pcOSVWnHTnvT0MUY1ERECglxSUaYck%2BWKMv%2FakiEBD9VIEiL%2Bev9N4Z61n6cQzPHf%2Bokkin1ip03h%2Fp7KDEX%2FSa%2Bk9T9UsdIi%2BPBcHVA6yIdU4rIQAWtEOUGmatLHBxqoUE1GJyPZg7kwfOjrqAdx0QMO6ous0GOqUBCWWOGkOCP7LlpNgYpAeJIRS7%2BYJQ4qbt1MNpo68p80c7T7oVc%2FUoXV%2BxTrDGQDFDjkbLW%2BJdAnmWbPQZiRnctqT9oqlIiv3oMzGCvz4a9lSemesZTSBJJd9AQ3Tqq08bzFGSTtEZB6l8QR6rn66QZ8ipbPsnx31XSJP8Kn722rFt2cdfyqgqVphoxWYHPXhHiVoIvjd38fqfONUTMdk8ql3PjvxW&X-Amz-Signature=1c1a227743b7b4124dea3d1c70416c679c11890106c4af83fd433b2ed75b57d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBXJERVG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCd34fAKYuioMJQhDBCoBdasnCdlSHODgOAL%2BcRCXGodwIgZAxWeIoefaOlalqUs%2FaRDH0iJ86TEXrURThzquN6yWkq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDDMN0ctEEvM7mK9LjyrcA3YuzwOqYb6wkifjLvHNuUWUTo5zdd3WRwSbcBuJnK5TGP3Q%2FVU843n7Lb2AOX7B2bpHCXTUP%2F8XkTODmMkNupu9q5kBKW1OfKd3ORrtBy9yRAOorfAq2ClGi5yRLCV16osvHEMRE9AxkLgUQ93v3Kgh0sohrcDeYHYMDjdF6XDt%2Fcca%2BGzllUdTwQ2zA1yvXdURs%2BbK4yppdxAmrgYxg8aE2dxeQ3MfgSCHlMdWd9ZpK9LrzcxEL0tZJ9zr5OIP4q%2F9Vkvej1wBW7VxC7MR2LAj95cjhRlUC42CFFLcjy2wNiTBF%2BIUnJRdJ6ouxghMY%2FYgOhg6osBJDEu6qjOnUOvpky8ZL8b18P0XPy5N%2Bag1JGBlzrfRSt9%2BhQwqLgKfOe1uy7iY0bQ0pnZAyyXZsPJ7ufKajPm8P8BUrAO4ocUHwru6yUU%2FyTvVT2yIwo7p%2BPyErHuyFruxXZ23tkndAqE%2B7913caeUK1hXgFzXdGYKRL9A6jjhkYQJo7n0tXcKEFlrYi8NpJq%2F4R2T9PTRLYE99%2FgC%2FEPSn2lU4AnJI6Yd28aVLr8Rr4OuZLlP5QoQs93q6R9PfITQcj6Ic1boEyXgBqHxke2apSlsZEP2VejC%2BRCOKFcwPtD19e0oMIGous0GOqUBJwi5AKv3FvmrAt1PLeqrKk6znDd4hHtzc%2Fblm3Db%2BINE4Uscabf8N%2BWkS6ZOAhgsRxBLQsGYI89RMZTg0J8iBtrX5zM%2BWIKDhp2VSQpK0B5R0%2FaY8%2BWZpU60BW81PfC5Nl%2B8OW8KFFwQ4y7eqvow0Is9NXNgfmykfKOu%2BAyjxa3YdyCjTU1G9xzdqSLpnRT1eVIad%2BMWEvR10JVEPxSPmh%2Fl4dkr&X-Amz-Signature=91c90da7d0f19e020905fce61fa39792aa779e91b560cdcc050a32fecd40bff8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN5BSAS5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIC5fBeXi5wDtxMG0FYvam17m8WquhDtkvVwYeaJigprzAiB%2FFjitViz6wHDVhIjigRTWEkZmYQUyKJ1XVv18%2BiLKQCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMGpfFWBAuJd5NRy8fKtwD4vzl30YtOMrsjNQYzVGtiCukvpmjctbuxI8hZdiSOyjCqIC3WdpajY5Qd91iWpqxVl64yCFlvp9b%2FDHdMCSmuuPhrJKFogWGqxXQb7wmCe%2BFzD25aMkb%2FG7nOl6luYVWDT0%2BP1Ws0rkcfdcUZ6Rpv47MjHpjA4ev6MziJlDySMiIQHJJVxrthkjaJtBteOLSuECeTSQNLJQAdEo3KEMHMZu3Q9UjnUm0tQbaYyywaAUG5LB%2Fqh9VOIUW3mOMzGjE1uZXFAKdB5UDMeIxr%2BJVFh9mDxoy4MstjCZcxlQS%2BmwkzzOS1USnBXqqQxRAjCk%2FFra9Hci6lbRsFhzhdrgNnrnxGc5qTbiMnkC8U0wlAonsuvmGrPG7ai1srEE%2B7IWAk9YAMqsjXRn3hgRJJKGN5HOFRvmZvfqrudLS5PStZSHOi3EA1cV5ywhWqJMwESkR6J9eMkkCyHC58MGquR8ybZPARydclf7BfjYYQrwEdgHrHQGx97kGSV0wEt12ZQou07L2UsiA6L6QH38BH8helPjhm3rAfOaCF0x3rK%2FT0h2%2FEC%2Fj2UAOGShfKaeYWT1oWmNKeVUDX1yj39DPqqwELHfk1qe4%2BnmOdzh7HQQHGg%2BF0vd7sxNnhEIvGB0wjqi6zQY6pgEOs75%2F0QyAB2DtRn%2B800vgnqMpwZsoeCgjcZJnb5MGkwWgDf9uvnlu7uHn2vPkybmJqWikYH5nriRuEkvMdf1zwLxTCN%2FaieXXllbli1bQ6PBVRo%2BP89Hp%2FgCuCSJzfRTnBoeA9poFzcHra5O6MaNe0oWrwOsqZP5GXs%2B0PMNxPDbG3%2BdDq8C3PpUMfTWDpetg%2FPe%2FojYNHAsaiTI9v1D0cfUwKfXH&X-Amz-Signature=ae8821f7996ad0a4b4ffe17aaeb5df3f1cf69463f326f56a422e310bed0bddee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN5BSAS5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIC5fBeXi5wDtxMG0FYvam17m8WquhDtkvVwYeaJigprzAiB%2FFjitViz6wHDVhIjigRTWEkZmYQUyKJ1XVv18%2BiLKQCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMGpfFWBAuJd5NRy8fKtwD4vzl30YtOMrsjNQYzVGtiCukvpmjctbuxI8hZdiSOyjCqIC3WdpajY5Qd91iWpqxVl64yCFlvp9b%2FDHdMCSmuuPhrJKFogWGqxXQb7wmCe%2BFzD25aMkb%2FG7nOl6luYVWDT0%2BP1Ws0rkcfdcUZ6Rpv47MjHpjA4ev6MziJlDySMiIQHJJVxrthkjaJtBteOLSuECeTSQNLJQAdEo3KEMHMZu3Q9UjnUm0tQbaYyywaAUG5LB%2Fqh9VOIUW3mOMzGjE1uZXFAKdB5UDMeIxr%2BJVFh9mDxoy4MstjCZcxlQS%2BmwkzzOS1USnBXqqQxRAjCk%2FFra9Hci6lbRsFhzhdrgNnrnxGc5qTbiMnkC8U0wlAonsuvmGrPG7ai1srEE%2B7IWAk9YAMqsjXRn3hgRJJKGN5HOFRvmZvfqrudLS5PStZSHOi3EA1cV5ywhWqJMwESkR6J9eMkkCyHC58MGquR8ybZPARydclf7BfjYYQrwEdgHrHQGx97kGSV0wEt12ZQou07L2UsiA6L6QH38BH8helPjhm3rAfOaCF0x3rK%2FT0h2%2FEC%2Fj2UAOGShfKaeYWT1oWmNKeVUDX1yj39DPqqwELHfk1qe4%2BnmOdzh7HQQHGg%2BF0vd7sxNnhEIvGB0wjqi6zQY6pgEOs75%2F0QyAB2DtRn%2B800vgnqMpwZsoeCgjcZJnb5MGkwWgDf9uvnlu7uHn2vPkybmJqWikYH5nriRuEkvMdf1zwLxTCN%2FaieXXllbli1bQ6PBVRo%2BP89Hp%2FgCuCSJzfRTnBoeA9poFzcHra5O6MaNe0oWrwOsqZP5GXs%2B0PMNxPDbG3%2BdDq8C3PpUMfTWDpetg%2FPe%2FojYNHAsaiTI9v1D0cfUwKfXH&X-Amz-Signature=ae8821f7996ad0a4b4ffe17aaeb5df3f1cf69463f326f56a422e310bed0bddee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSRFA5L5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T103232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIBUcbPP2uXvhUariDjqBgGKwqOvpJa34bJnnShxNGRd1AiEAzCl8xw8MAEEowPurBciTB7tT5RfARM%2FiN5I0ocIvuWAq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDNLDbJukJKbShCSr6CrcA9DxVHa9Z0tguJBnigNP%2BOMdp88hXGNEx0zx90RqjwNiSnjQ3K0nCaJxHYWhhrOof1CYLZdWZCK1tEcbc6smG1xo0lTQZEDY9FVMw8fOPqgAzzlwu6zlf%2BAhZdnJ6LgHK%2FzhlbVDnuNF5ajI9uK6yzzp3QSqAxC1riznUEqaaSBYf5%2Ba1TC2lVpwpYK%2B3vU0MJ5aKyzCKbU6R9no9cNsbzQHyc2%2FJ%2FnEexN389pUTZruQMJrrAOaAh3roDDplKHJ4mcLeZ6Y%2BPRYbcAwMM8toYszXIU0Sg7em9NyP0MJn4o4fNVppdP7GHShoBxZLCJW8GD4cQ0Hng9cHOZvqPbR2Y2XXwEm2qpiOpUJswPLmAL7WQpWrzb5VE6TPkXZww9IA8%2F9j1%2BSD9P7%2B7gBOpddaxtg7OEh5yZXqddjcIStc53TBFIUhCXyzGGBQfJWyhRDosTrGoiwfrLqZTl%2BRunPUBMjylWZ3Ksquc54%2BgNFowBkQyfmAVOyshOic5AVGwxtzpO%2FAIXMJIDb0kgw4eRavjw9UC1dUwt38KxD6MzUhuaTF%2FNUupQpZE5FPhfU5NU2AHmHoFMal5K9rRZhEZR3JKVthvTO86pRWBrkrrXR%2FhF3lf4ch3yf62f76k6PMKyqus0GOqUBRUjZ43AbtBYlTd3bfLWVxpV3F%2BDKooS%2FyL0jlThFEFaGwdD%2Bg2OZgfFvQHbQuRMbOEfYiKeZ1tmza%2BwD1m3gFVS%2FqGtLufbqtCOlvpt3ShcnJsob2JwJ337dlMCA4%2BlMl2YpHX0j2e0D%2BxwrPQ8gothVhnliQmzeUs07m%2BpSPku2j17sysxCT8jkIFEs8WU%2FHnahGD0jKKKHH9Ha7QbDBy58eTxz&X-Amz-Signature=4bbbbdf1e97cf1ccd1bb2848847426458452f497802503ae26d29eeb86ffaa9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

