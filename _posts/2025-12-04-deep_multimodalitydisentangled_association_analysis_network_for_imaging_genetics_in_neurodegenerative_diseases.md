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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMRNE5AY%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIBWapgenoFPKiihUBZmKwLn0JN7GWANKiB3zPTdcVxFjAiAQKRx%2FbAJP1IIZSjlPPPjwYw2WZ4YYt8LkXDbVefcBtiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwi%2F6K8TcS3S%2Bv%2F22KtwDFZ8qSS2x2tp61v0HXIJGgRQTqR%2FO0wl4V19wDUWjuzKxfZ68YoVxLPt7arNS4e2GarFJwvBmM8zsQStila5IciUWC3ddGkkqvFhd127RFd1gleVR8R6GBnRV2sYyr1AI9NGDEq1go9wEdXyGZXO%2BFnuAYZU%2FX4mDl8pGvcccOuj%2BsFHIDxZ%2FG%2B2pLs0bGnQElN2IwbQ6TPHkjoOiBHz%2BvgUAASg3VYTwRlOpHqTERdAdB%2F8ArMh9yGDB1jEJCjdaFAFSqhAvo4Q0Tb9v1yZlSFOTrhpnspy7EiXg8UytV1qlf522sCA03OzGL49ta%2BEzNvkh0nSNMKrjza6iaS%2BCqEGZii1PQzkxny1y6EeOyQZk7QGvpAJwkjHNw5QGhGSt0dIqbWyYyi3Un3iJSPaw1XJlSGLmk%2BYS3QAco3BEq90LBOGC5nwDZ2GUzLnmm%2Bg%2BN8cHItzcOzaws2sgxdLk8W7TpGXqRxXEoQNd2g8vScom9UoLqkQjJZX1aI6QQGLWlhhOJM3b%2BbSLde9V9SfCI6m14GgnfBMZy%2B6e3fIuL%2FV%2BSkt7uOeA2upkmvjin88RmSNDJG6CCUb%2BT6lfGL%2FVcKDGNzjqOWLEOqJqUIRyukDD0dmWVNG%2FT0UGOHEwvefVygY6pgFIA3Rz6ewerC1QHiPmNmu1JCxN%2Flax99Be%2BQBDHKbQEm4s147AuTUioZdj4PGWCSrZa6sTd6W%2BnQ9Vbj%2B44u32FVAPmKmmc0BVszg5iNcb0RoEfwXDHV5Ed1L6KJro8p6OeDD4xPjTkrsUjdX73uP7cAFqQf8I3SEKO9QxRPlVlEr%2FLtixfg9cvZwCH0kk8rpXiZfkV7XHDECzM1%2BZexFZJE15%2FI8u&X-Amz-Signature=26bd4c032d57bc129f18c499b17620c06bd850b745f01a801fcd86fcce435a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMRNE5AY%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIBWapgenoFPKiihUBZmKwLn0JN7GWANKiB3zPTdcVxFjAiAQKRx%2FbAJP1IIZSjlPPPjwYw2WZ4YYt8LkXDbVefcBtiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwi%2F6K8TcS3S%2Bv%2F22KtwDFZ8qSS2x2tp61v0HXIJGgRQTqR%2FO0wl4V19wDUWjuzKxfZ68YoVxLPt7arNS4e2GarFJwvBmM8zsQStila5IciUWC3ddGkkqvFhd127RFd1gleVR8R6GBnRV2sYyr1AI9NGDEq1go9wEdXyGZXO%2BFnuAYZU%2FX4mDl8pGvcccOuj%2BsFHIDxZ%2FG%2B2pLs0bGnQElN2IwbQ6TPHkjoOiBHz%2BvgUAASg3VYTwRlOpHqTERdAdB%2F8ArMh9yGDB1jEJCjdaFAFSqhAvo4Q0Tb9v1yZlSFOTrhpnspy7EiXg8UytV1qlf522sCA03OzGL49ta%2BEzNvkh0nSNMKrjza6iaS%2BCqEGZii1PQzkxny1y6EeOyQZk7QGvpAJwkjHNw5QGhGSt0dIqbWyYyi3Un3iJSPaw1XJlSGLmk%2BYS3QAco3BEq90LBOGC5nwDZ2GUzLnmm%2Bg%2BN8cHItzcOzaws2sgxdLk8W7TpGXqRxXEoQNd2g8vScom9UoLqkQjJZX1aI6QQGLWlhhOJM3b%2BbSLde9V9SfCI6m14GgnfBMZy%2B6e3fIuL%2FV%2BSkt7uOeA2upkmvjin88RmSNDJG6CCUb%2BT6lfGL%2FVcKDGNzjqOWLEOqJqUIRyukDD0dmWVNG%2FT0UGOHEwvefVygY6pgFIA3Rz6ewerC1QHiPmNmu1JCxN%2Flax99Be%2BQBDHKbQEm4s147AuTUioZdj4PGWCSrZa6sTd6W%2BnQ9Vbj%2B44u32FVAPmKmmc0BVszg5iNcb0RoEfwXDHV5Ed1L6KJro8p6OeDD4xPjTkrsUjdX73uP7cAFqQf8I3SEKO9QxRPlVlEr%2FLtixfg9cvZwCH0kk8rpXiZfkV7XHDECzM1%2BZexFZJE15%2FI8u&X-Amz-Signature=26bd4c032d57bc129f18c499b17620c06bd850b745f01a801fcd86fcce435a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X42BTEPK%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIGb0aUtQ6LfA2dTrcjSFIwm6ct7W%2F8R20vPhfgRMXWDSAiB3saOCpSnwTAgVxROxgpASn%2FYbphnwwMKRqpfWcGE8qiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5VA1yJ5a%2Bc4MHjV%2BKtwDQfBMtqqq8CNNVivGOV1YVafdNY3yruixvQ7RTEqri9In2bSqFSUD6LWiG6%2FWxTt2if%2BODDDx97R48SVnn%2Fxld4QOmTePJKF%2BFV%2FQVYdO5t7v2CMpXWf28LjNv%2BJXGWNhR2Duh81VuEjZY0GNKokww09zFzypYSpYocw1AVwC1ZBB5L5N8uLV8NCJFDKogCntBIGZE1u7qO9q7fxCX4fHhPnnbySHl2Su49cXgPkxA0VaBCcxYGVPbAbRTV4Eqjc9w3LoQD7mF84Tx5eOsIJObNk3DKqREloiA6HU7x0YbCcbCVCfcf2sUyGWHxQSA2t6BYsqxTB%2FpVjCHzOVc0TkgZ2tZebOP4kaECaCeAAqosXDUmY6GWKA9xCKtsYdAkmznee9zMtFw7aK%2BMSbAhsjaY4eIr0a4sYTgRefyMNhCw2h%2F2vQOmfVbMpodprXEJCDGcatU2u9RBMlbgYB%2B2N%2BKqULR3psgNgEd1SdDelvIKxQW3l6dmu2xKK3MqNfkxVFcNc6ARLmo5PDSOje5W0tybuUJ9oxHkI4VANi%2Bd9tH%2BbPkHplB6gowuOQJw6N7mF6bPGd04eixWdyj2A7ZHVBMv4vJruEo8n5gGlbVIIoIQ0DvM%2FbayOTSB7Cq%2B8wzerVygY6pgFqEXOOiIGMPSW%2B8SNxO%2FjavmQNm%2Bw%2F9xcMuwyAtnPbNfbPEYsqo7C599C6UKuCvrBLH%2Bx6VPpvbvaOiXgcHiQ0NSNaGOpxDPPNP6SYOey22ICy8nxbV%2FArawxYLJHW8ShHylfA0oM%2F3NMfFs2dfp88jo8O0yZMheK0tQH0%2B0S5%2B2QRbLzc6Aoota9Aow751iDdAhWwq9tOqHL1X6bnMVFmObG4QLJL&X-Amz-Signature=f2adf89d93bfc79304a0553868d251e542a378ca8d131ca529bcd23be8125927&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653H35XQ5%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCICrShjEy5ZTuoO9w6LxHf1tGYvgi9gwCbxsIV6GucFxQAiEAql9D5sIgtL8xSWJcauKnWlJsLCT9vwDcooV1vclAx2IqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIgBIolSgdW3JJDuGyrcA2KiQ6weEPZjNdN%2FUVqL1iSKZ3ZKDiv1Fk1MHcWUF1%2Bz4wKAocBAW4hDYZzmdm6Nqyvmt9QPqT5MOkWXTHomzRDXYSkVo%2Ft%2F7RskZO0ekM%2BboBthi0usY%2Bi2kJny4xcZrmmoNnVgDvkAxMwCO%2BlUnK7e70EZQxDjxgEw2WJnXaGIs6f9asOY4VHdMegwfva42T4soOFxIaahcYMAiiJhjo806Pv5K99PXYJyFYNYp4yNQxVYH8mrMXOmP8lanz4bbhBVnVn0ZN6UGmIl8D%2FbFwYovsFV4UDOaMk3pDyh5%2F3tyBWUQpEKbI5kshhJEZ9SqPjgUoAKVm%2B11%2B%2BResl78SZMzjLW3iZIvkSamelD5gqbZHuVVDL58XaFxk45J3%2FSIEdRyfE30NvcJcdRUzDiCf7l%2FPZIjvydl0sRvX%2FLcPNue8mnQnWo%2F4i60uEjNmO0j02WRifUw%2FrggtqEt49SUg%2B6JXUe%2FQxip6foTHmoNafQLemh5k4zSmG2uLGTE2ddcyGGLwAb7BV6UpLJtw0Z2TqoRwwsqOo5tyStn2LVhT32zKS3wgyUydlGPMu3V%2Ba3uyW9xykMLfeBqFUlWSKLgrDSErKKLK%2BM5Ru98iz3zWuLiZjZ2HYfFojp1axvMJ3n1coGOqUBqLwyFx%2BxmSmRILdsbFW%2FVHJyNSpRQ3sNvu5DJdR0ZXrtPfRfiWWzXaSFehIzBhNS%2BIX5mZPtAclhH923cZZhdiukY9w34Aruyfp0w8HSzYjXqsBMCvwmffG21gjcIkoYFU9v1nQB4t2TM5mdTNVb3Bqf4trPi8g%2B4od83PvY065DPPydrmEXb%2FY5RHW1N0DRELUf6vTsEnFOZWBAvqXnJGyvHYYW&X-Amz-Signature=a725e674fae24ea06e255112ddfd679bd9f7ed8f98afdd8d16747e7b57207494&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653H35XQ5%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCICrShjEy5ZTuoO9w6LxHf1tGYvgi9gwCbxsIV6GucFxQAiEAql9D5sIgtL8xSWJcauKnWlJsLCT9vwDcooV1vclAx2IqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIgBIolSgdW3JJDuGyrcA2KiQ6weEPZjNdN%2FUVqL1iSKZ3ZKDiv1Fk1MHcWUF1%2Bz4wKAocBAW4hDYZzmdm6Nqyvmt9QPqT5MOkWXTHomzRDXYSkVo%2Ft%2F7RskZO0ekM%2BboBthi0usY%2Bi2kJny4xcZrmmoNnVgDvkAxMwCO%2BlUnK7e70EZQxDjxgEw2WJnXaGIs6f9asOY4VHdMegwfva42T4soOFxIaahcYMAiiJhjo806Pv5K99PXYJyFYNYp4yNQxVYH8mrMXOmP8lanz4bbhBVnVn0ZN6UGmIl8D%2FbFwYovsFV4UDOaMk3pDyh5%2F3tyBWUQpEKbI5kshhJEZ9SqPjgUoAKVm%2B11%2B%2BResl78SZMzjLW3iZIvkSamelD5gqbZHuVVDL58XaFxk45J3%2FSIEdRyfE30NvcJcdRUzDiCf7l%2FPZIjvydl0sRvX%2FLcPNue8mnQnWo%2F4i60uEjNmO0j02WRifUw%2FrggtqEt49SUg%2B6JXUe%2FQxip6foTHmoNafQLemh5k4zSmG2uLGTE2ddcyGGLwAb7BV6UpLJtw0Z2TqoRwwsqOo5tyStn2LVhT32zKS3wgyUydlGPMu3V%2Ba3uyW9xykMLfeBqFUlWSKLgrDSErKKLK%2BM5Ru98iz3zWuLiZjZ2HYfFojp1axvMJ3n1coGOqUBqLwyFx%2BxmSmRILdsbFW%2FVHJyNSpRQ3sNvu5DJdR0ZXrtPfRfiWWzXaSFehIzBhNS%2BIX5mZPtAclhH923cZZhdiukY9w34Aruyfp0w8HSzYjXqsBMCvwmffG21gjcIkoYFU9v1nQB4t2TM5mdTNVb3Bqf4trPi8g%2B4od83PvY065DPPydrmEXb%2FY5RHW1N0DRELUf6vTsEnFOZWBAvqXnJGyvHYYW&X-Amz-Signature=345371b00245ed4c254580c1cb6f30b5ae38bb4b0af0f9fbca3ab3f7b21179da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRST3RYQ%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIDw4baXCCHCas6lpRmcp0DiagAU%2Ft86SIuPzHupXrmrYAiEAwPInH4is3ipH3s%2FgcaM6VYYAGkds2rRo1IfjVES2JiIqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAaahvYyRleRYgYNzyrcA0xnvbxLXoXJhJ6gtkwXep1BLIZvxtskB0QmHOnhsjrG3s5y4o5QFKs7fpML5hYWNSoH1jxtKzOrlGNed3hwvwK23cg87Ef1czsCrGkx61laW8PwdXy76gTEe6pD4EFVOkxAV4Ik25xLywWp1TJ88z9hOV4t94ezf2CZ7ixXe%2BIbs%2FZ8sz7Gp8KNoS4J4snxg47aZ1gxvsOZIiwd7gcUNqDEe1gb8QqmY0K8F%2FFPg42dM6eTuMLl0XvwsXndYrsMFc8h5B8hsvbKGOzORgO%2FoSGpb5yghIfPjR5E14NcyJgByu4VU1KYpx24ylQ4fQf37m0Wey%2B2%2BDYjTQxTo56To81muiuoBXszTLTGlYF93K95y5FVvUerpGwYU7uZ%2Br%2FvO0yjjRwinzntGnX7bL88ps4uLJCWfQBEkZ2ZpZ%2BbGiE4UjYT9wX8c2jiD%2BgMMwlNWL6wwEwJj6RETDpzzgTt5aWWrexfq4WqJJLayhr8M%2FOrL8f6u1rWuxzdbDOkEL%2F3EulqdtYkya9zUErwity3yRFO47zlgVqTmQgTI%2Fs0Dg2LD27c%2FqvIMwbD5hYyeka5zBGNxydY35nXP9Dzgj9%2BAj9e1zCspfM5UakS18RvNYO031mka3Lo%2FRmOU%2FgKMJjj1coGOqUBaNm%2FkofqAvt4pR9aN0CE8uFtq7hzT%2FtreUHfjeWs9WloApmMWzOvmbDYoRIalmzhWDoFph58Ky9hmcqhL0tq2VCDKgvTOSjfmYkFlr3dkXmMZWusXRvgZ7E0r2C25%2BBAuzG%2BoGEt%2BG73xmA%2Bi3Jbs%2FQ8zPkDUf7g%2BXuBPsN1JBfMMUoPS3B%2Br1E2Us9SJCbHqh%2Fl2vB5vqi%2F9aqSb0kMu1N2LPD8&X-Amz-Signature=b1c5ffc8967e6b986c8501c97fb05f8e6d8663495ed9f8a81e2336425f943022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTU7HEYY%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCICMXfbZWyXBQYLAcR%2BFCfu5EaoIANCVqrifioH4xasIGAiACfsCDzjrVrK17abdNBZmd41IX9Tb27tDKH8uSP2JgkiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTYpfu3BKiY%2FrFqGbKtwDnDXagmTdaAL9CegPJ2L1IoxkbYWYleMmanznaNO%2FpM8loMWJ%2BfW6Ct9W8uDlfQlrLlHX%2B%2FBtYUNPsy485PfbAmplVHUUPoK9Z6kT1pKf7h5oC0S816R%2FF2R7lzoc3Ieq4G7K0uddZu46vQLZipk5KnsLarKs21YqjiV002CMJqWfNDR%2BwbT1OeOgwJ03gInrLROvXkV5mJlknlb60iSg5TkENGN14XOZibihpVoGTUBpAfAcztc1ZXkt85qzYGKMKW37hnVscjUC%2FtWY81nyD%2BAKAsrtG91GXGu1H1pTJEQgcB7w92xzBfv4mP387%2BNL4EqYHiIGbkMbb080iVubc1iCGYyzTsTQEL3xVAuJ1eb4NTaRkELgMDGCT2svQUfo4c2dtnxUr%2FhAHx7GvV2ZtAe7PQ3oBs16DKMnwLDZOfATG8IlzXRn%2BP9DTme%2FJuK8B5BuNYpOaregGLxzfggVv9gWXQ67La17nnbEuMd0EyuTBLgWArd%2Fxa9KGJJOpcd8xX1EV8upE3DQhX%2FP9MKRAcD1yn%2F3tn0Gi%2FrXwHWrDVZQOVMU%2FHnqQhUGmY7S%2FVoG9QBMLmTE6N2dVkhYy%2BfGTmEl186hNaxiH8%2BqwHrsIkOoDH5UPQASsSHuE20wsebVygY6pgEcvXxMJSuqpkxmbFE6wCbX0EJ1H4PKK8P607Ir8JygwRA1OkP%2BE8Uy2R2cWQalbc5AZDA7%2F3FKmjY1fpC0PRdMMbv0dVZS5kfrqActIcRiePIOYc7YjOzuq8jj5dlH%2BNfTMdrU6V86MuLe6bfbD%2Brbil006jvr0tLqjgDricY5fTApALSgehNgEYrzMAyHd4nZUGzrMRuxRykjmdGWPmhSPNRK3j4x&X-Amz-Signature=c20efb1dd6678501eb597549d3148b7e05ebd6e9d84231038ddca94bb7e96daa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDQMCVBD%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQDaR5UwbVCe354%2FvLrlI7rO8wdjrd2xh3kwpJQbwCVS9AIgHcAGe8T%2BTeNxKiWkaI2XD7MmgrgMuzxsXCLjlk7yuS8qiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA5aL6x1tSYKSargVircAxlVJR%2FJXFa3HPyLbkO8E%2BJS28l%2FfIMR8EP66WGvT%2BmFckL6DlHtnivnsYvSAkQQUdDuUwW8kHf2hFtepUlX%2BHCE8tfprTe7nL%2FkE4CilukB7FngtS4ZtznLsXxTkd9o3ZhTzOQlfErPAgYGXOMUt7jt7jYmPj%2FXur%2BBLuQjMyashTBZWiT2Xint17ElDjrB%2BOw4MxsyDE9TJw1TPPlX28jMhr3ZJ6AqZsPeObclBJ%2FnzKopgoq62zYpB4PLCNV6ke04fuPJzGrKGEgKNOX6uvwaUDX%2B1XlVKzuqBwIGyZlEdy6SC4BlILMdiQqylLI6QWtA19zBKu8uZ3uqeAgMSKLrD4v95uam14k%2FK6DH%2F9Jov2i89FIjAeBug9xYjQ2%2BmR0v6BwhWMPqR8DujEAh1jH42mBEr49ZZPuazJZLUvT8zQyZI4pu0P6uum35jZHRxBofaiwCTACaC2mo4lfF4tJ03MxNJHjtgg%2B2DlcR1ZsKSZznBZ%2FiNpTZPHn3pMRBGq8GhHkzyHsYUcBeYTkcKAO8wS54q6YFWmQBZm8%2F59QfI6v%2FDgkJPIfjCoGNnlGdDKirjh8mMH6xLoZpKYnYaok%2B4s4ykegGyPShYLAlmmcmayurhWayauocsYSdMLrk1coGOqUB2%2FRrItWDRl4vLI49M53SFc1LNuE70UWmcacIs438rQjB2TzwoJZC3gOVeGhqJGWeYL1XOCWC6r%2B%2Ba80uXFM7O3Aod%2BsWflcAhcOMQ1MDN8uN5qTNz6ESfOKzm3ZKfdtzXvbKgcN03B57DalTgs6tRr%2FGmjKtj8RU5i%2BWcY8%2B3KjdwQxg%2FPQLf6pu4HUNTV%2FUuKkGB%2BJO2BmdjNPb7ba12xSBs0I8&X-Amz-Signature=2809e5284b08d91f0d48460d10385feb315a65bdfa9df2913717657b0359b102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVAW6SWC%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIBR1GcAX8JBZv9SDgiJqKLbdNtO3K%2BlQD3thR1Zy7ibbAiEA7FgpUsfTrafW4uf2wvT9evurEPn2j0QYZ0yx%2FP4RFLIqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOrrXOw2b8AFr7WohircAyoX7a%2BBrOFP3waRr9PWJlvCp2VE4My%2Ff%2FhUMlL7JTnzaZrolMYCUxd9dVGqSB%2BST5cU7i%2Bg8aXPzR%2Fc2WeJjzg90psrMb6Q%2BwtX4r0ANsfclKGHJGK1ZTMAuHy916ocl7SYmfnvAHuWVH%2FuuBMIIghPgqOT5lhszofTddCLkGV08rqbj3TJk33SB5XshhK0S5OMc5RfilWf2ILB%2BgfH5r7406o%2Bbw3L1wvhF%2F25Z5j1rvZP8cP6xOLxLH0bprEdCLZf5sCmzTvRuvNFzd6hU3QE4TDTusesmlH6vkME6VSVLw6WYxbIao5Qm3DW8JqrtnBDVdOMMKpMWpDIT6tDPjenOCuGwN0uXpQackjNVJ%2Fjpbm4Rn6de93NKyBvvaN%2FhxoASIKlH1gTkiMGGQlceEKwIL5TQPV6JQpe%2FQGts3IzaKNDDkasXBQFqRVm78Lje1IWPkKXu4KqM0AZeS5bjXbjRQhukZFcRVYmrZsATLOFp2HdsI9CBLAMRX7eAuU7%2FZo1TMvRmtjsFJC2vl55UUF7Ex%2FkCISzCxDGDkE2iKKxJ%2FqHEJsTCbHs0VLUQ6x0oHCjpKFmo7IyPKhm5l2ky39IcpD0t4Trbx6EfvR4mJkyTguMW1IjPHZxQoi5MPaI1soGOqUBjwmQlbDnBFAxh1FIGJUUSVFC7i8CrhrZ3cNo0ZgXwGGItBXPz60Y0nuLjYZMSeHK5keVa3ViVs85PWvw34g55dToV1GEdcAgDRPsRnGEWnMmB3rJXfUBB6%2Fqr6iNOotRwsH3OX7JlAqgjOqrPBDIBFy%2BezkTpvDSv8cQZUyTjBH8dmvNsu%2Bd5nIcvGP89YHpeehik6bhdL20dTUvOyUX5PCECcFc&X-Amz-Signature=7490bf80494e44ff7eabe99eecabb6a9d5c5a0025c9a88a528a81b6c886577e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVAW6SWC%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIBR1GcAX8JBZv9SDgiJqKLbdNtO3K%2BlQD3thR1Zy7ibbAiEA7FgpUsfTrafW4uf2wvT9evurEPn2j0QYZ0yx%2FP4RFLIqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOrrXOw2b8AFr7WohircAyoX7a%2BBrOFP3waRr9PWJlvCp2VE4My%2Ff%2FhUMlL7JTnzaZrolMYCUxd9dVGqSB%2BST5cU7i%2Bg8aXPzR%2Fc2WeJjzg90psrMb6Q%2BwtX4r0ANsfclKGHJGK1ZTMAuHy916ocl7SYmfnvAHuWVH%2FuuBMIIghPgqOT5lhszofTddCLkGV08rqbj3TJk33SB5XshhK0S5OMc5RfilWf2ILB%2BgfH5r7406o%2Bbw3L1wvhF%2F25Z5j1rvZP8cP6xOLxLH0bprEdCLZf5sCmzTvRuvNFzd6hU3QE4TDTusesmlH6vkME6VSVLw6WYxbIao5Qm3DW8JqrtnBDVdOMMKpMWpDIT6tDPjenOCuGwN0uXpQackjNVJ%2Fjpbm4Rn6de93NKyBvvaN%2FhxoASIKlH1gTkiMGGQlceEKwIL5TQPV6JQpe%2FQGts3IzaKNDDkasXBQFqRVm78Lje1IWPkKXu4KqM0AZeS5bjXbjRQhukZFcRVYmrZsATLOFp2HdsI9CBLAMRX7eAuU7%2FZo1TMvRmtjsFJC2vl55UUF7Ex%2FkCISzCxDGDkE2iKKxJ%2FqHEJsTCbHs0VLUQ6x0oHCjpKFmo7IyPKhm5l2ky39IcpD0t4Trbx6EfvR4mJkyTguMW1IjPHZxQoi5MPaI1soGOqUBjwmQlbDnBFAxh1FIGJUUSVFC7i8CrhrZ3cNo0ZgXwGGItBXPz60Y0nuLjYZMSeHK5keVa3ViVs85PWvw34g55dToV1GEdcAgDRPsRnGEWnMmB3rJXfUBB6%2Fqr6iNOotRwsH3OX7JlAqgjOqrPBDIBFy%2BezkTpvDSv8cQZUyTjBH8dmvNsu%2Bd5nIcvGP89YHpeehik6bhdL20dTUvOyUX5PCECcFc&X-Amz-Signature=c391492b8cda977ac08aee2202d2d396d62a288faa2553b05719efafda4924bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5XSSJFC%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQDmhOPpp5f0BKM%2BwcqJkShLGw%2Brzy2SydaKmQ1PoQB6DAIgR4On9f8M5s8u%2BdXAJ5x24yyqBAZTylPjYx7S3TT3vEwqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2F43izGDO9RyjqUdSrcA3EMgaiUia%2B6cMOusYd3djI3Uc8RurYbHseKP9mhPye3oDNE0C0u6GXiMt%2F6xJlMO7fw1ihZ60P1SxkBKa4Q%2BVSNqrBWKml6OCBMJzIUYPYVQIxjnEA8qtjzdfBzgmSwak8cJDx9aIkPOKmtUg8Lo%2BjTc7I2a%2FwWPLAyyqZVXqq0G%2FiQaKlafP9yvCLbOPY%2FxcGiFJ5Q1bo1Kl7pCiDLHZWXYE5bJXpbg1kKRrQzv%2FyKI8AUjlWjP%2F25Zz6G9GsspgvpgsIYRKoYKVAgoHDP82FsO1Nxe%2FckShJ%2BKgIlUjfkcnT4YmfO%2Bs%2Fo%2FqyIKCFVs1ae7WNPqbT0pfHNXSI%2FicRL75zgXXNwLUq4H3ftebcznIgU7jk0yQridrroRct3I7p4iMhYu%2BTxkcIr%2B6qNPf34%2Fh12RGWEaCjHQNgY6YoEx89edha6aufLvevi%2F3LwvGgLczo6WY1TEBGRDhrX0nK01%2BYN2cE2Dk0a2gMO9%2FaCTeMKr4rQvBGCXP1iidHXBbs3YB7P38ALzi843WExSC6%2B06c8JuoWkX%2FNxmi35H%2BARnDtqjvnpEBfwsh3viD7UmI3e5cqJALy8vmHKXXEmDqftYfS042elCMfT0H6pmCHLhfKf0Bzqa4QueGaMJ7l1coGOqUBP%2BVgWESdezd5ni612HXdevedL8aqLp4N3wcNLlecHGaV5DctiFicnJVnY9uarVWNfmrlcD0gGpOzXLemh1Zt7mERID9TPJGABXM31qkM83IRcyaJcQ0Bh1O1UHVz6%2FuQE%2BgE6QHlftAXSzQjK7OK%2BTTy%2BQFsMjjqVstttE6yl0UyQAdi1iDdx%2FWLf0FPYDpFZs5zi8FtMErekpMky5cTXJV4e1lF&X-Amz-Signature=ca91d8c73c7c6d09810e117d4c1a459903c1a47a06c37f8da25db7830b8db277&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TCLQOFZ%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQDZwuNdBXlKlYXctqdnWoraQnXAKNDi82WuVoRe2RaIqQIhAMomH4noMQkDfe1S9skGCv56bROr1XLwRGHWcCCOL1oWKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxVjNLB3kxMHkTar%2FAq3AM9v%2Fu%2Fk0KVz7PcU9EAC%2BSPTxrgOwSMQfG3xFy%2Bz6CRq%2FwTA7%2B2J4VKur%2FFhMISwMFoCpSN%2BLQqSDil0WjoYLxihIvVk89LSfnb00zsKOttyOyL3%2FRMRewy0GR69iie5coC%2BYN0x8DLou5VJ8YN%2BJS%2BXgZvv4CqMZgMoQ8mQ04%2BgMYA7k0M8uiugITj6qfSqhSfUdtf3bZqGeeL9MlJjYkQllCp9SV9gSN%2BHPt%2BPNhXVtIiHBLaqStH20XkvH9PmBjB84Kz1c9ARQolp9ZSo%2FxHL1UYSbxduW1ZQhQpKGTXFsfsb2eLYHHwiHk6twbAPg%2Ftb5VkOC%2FmfZCm63fjR5xTps7NsBFm0WTF5s7d8G0JFBBkUCNAafZC3OqFSxt4o9HoVsP56PQLJS%2Fk5ssfQ%2FsxlcoFk%2FIj%2Fu3QpLuGmtxEtCxyVISLj3sZqw6EF1Qv%2FhGsz9s6%2F0c5vkkBItgG5B814LKWM%2FYnNzpKMU%2FoM0hu%2FMQoj%2FpUrj0G1n%2BYH27MORDyhj6g03D9XtjnmNgCJxsWUhJN1qSR8fNQuwgyEMoa3d8EJ3VjBRle5pdudD7LYUduMhYARdbm4tXanrUY0iNVw6yOWEFpTVP48boUUujndYDyZSN9Ia1oWhKvgzCw59XKBjqkAcxQCWCMLLtbL2oIrR790u9APbGsXP2aDxl5mlw49C%2FnQF1zsnKP4wcVrfcGxKsOqTzBv4Svg7yTag4%2BaEBIFRlQsMvMf6%2BgFk8wI0xSO1XgLg4w4Rp1VpuwSFGr5D2sGDUBCHxYkCd48Cy3xoxmGwpTw0jwHDMNqMxMv%2BO5YGo0GUWnMb3X5OwZ5MdvQJkPlxTJt6LZBNTkGMaOyljCencTAg60&X-Amz-Signature=98f16e457a12c4aa5bcf4757c765225567a6e64ae53d93ec6b315a59b3064b8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TCLQOFZ%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQDZwuNdBXlKlYXctqdnWoraQnXAKNDi82WuVoRe2RaIqQIhAMomH4noMQkDfe1S9skGCv56bROr1XLwRGHWcCCOL1oWKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxVjNLB3kxMHkTar%2FAq3AM9v%2Fu%2Fk0KVz7PcU9EAC%2BSPTxrgOwSMQfG3xFy%2Bz6CRq%2FwTA7%2B2J4VKur%2FFhMISwMFoCpSN%2BLQqSDil0WjoYLxihIvVk89LSfnb00zsKOttyOyL3%2FRMRewy0GR69iie5coC%2BYN0x8DLou5VJ8YN%2BJS%2BXgZvv4CqMZgMoQ8mQ04%2BgMYA7k0M8uiugITj6qfSqhSfUdtf3bZqGeeL9MlJjYkQllCp9SV9gSN%2BHPt%2BPNhXVtIiHBLaqStH20XkvH9PmBjB84Kz1c9ARQolp9ZSo%2FxHL1UYSbxduW1ZQhQpKGTXFsfsb2eLYHHwiHk6twbAPg%2Ftb5VkOC%2FmfZCm63fjR5xTps7NsBFm0WTF5s7d8G0JFBBkUCNAafZC3OqFSxt4o9HoVsP56PQLJS%2Fk5ssfQ%2FsxlcoFk%2FIj%2Fu3QpLuGmtxEtCxyVISLj3sZqw6EF1Qv%2FhGsz9s6%2F0c5vkkBItgG5B814LKWM%2FYnNzpKMU%2FoM0hu%2FMQoj%2FpUrj0G1n%2BYH27MORDyhj6g03D9XtjnmNgCJxsWUhJN1qSR8fNQuwgyEMoa3d8EJ3VjBRle5pdudD7LYUduMhYARdbm4tXanrUY0iNVw6yOWEFpTVP48boUUujndYDyZSN9Ia1oWhKvgzCw59XKBjqkAcxQCWCMLLtbL2oIrR790u9APbGsXP2aDxl5mlw49C%2FnQF1zsnKP4wcVrfcGxKsOqTzBv4Svg7yTag4%2BaEBIFRlQsMvMf6%2BgFk8wI0xSO1XgLg4w4Rp1VpuwSFGr5D2sGDUBCHxYkCd48Cy3xoxmGwpTw0jwHDMNqMxMv%2BO5YGo0GUWnMb3X5OwZ5MdvQJkPlxTJt6LZBNTkGMaOyljCencTAg60&X-Amz-Signature=98f16e457a12c4aa5bcf4757c765225567a6e64ae53d93ec6b315a59b3064b8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYGWO5K5%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T210121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIDBgiWB6AnUFUyEIiIhPuVtDDzVwqwzGZa1Zcuy2QG9YAiEAkhHpy%2BuY0gbTM%2FnQNBmiX%2BSUQ1pfUpc9WdP6qW1g%2F4EqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKv58ZF5ryYg6nhGRyrcA%2FDYwXq%2Flfw0BSOmp52%2FK%2F8RaqN57sYUSSYHAw38ov6um1AduURX7TPaoHkD1Aw3JBYKaxGLYFzr%2BdhSx1LigHz8NT21p%2F2uyxmjgHAos7Jxm1ngO6aET%2BRl14vbY4USXB75CP9C5cq5CuHxcAywrnHc%2BRXYIrqpbL2hKk2sgictkfnGrcZJKOI%2BtGY27OolOVx8nsY8fgB83vU3J8c63ZtAvtfWlqTrdFqyS%2BbU7koIeEmVCufwsJvITKMoWNnTzQZlkmJBvS21SHGcuNhzaYgLMcvCFdrySQ4V4BS%2FEz8lFSrIywFBvKabQrP0z%2FqDTjUjlHl4Bg9E%2BeEfBJNKK93pR2c57I2QO0JqEthZd1BdddKej4Y8QbkCKtQ6fUXyzpa3JrsFrm6iNjVy7K29cR00Zc5Zd3vA8n5kT3Dd3vEmCwKctmrirNurIgj74V0WxMlZM10%2FtYahH0HnX%2BE7LS39Gt6DkNHLnqGHymC%2B99%2BdUGK6qTH2iDi3HAXcVxxwDrzyL40lIW47bKENpljyrB3OQxntTmyb8HbLtuJHF4XcwhdBzaITnvuN1ivPfygK0Ow7y9zH9NT%2BaNZDRNbJyvVlLH5F1DZ5D7rim3Ww9rBIYCnHnNWd7i%2FLCbYuMNrt1coGOqUBDHWDWiZ8lvRJV2ltajDmqxQG7nBSBMuAsYgW3BSBqPeeuc3elfpB9HOO8YkLrQNJAc63rbmYmQbZ%2BlTd3OgR9CdG2CRDFDcCgWYoa3oO6hWohj7k%2FaB1c6xIAzLbiRz%2Focaex%2BouRDzPpMinmWj%2FwvARWxUsmiCWfOFK%2BgV5eq0TqokhCUJ5gUKaR8rc5%2Bka1V92iuKLbYaKUKGDGD%2BBQrhgx8TH&X-Amz-Signature=dd04b403acb013627270a786712bb3a101c1bf315d8dadf7480215c60998222e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

