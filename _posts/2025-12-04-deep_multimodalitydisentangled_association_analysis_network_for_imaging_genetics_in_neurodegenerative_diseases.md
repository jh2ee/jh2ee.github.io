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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKMWTTW7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIBHaeyn6vqdepMoRjHKU4ULzF%2FOhw8NioiNxzWSrQqfKAiAMzweN5Tt%2BHXi86i3zSgThNklGgvg2QJ9xTZrMQ03erCr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMXGXSP7%2BV%2BnCAI9bSKtwD%2F6sFDeeXLXb2kaM74yzK8zc4pIEE4Bc%2BP2XyTuhxHBg2bVsQuoSO0mQrF97Vq6ASdvvNMJy1jNMc%2FO6B21HAiVFJpinbpavT6yScW3w8KZ1Do6WhQWw4qPSuAUs4f%2FUxCdIsql8NeAm6arjcr0tyDK83Xdo7s7Q7PFv0RdF9RKEDKNUxPCFj%2FPUlUzmD6HBueVPoQIzyurXC%2B3c97Bsxvnfnc5baE4SWAf5ZosTkDFT8OKb8T1KsdhbLnUmFzSshLhN2vmMqeDQiLX%2Bp6Jjaz9fwPpa%2BFoSQXJdJnyHu3vqhYXxB3YLPoxpGstc8EmzS5MKvtU%2Fq6i4p2AUeCf2jHhkc1cgUgh3ZjGneHMv1HStedqbKB9QqxCPHZ%2Bvym6Ha9FxIP1j9ssq02%2Ft0NCVsr983mpWDMwwdRbvqBqzcFrL36Y79SKWv1GEiBTDZWRkH3u3GWxEkigxaQgnE3zCstNeHgt0ooRQlpz6mVZ%2F7ym%2Fv4vrFHtZe3YwmEpsT3ty2lQ2j9i4xUR3qAUeLL218MrDG%2FJtx6eFS7y6MsTjig2zrZ3TQACumP%2BMF2OVdMb84N7jR0l4VTQ%2Fo4ZCmHcMQhausFLoZJYyHo8oIPwFEUqDBc16llmMwPRXUNWIww%2FfuygY6pgFULxH8UJ0F7ZBbWU2c9ocahVTTgc6lbw%2BkW%2FnuFC%2B0QluLop5Y8AApmM7GTZvzWO%2FAsNPeZCbN2ZNOHTsnuruyOkugKIUfsVinHeP4eLmn1MEy2i66QhI%2FBBsPpQtZKCadLN1YywKTDlCVIYeuirl3%2FnxQRPdmBicU9YlnJugnoM8Zqp9LIn5IDljwRAn15%2BPOo4%2Biyewst%2BiNMdtn58Z2GZJ8M5qk&X-Amz-Signature=cc6f93256015beb114ee24eec95810bdd7d8cfc1ea34e7266a008d940431617b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKMWTTW7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIBHaeyn6vqdepMoRjHKU4ULzF%2FOhw8NioiNxzWSrQqfKAiAMzweN5Tt%2BHXi86i3zSgThNklGgvg2QJ9xTZrMQ03erCr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMXGXSP7%2BV%2BnCAI9bSKtwD%2F6sFDeeXLXb2kaM74yzK8zc4pIEE4Bc%2BP2XyTuhxHBg2bVsQuoSO0mQrF97Vq6ASdvvNMJy1jNMc%2FO6B21HAiVFJpinbpavT6yScW3w8KZ1Do6WhQWw4qPSuAUs4f%2FUxCdIsql8NeAm6arjcr0tyDK83Xdo7s7Q7PFv0RdF9RKEDKNUxPCFj%2FPUlUzmD6HBueVPoQIzyurXC%2B3c97Bsxvnfnc5baE4SWAf5ZosTkDFT8OKb8T1KsdhbLnUmFzSshLhN2vmMqeDQiLX%2Bp6Jjaz9fwPpa%2BFoSQXJdJnyHu3vqhYXxB3YLPoxpGstc8EmzS5MKvtU%2Fq6i4p2AUeCf2jHhkc1cgUgh3ZjGneHMv1HStedqbKB9QqxCPHZ%2Bvym6Ha9FxIP1j9ssq02%2Ft0NCVsr983mpWDMwwdRbvqBqzcFrL36Y79SKWv1GEiBTDZWRkH3u3GWxEkigxaQgnE3zCstNeHgt0ooRQlpz6mVZ%2F7ym%2Fv4vrFHtZe3YwmEpsT3ty2lQ2j9i4xUR3qAUeLL218MrDG%2FJtx6eFS7y6MsTjig2zrZ3TQACumP%2BMF2OVdMb84N7jR0l4VTQ%2Fo4ZCmHcMQhausFLoZJYyHo8oIPwFEUqDBc16llmMwPRXUNWIww%2FfuygY6pgFULxH8UJ0F7ZBbWU2c9ocahVTTgc6lbw%2BkW%2FnuFC%2B0QluLop5Y8AApmM7GTZvzWO%2FAsNPeZCbN2ZNOHTsnuruyOkugKIUfsVinHeP4eLmn1MEy2i66QhI%2FBBsPpQtZKCadLN1YywKTDlCVIYeuirl3%2FnxQRPdmBicU9YlnJugnoM8Zqp9LIn5IDljwRAn15%2BPOo4%2Biyewst%2BiNMdtn58Z2GZJ8M5qk&X-Amz-Signature=cc6f93256015beb114ee24eec95810bdd7d8cfc1ea34e7266a008d940431617b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IS76SQT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCEqXfJYT38hKfTdT3z1c0awLQQi3Xqjk6JmpHvlPNvAwIhAMTDvExthHIl58kfGiuhW%2FrjYn5VN5YtwGLosDZbaMDIKv8DCEcQABoMNjM3NDIzMTgzODA1IgwT7PTp2mnC7F0B3y4q3AMdB%2F2XXZQMW6Tc4mqrmaSUcc7AyFlNhbmFl%2BffxDBhW6Zma8PjvLIbj%2BCEjboZqgaD160dxjZ%2BAsCcB408g8imrXOvaDBJ9ZVMrAAKAolxD6MUn0jL0MQbc0mbjcQoZmby9M7DeKffqCic3MvVg5q1Cc30z6hLQ%2BOlgHTNBydtKhsAY8xDbTkKozL38firDl8EEW1%2BfejlUD8JGtmlSvLgv7fK2jkam30oU4Xcc3YdIupN%2Bl2PBaX3CfKgFk%2BUaUuf9%2BobioUuxeR7RMVuBIaoBgpYVgPl5Ucfk6JTp8ScPqL2euyEikUJdmF9lDLqb%2BhI8c1bp9XeVeka5A6DigsIMVPGZIUPOpk%2BbUSm0lbh98MJP3dDXaW7giEJYgtXpl7D6etgk8ICkE9sM6LuEI25enWZhuHbTNx7gmPZlMonZSZLY%2FXZ7u0OJq%2BqO%2F4kot5pFeGQsVhnzVU3sknfqcgBwhrBoyZs8fJutwswaRbhV9SB9nHG%2FGKhoYNRJn7qlwagmsOeFQPtMaWh7oCL27gZKAljD6l4Gyv%2Bm4ImtER4LZP%2FkGTmKG0n1ZH6fH35vhwmKYpFkuOqzFdLMFyG%2BIqfD8qDwmzcbFZ8N0KD2geoKTXXfOG7gnacB83D8zCO%2Be7KBjqkATlPMX4mH6kAjqwWBbQAWihPLxTeGYRbK7jmIVj0Uvya%2BltQyTctGtkuEmPNDSvq0gM%2FQe%2Bw1eRwCEFYJGsBY7nJ%2BSeHEr6WG7XbvI5mg6B1Wy2QYMwe2hOOZmsxnF0KN5aPr0qL%2FDmqCZCW8%2F0ghYjeqPngZhwpMVJSSbqDADvirky04Os3B8bEiEwnvcOBXgy%2BWGiJzMdsxSyetgVhDOQ65HKx&X-Amz-Signature=2fbdb973d90e317591e3073c0324ee30a53374333129fea476c9aecb153fcf8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVP2R6YJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCICSW2nDSYk765VOoe2cGDAmXyunqRA2rEc8U4brC1tEMAiEAnwTWN4OZ4PHHyKN6vdbUmPHvfKMS04CXlglF9gkHT%2BAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDGanT0kpMcNtSbtkLircA%2Fm51krCHQxZHosHKx0Cg7zPxzCbtCNYHd5tFpc3kYXg1mVM6ZEH12JQA4jHE4T2WY2%2BI9keGuKYO2jnwuXhGknw60RN46MwY9Ef0tGYs8u89UFz7zm651SylPdPBNfV0Jyz3B%2BicxmhXIG%2Fvb%2BAlc2ULJsRpvYFMm%2Bl%2B%2B2IwRzhsB%2BvNp46E8BalAA2bdnASbjSC6U5SsyiMMdaMnvM86VDKYYlkL0S6PTKnw1yKPRAZTfu2d4ykDpjEKlpFjOGq5a2N41rlO57jDGTsm6GVwTrB1rQ4ZtlSbjpjbDGwHNUTyd8y1VZ%2Fd98K3vNmuMOxpv5HtqApe2zkmGS59Ccwm2HRdQGRQlYmqbnjcv21t1%2BMkZrUEF61pVkPcE5tmZTNHHPPHxxpytk%2BgiExcwOEBJd74I0c2X5BRj%2Bae%2FsYLcp5ZrheqjueGD1hBz8WCR2X%2BlQSysw194XbTiBQwnq47rnbBkFevT%2Bnzm8aCmVg2hskjipqCHlhKVi3DGdi0xCHp8OzNBmbrfRKRokSoi2PnIIizVx4zF5BFnErq4lAJpa2EieKFlnws8%2FGktFHa8nuK0Nivz3jVEKSzLK%2BpdL%2BcyjaCsaNaW9kI9GriwQ1CIBBmu2Y%2F4%2FDmD0iy9MMNb37soGOqUB0vo3RPj7kKyI%2BtwwqyHGHTZ47zE0nIGlypLx9WPnlun10Yvvpgo9DwJ5Q57Y%2Fs66WtsuUNYKnEchql2pvelIhptF%2BfKVUqQZa%2Fq9ajIV3oXpgurNPm9G0d60wzd4fzVwQx%2FZP0k7lXLPoxitfgcIGQORbRMvbsomKS%2FZxORqu2ANQLtdjBfXmdMFHqoQI5tRDe0OZ8co98Z%2FzHyl7GWdNj%2FAHgev&X-Amz-Signature=199d7bc5369866a46511010c55b582a086dfcd49c4707f118fde0a5b855a23ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVP2R6YJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCICSW2nDSYk765VOoe2cGDAmXyunqRA2rEc8U4brC1tEMAiEAnwTWN4OZ4PHHyKN6vdbUmPHvfKMS04CXlglF9gkHT%2BAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDGanT0kpMcNtSbtkLircA%2Fm51krCHQxZHosHKx0Cg7zPxzCbtCNYHd5tFpc3kYXg1mVM6ZEH12JQA4jHE4T2WY2%2BI9keGuKYO2jnwuXhGknw60RN46MwY9Ef0tGYs8u89UFz7zm651SylPdPBNfV0Jyz3B%2BicxmhXIG%2Fvb%2BAlc2ULJsRpvYFMm%2Bl%2B%2B2IwRzhsB%2BvNp46E8BalAA2bdnASbjSC6U5SsyiMMdaMnvM86VDKYYlkL0S6PTKnw1yKPRAZTfu2d4ykDpjEKlpFjOGq5a2N41rlO57jDGTsm6GVwTrB1rQ4ZtlSbjpjbDGwHNUTyd8y1VZ%2Fd98K3vNmuMOxpv5HtqApe2zkmGS59Ccwm2HRdQGRQlYmqbnjcv21t1%2BMkZrUEF61pVkPcE5tmZTNHHPPHxxpytk%2BgiExcwOEBJd74I0c2X5BRj%2Bae%2FsYLcp5ZrheqjueGD1hBz8WCR2X%2BlQSysw194XbTiBQwnq47rnbBkFevT%2Bnzm8aCmVg2hskjipqCHlhKVi3DGdi0xCHp8OzNBmbrfRKRokSoi2PnIIizVx4zF5BFnErq4lAJpa2EieKFlnws8%2FGktFHa8nuK0Nivz3jVEKSzLK%2BpdL%2BcyjaCsaNaW9kI9GriwQ1CIBBmu2Y%2F4%2FDmD0iy9MMNb37soGOqUB0vo3RPj7kKyI%2BtwwqyHGHTZ47zE0nIGlypLx9WPnlun10Yvvpgo9DwJ5Q57Y%2Fs66WtsuUNYKnEchql2pvelIhptF%2BfKVUqQZa%2Fq9ajIV3oXpgurNPm9G0d60wzd4fzVwQx%2FZP0k7lXLPoxitfgcIGQORbRMvbsomKS%2FZxORqu2ANQLtdjBfXmdMFHqoQI5tRDe0OZ8co98Z%2FzHyl7GWdNj%2FAHgev&X-Amz-Signature=259e3ca503589ddebd8979d3b2b040b12c68fe0fda60df8641122678e4a08d32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZHGNQO5%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIEp7vVIYcNxfSPiHp27p%2F2Jfq%2Bp2q8OfHNKVYTFSeP6JAiALddLIldt1Q58MS9Qper9tC%2Byc%2FUpGMepqvf5V1ATxOir%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMlYarwO3FEz%2B7RZzqKtwDXvZzNAft2h9%2FKbyaDUk6yrP4nTTuhwfpONr9fRclQJV0ysD70cRROWoD35KFtX77b1O2RiVMJ4NCLKzO%2BbZ7LwtOUUadj6JH6jlGzv1lL077lcBjE2sqI%2BGhV0w6CvMdOPyN5Fois02LRJOOLV0aNoKr5hRhMO7CSE039Q6YF5AtE339t5cuAmYAL1an03AmutO6GLqhhPjOjzKoeGxLWSVSG5m45AEktNgnVQ6iqXPBVKJek76RUuJ9WggnE2cDbQCC32zLsJGwbKWCHxC8hIQTDcLimapCjcSeiFBZsm4aopZYqJU3M8Juzybgda%2FWSKndxBllYMh48joMjXAGtHHuY3vLx5V2hhcfziGTGhLfvq8074bIoHCa%2B0NcDG3dc6vjqGFbGXC3dIB3c28DSuYyCBjmcWTu3yuqkMD9t0NQ30eJOW1e%2F4pPtaySHyQcLmdtAtOZcPW6vqSAUikKLLBquw%2BzZT5vWkgi03c1fQzK04oZz%2FIkq1NErDTMl0l07ql37IzO9HbotiJwpJxQi2w5hWFrzJMZxMiyqjMKOwQrdWbbEGwpWSNtW0ZVZ1m9a1%2BtwEGKEs3OvEmyEYKGzbTLLSyaDYaDnHz9H4a%2BNUopi3YWaYs8jpsw6rIw0%2FfuygY6pgHz2458Yp5HB%2Bgl8mnk9MOdm2fokbP88t76hR5Hurg5Y9aSsbde6nT3pmEbsm02DVHkQj4N3OrNuAx9NyDWkX%2FEImJdHunm8N3I7LyzjhKliFsCaNpS0UuU0MeYFy59aHYnhvOvX2DzT0qesvCOPwuAQ3iXAafSLEtEcvLFJKYa7%2Fvsbs2L72ePrxTZopN%2FJx2tq6VT6ISRibBo%2B5w%2BC7UO8wFYMvGe&X-Amz-Signature=64a67678a78182ad13d0aede1fb97f7d9cfd935dd42351f7279efaec1f1e04d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRFWLEEX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIGNXtKultDDLZMuzGmDEhIiO9UFdtpYfnLcK5IwW1oe%2BAiA2ruTYGiRqpNr2SEAFWzeL3yjE6vzMz1YHTURkASkRvir%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMHzmdVOlR4ET0cIAAKtwDpP1%2BvctV1o4YgeYrOSV6VkvQr0SfGZfuBwnm827f5R0%2BCrH%2FTbvcrfTqqsP%2F79Na%2FPYqSCVDztswn2yGmB%2ByHxB7wqembjQyYJPC5BhJIZ9XPePynhiTkvzida7eiQzP71yGB1ohrSoiaCROZ4Yk2ZGRjsCGx8%2FCYpLfWyRiLwYJzh6XgswwLt4VQcaOyb6W8CqmUomkuFcV3AfMacDo8I9A3tKaqsaMuqxdB3RkZslG1NqYiTFytCEcI733WWHzGXHbKiOLbNw3rC2%2B6%2FHnjUZDwUdfCl4C%2F0PFq2sRJftmk9RlEHiy7A2xvJE4Zf%2Bl66m7M7oeDlReQgTNhvxIOB8IgyL5OtLuvxS%2BpHxzNkUZ8ZRSlMnG9Ygmxq%2FpLn7bB02H91NlrvG3STNX0kfpjKe7vorEMnsl9qKJTFBT41QD%2FjLoFz%2FgNqMJ%2FEwBSnztjFp%2FPBRaeeBZ8rNnIfBZyFzGNphp1bCJIQUUVe2n7A1zxNa7DgvhvwyronkqNGhn8COSVZCBy85VPEd4TqSfjt4fX0rNv3MCTU9H5TQp8SforyjmrlQKjZctm%2Bvngl%2FqDWhXdWPEurrrp4FjmKs0x9ITby0CqwVUvpg%2FoZsfwKkQvP6mkzqNL8koO%2FYwuvnuygY6pgESQGdgl2uyjYMBYBJLM%2Bxt%2FZFy0sOQUBkyqls4aUpbl90LInpnZY2gkRdjrlUxNeOaAESRN2SnJ5z1z6CRn%2FE4XJC0MjuWCEXX8UeOaNwFI0gBrFZSfuL0uLddG2hGlZvw4mL11DxgpAj3Lm1WDZcDcf32O%2FDnWHQF4oPVmp6Tc7YRWRCMhf8swBIGeExZCv%2BFTrp1BCA2mpjCbQtSTsus0F0iIo6m&X-Amz-Signature=885dc6e2f7cc2cd11663d5b303037ee787e7e12880d3349cae151cf6d254e7f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2VTCFFB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIC2Ht1rha72%2BPN%2Be3BVBtfRIuzxJi1zTytQNej9Z8d1VAiEAl3s%2FB0wXLtuKVTNc1CkqH3bvzxw5VqZ6WHpRmOM61koq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDB9dNg83%2BYhwT8aVTCrcAzBLkcPRWtToExtcsdJLyRa21sLSQ76mLn3MjnvAymXgzlr3TRirgN5UYvmK%2FZcBysNuyyHJlJ11HpwcqfnTbPhfNFTT48ZwoQ2gXGsoIl%2FvBV9Xk4Q5VZinWUJlrgnhEEgfV49VOUcascR8DBIdQQC5SlNkmCGGIJWb3iq6FZtpwF9bQy0vpYQdvvhUgqhtK1i4AEBBO9N859SVGnSsKvbKkaWapH8gIwjxVFPy99QrxdzQ6%2FNaU3PlVy01%2Bx5My2OgvwFfoumts2NxJgF9fUp0voZY2r06FMr2hKZL8brn38dAC1hE6cIW%2FiokB31GHJkHrAw3EeseirvCu9iDY3APzmiHYkWFlpok9RfL0oQ0AmopPR4r5rEroeRBW6eySlt1V1I2eH0npz5FyRWWhH3QMpB3UHQdiCAvgFSVKuEd78OoI7fezHiMyx9Mf4AIBf35CMbzTs0kXPfkO0lcJNZptQODvUeJ7%2BENSGiTDlECZBmy%2FBgoSzT2qtRbrH5GWU4%2BY5jX1FY8qc3BRset1GpptN1zNrvNHWQ9gCg8pDKO8iq0fVhWpkv1OYskuy5Axf3QZC3uTudeYRmZqvuWMSAiL%2FqoyrtKYP3bLP09sWWMnN5rJNLeqIKZ89HCMMP37soGOqUBNfXyQ3LPGTZajGhya1hKAyCXfJvOOZoMQA%2BTqSp%2BISpLqyWLLRo19YlD5ko2Li7zstNOmVClvkYS2a0oo3nuk5QQ8DLZtRn%2FRbfNF6vI2WEYAx0wUbA%2FM4s%2F7gdOWhIP4hAwjIqAbO%2FICHW7FMnHa9icoOdny83ALwpbW2cPFk0xV%2Bp3jB8277mg2%2F6a3OGqrs22Fg%2BD0piCkRliDQLmPOmT1qkk&X-Amz-Signature=136b982b5512522ab95374268536fb8724ab1d244f8fde5562a20ca8978e8d8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2ZWFVA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDjB9PiHRCmMcNhM2LdMAsyLhk7Rvu8Ob901N4tc3cITgIgLzAvgO%2FYPbITiMv1rFmCCcu9gYEncvhyC1uxJayzDNUq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDE8ydDegUdg4QMC4zyrcA7ddU9Ci94DBb46l3j2cOiszKfHxDgmsbwzFZJKyg%2BOBDeo1UnyxQ1FYEqf8DmGpC6S8MI6Qck%2BKwIDsMl89031HyUOmv%2B2YrEHn%2Fjao5w1ZQ3RzbF5yCbjf1DV%2FfGCDbZS%2Fe7X8Hdbqmf%2Frk%2FoKloiQsKz9QXdE%2BpcIfkH%2FY1el8s1pizSYrqg9xuu5eOjNAGeJTS00L4jeQVbDqXiANEC5tE2AmuMaTalmrB53hYCFYd90DRBUprRkgqtwlHRccgQoBH4CP%2Bw6UkXskJHTFPsDT%2BnqTj1cPiiObdXtcp6dZGBsT1%2F8TLyF%2FDj9WFOlMLOl7wGXj6YFoYU8EG50NKwXpwhDyyZqRVa7d5F4NEhgeVCJ2yJgBCUbwWIDhIk4wGoet12PZ8T1HWVfO2ygn7YCuaLa94Z7JWjCblMJzhCCrfMLUuvUpj06vQPMCPD9LAScPJi48n6B8u6lmE7NP7Aywrlr7BIZ6My5GIHM3gQY72omSNtckso2kTIfzHImAWu38CMYeMNUIyGjZFJ4E7rdeMiL5FMDk8dMUUWpdyJM68Cv%2BP6%2BA3WmKCLIbtPyUtLLQmmoVXUdg4eyELHkKPCNvanIZ5khVTsRrCDNuQZ%2FE15SSyiFBoWhbftUMPf37soGOqUBuOVyxJ7wd4BDtJmHIDO3o2T8I57wklzvLu4F6mUcQ%2BQ5vMW%2Bspo4v9QK3g6OYiOy1KyaJCAMcKs3rhCzTusjv7DH1aM85ObMXo53qAVi9FigGF%2Fbgnaj0XChZJycfwAnun0mP9W9TSbr6uDUcHYfqlYgnuUVagBCofql%2BnKAjlilqgJtW41509fEPqPtySL27rQULbjsVRzHr1zVnqIwsA27IB%2By&X-Amz-Signature=f6e06b162395135618889f00988b43294f3f245741911fbd0c7fea49cca40695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2ZWFVA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDjB9PiHRCmMcNhM2LdMAsyLhk7Rvu8Ob901N4tc3cITgIgLzAvgO%2FYPbITiMv1rFmCCcu9gYEncvhyC1uxJayzDNUq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDE8ydDegUdg4QMC4zyrcA7ddU9Ci94DBb46l3j2cOiszKfHxDgmsbwzFZJKyg%2BOBDeo1UnyxQ1FYEqf8DmGpC6S8MI6Qck%2BKwIDsMl89031HyUOmv%2B2YrEHn%2Fjao5w1ZQ3RzbF5yCbjf1DV%2FfGCDbZS%2Fe7X8Hdbqmf%2Frk%2FoKloiQsKz9QXdE%2BpcIfkH%2FY1el8s1pizSYrqg9xuu5eOjNAGeJTS00L4jeQVbDqXiANEC5tE2AmuMaTalmrB53hYCFYd90DRBUprRkgqtwlHRccgQoBH4CP%2Bw6UkXskJHTFPsDT%2BnqTj1cPiiObdXtcp6dZGBsT1%2F8TLyF%2FDj9WFOlMLOl7wGXj6YFoYU8EG50NKwXpwhDyyZqRVa7d5F4NEhgeVCJ2yJgBCUbwWIDhIk4wGoet12PZ8T1HWVfO2ygn7YCuaLa94Z7JWjCblMJzhCCrfMLUuvUpj06vQPMCPD9LAScPJi48n6B8u6lmE7NP7Aywrlr7BIZ6My5GIHM3gQY72omSNtckso2kTIfzHImAWu38CMYeMNUIyGjZFJ4E7rdeMiL5FMDk8dMUUWpdyJM68Cv%2BP6%2BA3WmKCLIbtPyUtLLQmmoVXUdg4eyELHkKPCNvanIZ5khVTsRrCDNuQZ%2FE15SSyiFBoWhbftUMPf37soGOqUBuOVyxJ7wd4BDtJmHIDO3o2T8I57wklzvLu4F6mUcQ%2BQ5vMW%2Bspo4v9QK3g6OYiOy1KyaJCAMcKs3rhCzTusjv7DH1aM85ObMXo53qAVi9FigGF%2Fbgnaj0XChZJycfwAnun0mP9W9TSbr6uDUcHYfqlYgnuUVagBCofql%2BnKAjlilqgJtW41509fEPqPtySL27rQULbjsVRzHr1zVnqIwsA27IB%2By&X-Amz-Signature=51d19b92eaecd16fdbad62d0473999aaa46291bef73f7c5f11df39a612b570a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJQ3PVB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIA3vgK%2BVKeX7sVIxApkCA8731znEB5j5BZjHJ7vwls8DAiEA1aG3olucLYc6cqze3QN%2BFxpFk44YkZ2ToNsotIfEiZQq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDBMDXCzadR%2BIGL6COircA6ezA4Wc%2F6uRpgxQqC6CR%2Fx7pc9Rjc%2Bd7CAZrzguedke34fWXP7kLCZTkFCQBUf4orMzaj9yNToExOz9wCW2fofqvFdyi%2FHAHvJ5GZDx3%2F6w49EFvlC9bz%2Beua8zYkn3f1TyhpIxKl%2FmGK0JScRWorWt3lXo%2F1kgW4sYgUTgh6DRp0WJCpNyU%2BwGJhhWnDUGbxi4WFtEVC%2F5p9MdNKEfpQNNFo2jLJkd1cFnEYfPNlIXPztmig0H%2B0OggtXKcQ5Vs1xq7f4w5hTVIoqSTp%2Fba8Sl%2BWEcBoqpQpnLtnP6xBQQdC5lBRbTMarnC9KA0L1RctTlYZj%2BOTLNG9GNuqgazxABqe5NIBBoN0%2FihoU4hHP5XYHmeCa%2FUw94KyCekQ7RIjDMM285iXY74pEFinrPlNoC9se9A9C2jxNeNfgJ4Fs0xplQOlFGeKMjABJclrm2a5gFIzVDjvNpEjGEDTRCg4pR62vwIx%2FFs5M1XgsA9exD%2FUojEohFV%2BmUhOOdUNGfGKvJ0aGLUkdGOPr4kadAPD0pEQXcUrWKg%2FCr5GXOdg1Gx6hDJpcjmSpFpCmeXK%2Bwmx%2BeQFg3j6P9OEbNRqagRjiOt4o1w8p9kSDlxWaNSbuZcSD5E%2FNuCAyx1hAoMI357soGOqUBp464OphF9jJp%2FvoHlxsQcOL7%2BPdUlOONuwHUNczcsIHRHKoawxTfgsL4qTEYHPH5igkgf79Hm9OxkfwBlANkh9kneR9wva2nr6FuTKSXPOvz9DgFBZQkCdjVGn6dxkwcgqOCU5qyBikbqJrlBrYZ%2FkWEIBlmXIxxOXWgLiHUKOwlwo95E%2B89HbFA1eFwscItw4s9%2B1v1tUtZZS2OXw4lpnstdnPi&X-Amz-Signature=ce063f11e2d59c61ec43a73b5c9aa2e53174f2b71f4c8bc5cee81db9b2a20924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5BHIMAY%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDoYR8PzKIOd5PxX%2BFUUuXZPGJ5pu3WC4F2VeKZ%2BFOwQgIhAM2tF4PcMgjW5RDk1L9ZSc9xAks2eJrNilXA8K%2FE66QvKv8DCEcQABoMNjM3NDIzMTgzODA1IgzJBhWcjvxmte5rOi8q3AMlT%2BZ9y8dbU5PcSwDgXHj4XOaaSz6V9jAQvz%2FFNlIDvuohjIN7WpTVqrQMhG7hjzwDrdk9pSzsBcH0DL0jP6uhsp6ycrmq7PpoPtEr3UzoXErv3qFtzlwqUihgzUUrv2CUyhQFizEwiQajxiIzT4Y1Y97xj9dNVjZX68HPmA86yh9ApfRMJ9xyNx7gPQghfipRTcU4C65tyJ0AGNE6Y0g6OE4MfP9JLDtj7m6MWtHcMeZAR4K8pi%2Bbkm8feXmpcPPZHb1NljO%2FoC5DAwVDxK1zzdvNwBAJ22htJMBLElitq1xgzclOpr%2FX%2BwyCVMfsiWPqYI3AcZshESZ9j12AjvViPWqUsvsrkP%2BINVsvlTiF2HBoiO05syAM7oGozgJZcfPZmUtym8Zgt4B6zas1dVO1FEksg%2F0%2FmpsJNQ%2FDA8tBpYQEiQ7FIES73lbdgFMN1sTuZA8FZP5amf58Ivz9leaGVk0jh8z%2FeouLyVyqK2EbpN2Qg0nJWPm2Yr8AUTprNkrZP2jPWRz4TszQ%2FgyUwU%2FMlkWSUdqC93BBlVxDgiTALmJ%2FV7ahcYxbhHg%2BYMnrYJ6e9pyio0ZVDxO0JKAyYPppaDmSooGlkAzGBZb90Rdp5kiqr0GTNIWGBSpdvjCb%2Be7KBjqkARKLW4dYdqvMZdtLl7Bt3gHMG43qT3Qil4uxMCQQmJVfkYumTOMKmpxPFzIwnWFf0aK%2BUEux7aSqrauACyG7jWjPaT5siu6uaE3%2FuZKY%2BzfRvj84dAjwamDqHSCF9ZKgdPaLX8f%2Bzzu1mkfH9SiiSJ%2BW1TTqwcG5nUUBkRv1JVPmVwNI5VZEF5XEW17lhTley5KNTH1sI2POjqhMQSYY8OAIWMDq&X-Amz-Signature=d76a74c2dfc5c54c4e90a573f94db010173066f29b9e6f1dff18fe9d1ad3873c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5BHIMAY%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDoYR8PzKIOd5PxX%2BFUUuXZPGJ5pu3WC4F2VeKZ%2BFOwQgIhAM2tF4PcMgjW5RDk1L9ZSc9xAks2eJrNilXA8K%2FE66QvKv8DCEcQABoMNjM3NDIzMTgzODA1IgzJBhWcjvxmte5rOi8q3AMlT%2BZ9y8dbU5PcSwDgXHj4XOaaSz6V9jAQvz%2FFNlIDvuohjIN7WpTVqrQMhG7hjzwDrdk9pSzsBcH0DL0jP6uhsp6ycrmq7PpoPtEr3UzoXErv3qFtzlwqUihgzUUrv2CUyhQFizEwiQajxiIzT4Y1Y97xj9dNVjZX68HPmA86yh9ApfRMJ9xyNx7gPQghfipRTcU4C65tyJ0AGNE6Y0g6OE4MfP9JLDtj7m6MWtHcMeZAR4K8pi%2Bbkm8feXmpcPPZHb1NljO%2FoC5DAwVDxK1zzdvNwBAJ22htJMBLElitq1xgzclOpr%2FX%2BwyCVMfsiWPqYI3AcZshESZ9j12AjvViPWqUsvsrkP%2BINVsvlTiF2HBoiO05syAM7oGozgJZcfPZmUtym8Zgt4B6zas1dVO1FEksg%2F0%2FmpsJNQ%2FDA8tBpYQEiQ7FIES73lbdgFMN1sTuZA8FZP5amf58Ivz9leaGVk0jh8z%2FeouLyVyqK2EbpN2Qg0nJWPm2Yr8AUTprNkrZP2jPWRz4TszQ%2FgyUwU%2FMlkWSUdqC93BBlVxDgiTALmJ%2FV7ahcYxbhHg%2BYMnrYJ6e9pyio0ZVDxO0JKAyYPppaDmSooGlkAzGBZb90Rdp5kiqr0GTNIWGBSpdvjCb%2Be7KBjqkARKLW4dYdqvMZdtLl7Bt3gHMG43qT3Qil4uxMCQQmJVfkYumTOMKmpxPFzIwnWFf0aK%2BUEux7aSqrauACyG7jWjPaT5siu6uaE3%2FuZKY%2BzfRvj84dAjwamDqHSCF9ZKgdPaLX8f%2Bzzu1mkfH9SiiSJ%2BW1TTqwcG5nUUBkRv1JVPmVwNI5VZEF5XEW17lhTley5KNTH1sI2POjqhMQSYY8OAIWMDq&X-Amz-Signature=d76a74c2dfc5c54c4e90a573f94db010173066f29b9e6f1dff18fe9d1ad3873c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR35F2VU%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T133303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIF8zhW2HR2LfmKIYCZF2mzNU6sJ6q4OXKlc42A6rHE17AiASgKyOl9GTlpmzkzGjVwe8phFE6k0PfC5xa1taPH73OSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMx8IE%2BxHSFeatsnO8KtwDO9apZGWWNpKXfRvIpzocGcc9LAtaY2ZZw%2BXf5ItA7LDZ2DxHYzUMC8cfkcNwBtWkZnZWLv8nCShdpsExnOOXGBxGRuifiByrJdCVWK7xxFNPJpbh7GCregUcy4Wzmwiupvj0k4fKz7D3hKEO0wN%2BQ9f8R09fu5DRwKKfiR1ih2Fs2T19g4AFAZpKo7m4LuU2GtBquLNlezN%2BDe988NDUPya10RkQPOPLd6tZWj9FoNZbrVnuU19pCBOUJbtYQfIbVBHVn6bYGo81PGGnql305kNwXFThNLVO9TSGeA9OQ%2FEzSpTitsLB21fsEjtaj77CqPwXSxmTC2ItV1N8COBmNYLT%2Bsy%2Bv3z6PT5ethYcNm85F5hTe%2FQdWbxZ9QqOraYraXymTxThrbe%2B3W%2FDd75C0EyBnQ1%2BummWlu5O%2B%2BweqqL7TFus0LBZ6mno3w7zvLU2gxCmMViaKui7xbiu%2Fep%2FtuoO7erehHZZnxm1d%2Bin6qx7fpW0rVt9LvcjhCwOc9pEladJCXw%2ForxG5i40%2FVMvc0f038L3CHTxEYE2YgcYIK3O%2FuKoRCZjaLc1GzI5jqGn9cTZDhgchgMuLibisE%2BEVxu9DySgGQ%2BPfr1YejP30UK0Ui4ZVzVgFZ6zpUMwgPnuygY6pgExITrlF2hyaeR2SLlEFWCkgmdEFVyHLcL%2B%2BaFTE4PAjK8DW%2B3c284QSBraxVp0ZPPNG001z9cVTmoc244a5nfjUwFsZLaiMrQ6BU415UCFWC%2BgSPeLCdrNTlUfY61siy%2B%2F%2FChzt1KVLzIvvR5ky3BE3EdahygWo7lnbok%2BRbSC2N%2B8gYnHuJzMCyxrSvcc7BmkqDfhOhxqfHKChdP9j9mVH4j6%2Feyj&X-Amz-Signature=f4541a7eb846c7b35309de87a0363bde5efa2c3ae46220ed8e3a8f6636b9f87e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

