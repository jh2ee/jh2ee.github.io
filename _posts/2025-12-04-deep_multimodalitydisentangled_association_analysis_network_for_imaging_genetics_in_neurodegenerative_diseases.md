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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AKRZFIS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEKqobF%2FcY5Q21Z9EPzN7k1F%2BfGUvZfm8WTb6bzH2A0xAiEArFmkCNlzE8wYEWPxxrFDpPI%2Fgx6p5sRz2SXtuOTNAUMq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDGwI6g0p63beHXIX9yrcA6hKQzCbBsRZzwvcJtJS16C%2BfUgQeNBL5UhP07fZgxhJmi4P3A%2BAIAx7G7WUiOMrBKHWgJyxE6128LSw%2FOPlo47qdF350OJ%2BzQRTg2Wmzo7bBrLBXEJG7dJIwstmfEaO9p7mnMtfHwzIxznLDbcgYMhTNJbpGPG9ZesgulpT3tj23rlXEoSjDA0TIwiTEkn%2BRNuK0s00P4WnysBuxyuDkWPK97hYmhSEq9FTh%2BC2%2BHLJhn%2FGyf1NiCd%2FfDC%2F0EU6ab452IYf8sME4BdrMA1zQDaEGJhokFUmEORp3Mqp5cXl8A%2B%2ByWGf3oYS2u9%2BMKyl0KIKyhc7apmMQxle3WJqZllsat0QJC%2FciU%2Bdmkg8%2FL%2FgVf%2F8uWzHG0pkmccMGXEFDWfojCh6hM0cTMxKyU4gTm7T2qU9z0DTwbQEHL2ffAwqiO8vNFO9llQnXT7bT2Ry8xZXbqVCjIcoT1Sqge6Eaj%2FSUBdE%2BfJX3N7G4nP4f9Xi%2F9B62sdWX%2BhJO4Xs%2Bw5cI47JUcytnI%2FhnJQz6dS732EzIKvsBJ2mYKc0kLP7XoZZ2G%2FeN4onIRzOzFUnboK1i%2B%2FNtVkejWqwmV%2FsR3uTKQBhLFqiBXWdc%2BJnXBTq3S3dg7irOXuQhj00qotsMKPh8c0GOqUBRQg9KiY%2FQhNhNKNvd%2FMkimijzPZKHWTP4ACC2bIBT1POBBb16A1ggYK9Brg6harxM23Ru%2FSgkrpoYXiRH6MnfWpvDUlaaumOR0a%2BHuCOSVQiioJ1nliqP6R%2B33NFWUDnqAVqnl20OuHKOKSIxV3ul9cdhPBlaxhErbG46Qd%2Bq6x%2FKemynGSLycPIDI49tqYuK14MwRbcVCXGmeJVzWXmHCz%2F9gih&X-Amz-Signature=73dccabd7e92b1782bd3e167b0d86f66ca09b2e0ba6c183f1b82d24010845791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AKRZFIS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEKqobF%2FcY5Q21Z9EPzN7k1F%2BfGUvZfm8WTb6bzH2A0xAiEArFmkCNlzE8wYEWPxxrFDpPI%2Fgx6p5sRz2SXtuOTNAUMq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDGwI6g0p63beHXIX9yrcA6hKQzCbBsRZzwvcJtJS16C%2BfUgQeNBL5UhP07fZgxhJmi4P3A%2BAIAx7G7WUiOMrBKHWgJyxE6128LSw%2FOPlo47qdF350OJ%2BzQRTg2Wmzo7bBrLBXEJG7dJIwstmfEaO9p7mnMtfHwzIxznLDbcgYMhTNJbpGPG9ZesgulpT3tj23rlXEoSjDA0TIwiTEkn%2BRNuK0s00P4WnysBuxyuDkWPK97hYmhSEq9FTh%2BC2%2BHLJhn%2FGyf1NiCd%2FfDC%2F0EU6ab452IYf8sME4BdrMA1zQDaEGJhokFUmEORp3Mqp5cXl8A%2B%2ByWGf3oYS2u9%2BMKyl0KIKyhc7apmMQxle3WJqZllsat0QJC%2FciU%2Bdmkg8%2FL%2FgVf%2F8uWzHG0pkmccMGXEFDWfojCh6hM0cTMxKyU4gTm7T2qU9z0DTwbQEHL2ffAwqiO8vNFO9llQnXT7bT2Ry8xZXbqVCjIcoT1Sqge6Eaj%2FSUBdE%2BfJX3N7G4nP4f9Xi%2F9B62sdWX%2BhJO4Xs%2Bw5cI47JUcytnI%2FhnJQz6dS732EzIKvsBJ2mYKc0kLP7XoZZ2G%2FeN4onIRzOzFUnboK1i%2B%2FNtVkejWqwmV%2FsR3uTKQBhLFqiBXWdc%2BJnXBTq3S3dg7irOXuQhj00qotsMKPh8c0GOqUBRQg9KiY%2FQhNhNKNvd%2FMkimijzPZKHWTP4ACC2bIBT1POBBb16A1ggYK9Brg6harxM23Ru%2FSgkrpoYXiRH6MnfWpvDUlaaumOR0a%2BHuCOSVQiioJ1nliqP6R%2B33NFWUDnqAVqnl20OuHKOKSIxV3ul9cdhPBlaxhErbG46Qd%2Bq6x%2FKemynGSLycPIDI49tqYuK14MwRbcVCXGmeJVzWXmHCz%2F9gih&X-Amz-Signature=73dccabd7e92b1782bd3e167b0d86f66ca09b2e0ba6c183f1b82d24010845791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHMDTQFG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEiLtUeB2qu5fjnHFP9R45fdqWFAFBBu1vK21pkqeeJrAiEAnCH0NzNj6A%2FLbaNA8hZn0PLCFOCoMiPaUVw6O9wedp0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDH7n5E8H2YK2pPnblSrcA8FTeWKRiTtMtWQDVeB%2Fte%2BJ8b6UW113UWuQks%2BcJoayQWZQcEQB2X4umCeSaq1plxbQwsYFyqLx0W4DaI%2FrN6tb5IDHuOxx9q5AOBbxvXHPjuXSEv7%2B8NYT1Pi5erCArsZ5KdJ3g9%2BngCDkJxjiCxU9We0DhMHLIOShQKySOuMZUdmHNHbwDA7rhF%2BAlILEb06yWeGaohOs4exwi0w%2BPjTh5PSAq1Sh7bTIqaW9U5cvoxbcKAym5LmQM7RWHCe3sceHgZzeQ9AFSqLo2UzRFyfAxwDEhLviMGPa94L8yoKmtSQWgFIni2RyYpPYY07I%2FPZBXCUwgIkFIbkQAEZWRBA0b8mR0Ka26NHwpIuz9giG3HDX7nbN6GwvxykLisTYXS0i1CytAP9f6paEpJZpieK3iigI%2FYR7a0OkAstiJEihFYbZjPazT04wjQKDFpEuPXxNBgxGN%2FnpqZXBPO290vVwIWyDh0nkAlkWrvpQG%2FmVy5tuFaSZOYbe%2FZQJQvSi%2B3%2B8rWgrwoNLBS1CC45sjaBo7jiakwaQ2ZAX3OVnxlarZPeCEZzuqlK563it9B1HZI7WZFn%2Baj3z1w%2BfUAbFBqiIFB3Od81dMa1yo4p8s4STH2GxFMr46mbD0H9vML7i8c0GOqUB94p90AGA3b1U8Vq2tMMBfyDhBe0%2FAJV1jCARZlVI7hP42RdgmEDynLCqfQhAVnhpqXbNEHL27n%2B18ZAotgO%2F6RyVVdwzt%2BWS2juaXJPV5PzNp5TYO4y0TtXWL%2BDJ%2Bxg0cAh18ZagvKNsFFiCZL4hYkjMt0ocN%2F0CCXB%2Bhz2Ik%2FvLcw%2FrGgShzembUEOtAPlX2adr7IS7voxKEd5CtfXsRn7PxB%2Bx&X-Amz-Signature=0cb5e7a8d6381352a612b38e5810dffd0d4523de2cd39cf3fa0cb153cb9b268e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJFQDQMS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFDwI9e5%2F2Vq6i078XtvGRayOZf9Mtl8DZLFuJ835orlAiBFKiU8Xk1nEtGyAFikxcjTzYfPuMKfLeM3mQui3pM9lCr%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMjOcFn629wkBPJgYiKtwD4ln%2BmehmrnV%2Bw6ucmfUy7GXLuNkV%2F61A%2FCpW3QM52TRYR4MOkNl%2Brv2Dad3kKZ8FY%2B9undBRXllqbcLo2%2BMqNsM47EaAsPnWP8AOJj79QKvS%2B0%2BEQ6SYK%2Bsr6854ahAU0oOWGpPf0RIJ3ZHUkY8DfTT88XzgFzohgfE7ON32res5jCczxlRhF4gRxMdIzLb7Fl7MYQCBoASlPizSmTo55rPXViSkVKGJBCcRQgOLYnM%2BqXVkSyfTjcXlflJsktsbcWoo7dX9NktUG%2FNIu3fUmYnxEQwuXyGJI%2BC4Btx1f%2FNCRVCHOEt77qtRXRLdgwbCRIXrRPjg86GKpl5wUdF%2BpGGPIauUMP0iGfNd%2FHkNDpoSX%2B83L5%2F09ye6CyJdyJ%2F91jTXlFVcCniJ5xC2H0D2Q5S2gUYel1ApIJVKWxFuM1Rak5hcvvW4vochU2GFtGnd%2B6NFAeLnClOH4Zk%2FkmHOlk9t8C9u%2B74HYxpJOzkT0AHRmc7KBANHkGJZ8mSGfE23FXLHS1jhcOA5fKvQNurtB46AljLD6qRZZtonrDgA%2F8X0XEleHuW1BcuFp0yDePEXG1dnVdEB9ZOf4nSveHVTwV%2F9N7gf7TB7DoT14uh2qL7gU5klJd1JH%2FqIvHcwkeLxzQY6pgG5mZPHqDelPFbDlHfoz1SFVMjb6%2B8AS0e6sulnUylGlnAZtAJAywp%2FyA5qrjMT9OrF6qr4qIYYNLe8O1xRK6wWnF6j3maWotVAYuXD54azcAeENn0LmbEdo0QPn1HzyErRE9DXruBfhLUAyQr6QEYpkOpKYXTI24D7%2BNjpni5udGTQ%2Bfw0N3VUf9TY1kVtiwIpLJIpIlmAB212E2p5p53jXKIAmswU&X-Amz-Signature=85bcc6da41949a76ccdef84ae1a3275c304ddb68c0474369ad2af99e411a68f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJFQDQMS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFDwI9e5%2F2Vq6i078XtvGRayOZf9Mtl8DZLFuJ835orlAiBFKiU8Xk1nEtGyAFikxcjTzYfPuMKfLeM3mQui3pM9lCr%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMjOcFn629wkBPJgYiKtwD4ln%2BmehmrnV%2Bw6ucmfUy7GXLuNkV%2F61A%2FCpW3QM52TRYR4MOkNl%2Brv2Dad3kKZ8FY%2B9undBRXllqbcLo2%2BMqNsM47EaAsPnWP8AOJj79QKvS%2B0%2BEQ6SYK%2Bsr6854ahAU0oOWGpPf0RIJ3ZHUkY8DfTT88XzgFzohgfE7ON32res5jCczxlRhF4gRxMdIzLb7Fl7MYQCBoASlPizSmTo55rPXViSkVKGJBCcRQgOLYnM%2BqXVkSyfTjcXlflJsktsbcWoo7dX9NktUG%2FNIu3fUmYnxEQwuXyGJI%2BC4Btx1f%2FNCRVCHOEt77qtRXRLdgwbCRIXrRPjg86GKpl5wUdF%2BpGGPIauUMP0iGfNd%2FHkNDpoSX%2B83L5%2F09ye6CyJdyJ%2F91jTXlFVcCniJ5xC2H0D2Q5S2gUYel1ApIJVKWxFuM1Rak5hcvvW4vochU2GFtGnd%2B6NFAeLnClOH4Zk%2FkmHOlk9t8C9u%2B74HYxpJOzkT0AHRmc7KBANHkGJZ8mSGfE23FXLHS1jhcOA5fKvQNurtB46AljLD6qRZZtonrDgA%2F8X0XEleHuW1BcuFp0yDePEXG1dnVdEB9ZOf4nSveHVTwV%2F9N7gf7TB7DoT14uh2qL7gU5klJd1JH%2FqIvHcwkeLxzQY6pgG5mZPHqDelPFbDlHfoz1SFVMjb6%2B8AS0e6sulnUylGlnAZtAJAywp%2FyA5qrjMT9OrF6qr4qIYYNLe8O1xRK6wWnF6j3maWotVAYuXD54azcAeENn0LmbEdo0QPn1HzyErRE9DXruBfhLUAyQr6QEYpkOpKYXTI24D7%2BNjpni5udGTQ%2Bfw0N3VUf9TY1kVtiwIpLJIpIlmAB212E2p5p53jXKIAmswU&X-Amz-Signature=bab89a0320f0df6d10d6064a3f4e2898ea6df0e42d61828e613df9f2789966ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNXH5E5N%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFCdw9GQXC8hRPZ8J2GYzKK5wOns0bbnh8rBQecc1rb%2BAiBQttTdiU8L0JXAklINcTIJjTK7v5IW%2FOhj8Y30WrU%2B%2Fyr%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMb0P7BWaeQOyHPLYBKtwDru66HS6tv3RYXFZfI9IE7zhBuoGoog%2F05LgeAAI61rTEVELtAKQ%2BtwHqiAJ5hZdoNl4iEoOLiDOWpx5ZmXXmQn32C471KxXDKOEtnP5uAbOrDI7BPAyOHki8Ly1ML0Jp4ktuqca7iAe5Y1CEEP1JYtrjBQyZF6UrzT8obwarfM4Elcbfe2JvFgOJdzDYOyGoZcEf%2FsbYyF%2BAToJqv70YdGNmFiiREHqmk37uX9GtziZmPLjyv8GoIKys6T9FiGvE3uff2DnGfEWdAskQvkLKJO0Dg587J5r985nxXxOijS%2By27WxFqRWWR%2BgMAoYfqE9Spz1KDj%2BOryTFdq5aITaQ4Qoa1Xc1cj%2Fw5ib%2FRbdq4t0ZXbIz%2FaXWPM5hcyhuclEjfrROHfSfeRQL9X1nzhmvkQcyZ7rJ0o9SZsdA%2FLV6Ge7yYCYw9jPMPQTTBa53mhDCXyKMKCJqE5xWA9fNUFFpgpRlBXpa5nyyz7ZB9zruCsdBr1Cj1cHjkhbTDDenEUN82Z32fhgoknX3H5fK7FOYHMhkXvCO1yEtayBCtUsamlApgp0WP2yrZmyn0Se9caorBp%2FYt%2BT85bxnR4GlAPiM2ekslgB8JtGdTqyRs%2BE%2BLvDpWuU5HyLtwwWop4wleLxzQY6pgE9DLDGeJhceoD4uZy1wtdcKjEmeTGFR558TvKZpWNiKLss5zoDNA4NddccjJjoTzeN%2F2fZxUc%2Bsy%2Fvv6uoK%2FDsV%2FGg8id4KFegl4VwrFLQTiCGQD1d0Sn1fRXy9iyqvjfp48Ix3Sc7NLXfe9NYJNDK5gQs1JOzsmYcCW0ywvHye0%2FXQuebdwGl9T4W2PwWG6t8%2Bs8Kiw%2BB4EOFeBWJbiDMS1VzPKvJ&X-Amz-Signature=1e64b280c71ee6b0358fc06572a18f578c45ddedd7b3d721d1f9143ac4382e90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YOXVFIE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIEstHAZJNy73YEoQC6vp2S0xSRI%2BO7uk%2FgoeKjCFFAW2AiBAryRAZ1xn1PxLGQrTU%2B5qqqUXJaSgHOc0LcXbtrTpFCr%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMfo2v1RrapeyLmjUPKtwD1Te4Ld4Eh7c0eBc9VdkQl1VIdaJHtdNranzyfwIGfWHY6Kt%2F%2Bppyame1WJKTRjlqMTNNzocXtyIeySX28ZonS0BVBD3mQhgo3ow8pJleUbdidNA8mLXRfe5B5KGi9niU3f%2BEu2F2WihUnEcmYHZFctRH5xbPRBDJHNQWdCwLDWCfMj%2BoeBrPVCgZN8lqlD5M4IA1CrH6ju%2BSxXNyTCwlNYjDKzT80torr2809jOPFP9dlSzvohySOC1EHDT4T7OYGt9oVvXIuzfLjvMu6CtZcvrMCcgFQy1uU37KP5eyyev7BA2FoLH4jYe6VDtGRB11iT5DTwSWqTVtM95sqgCu3uksYMMsbE%2BuhTDF1CXwrBpU0lbV%2Bh3Lfb%2FMfFLWWEPUoV43Xs0fcRC5Dx5fW5iS%2BRzt6K4lFYBWgYeFHFSEKpCMqxQ6RQRUBga1qyrAQpXyz9EqoJy96%2BxGtDKXRr866QsJc1iloB%2BqzLfLxhUO7fVdeE8D0XgIlDHTfjMgqdYtm9BIuZFaAXMPozfITLYKlyM6FQoD2qvYH7bbJt3rCOqUzPmPfPsJL7gwJEfKohHh6GHXg7pRaw6NNS5ZPtj2fmNetR71908dlpstaVqPoRe6GZ2%2BTjqSifrZxQEwveHxzQY6pgGxSFKmwJHhj7k8kAg9ZVk%2FDNOuObKmVP9bOOt0y8hd641peSUaiTzWkoHeEqKikP1fl3xwvfA9xJaXSXsRZZTsVqJF8IIAi%2FjCvRJQRfUjmYnll0sd3hb%2BA6sCRfRThyUc49QHqb%2Bc5gUshIv3n4MbNO3G15yrAHQggefs1gCmn%2FU%2BD2XGoOdjMuZCboCOUUFHEN%2BUkHevwwCTWl%2BvLxjoymchm5l%2F&X-Amz-Signature=6602ae934592823569507c50dcb4ca0fd9986e86b769d5ed02bbae0290dd8a3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PH3IDTN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDp3PrpY4qq2dUfjZzgM6hqC%2B6fuqDxW4OW3L1JsCZ5lQIhAMj6zCEmjmJhbVU0%2FuEJCNYjiyrJmaV76G255YeTfiERKv8DCCcQABoMNjM3NDIzMTgzODA1IgysehruYtbtGhIps%2Bgq3AMB9jsvNucEX4IrIT6y%2FAHtgmfnhzdUCGsrFfckXz8JXxduqINkPUej6lfiswFWuuezpZJkz44ei68%2BAl2RgoyKv%2FfA5khXXLh1Ycm9DmWimWsmfRSOjwnymNg0vrUTsqoke2iLoW2XmG3ObfvpfHFlqNDhnvdAM0WgbdeM88oh5aLhAYXVTWQXf9iYnybolx3CfTg0O5PhmYe7lp77beZxNjfAuZOVYgA1PLk1JOpiMx6Q9k4a%2B9TbuDdfhtWY9WI46LU4pefJ2Y4i5KrnKeDjkqHPIJkfwryCvHa67NjivQQHSrMEZyxnfYhkUCBKlbcszc68CvAWgkwOqzv8%2BfGkbGdfylYwbWLc%2B3nzBq7AURZI7ityUSo24tZZiknbfCmkSmJiPuPr6jNNc%2FyH6FO%2Fl1eAi7bn6iW28daiP1pYpl%2Fpya4rIawhrbtI71AtK2GM3yjlG6hULnCIAvMIgyu%2F0tjs74QIcIiszzSm1ZKT8wBQB8IhCySAzNljKQrBcE5At9Vz6CDOx%2FDqHEf9nenx46pSskYJgQpqtS8wAOQOzV77fATT8JWb1l%2FeKRPNZy%2Fr%2B6zsmlx5h0Z04h6CLe%2BAx%2FVpmD6rNNYNb1r%2FYQCt23qpamB9UAK%2Bqk6UgTDa4fHNBjqkAXsRhbp5ZAStADq42%2BSO5i7hCA4P8jW1bWOi3qzy3OXXX%2BTRYz0wPSVwmxumxUjPLMziTRmiJy0PZaO63UGPpjwm1DxWV8Q7dxtTgo4Tg%2FJ7glEy2ytzz8ATCIxwdnNx0Bm0jom24it7t93CIU43nsF3rL4DVwwgxerHabP8ICpcSROA8dkyYiiBiRiwUVLe0j5n3GuKZOFxQ4qPY0Tdv9M%2F0bNn&X-Amz-Signature=3c7986f0b9bf453d04052e1166e0a5d4295b1a0b2db73055cc799aa81259916b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRFC4C3P%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIG5p29gyLGLFBcRGb9KYEt7L%2BguubOYFRVHB8Mt%2BABOfAiAluL6ZWGtTAjPGc8TRuTFZ9k0mTpA5nCQg091W3ICzVir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMnCysBTnFDYx9seUAKtwD%2B0VUxb%2FG4lr0JQlLgTpu%2F2YyBoR76aOARWYZj5rwpf%2B2eGvozbXljp%2BZop9RdGeVCX5Moy%2BBbQkWMWtQKD%2FkRJyEYDvdHFNwJDJer%2BlXylNFERL9OaML0zlDHO5MR5Ky9IT8mgXHdPm0IIFLoQcNL%2BOPoYwvF5phyHIK2y2CWnssvY7L57mNoexLEXnAl307u4Wg5Xdu8bHTfdVHo2xNWL6b0bggPWPDK4J66JVkgHEf1iQtPjNFlzUZ18TmspQMWhvTk4LQaQWZGVtldbzbrQwoBRLHAuG77r1QFacahWjM5yZW1RbcPbz2VSqXy3ToWO%2B8FHKIhAr%2Ff1wGs6BmO9QVFYEvM7umA3SA%2BVa9Cd4NEU3qOLai3bj9FmFepMaaSr%2FlBrLRDKHQghYt%2BqW6ZYypIZ%2BsNuR%2BCIjcwowX8JojHcWiMIDDQx3%2FPmsjpCdoroj%2FIFVMc8Nc%2Fg%2FsH0q8P7cKJ8jgo2zIb8pQe1d8R%2BNi0jGbZO%2Blabomn8O6FTHWkJdT2p8rkrFEv6j9kSqXbOnuBJ5UASDfVTQUlNUjIIVItiYotVn08AIKDd3dc6qbEtwgLHOZXuzW2mprRXrS6w6DHfYFqwJc2J3ZP3CZ%2BOl0VhJCANUBXlvgH24wo%2BHxzQY6pgGyKiTIQPNaKEPO9tqcotA3uia0aUwASi1j1oMU3Jg%2FpzRiFipb1DtlwxURRc%2B%2FOQ21DwkMIkkIfIYJZ4XjZPtsoqgDbAIIFS7e2sTT2JTPvVomWIcwVIcu%2BDF%2Bun1%2BZO8DYRl%2FFpwtoXVYhqfHRWECyMg%2FrlBK52vDn8LLadGGzYmFVE5Bq2HNZ6iyUL%2BJZ006boRki8vm%2F9NXOoJcC8bSAR5ql2Hc&X-Amz-Signature=c3bda4db3bc83375ce0b35d31e695b6381f821d4a3459a9d107209ebae440513&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRFC4C3P%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIG5p29gyLGLFBcRGb9KYEt7L%2BguubOYFRVHB8Mt%2BABOfAiAluL6ZWGtTAjPGc8TRuTFZ9k0mTpA5nCQg091W3ICzVir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMnCysBTnFDYx9seUAKtwD%2B0VUxb%2FG4lr0JQlLgTpu%2F2YyBoR76aOARWYZj5rwpf%2B2eGvozbXljp%2BZop9RdGeVCX5Moy%2BBbQkWMWtQKD%2FkRJyEYDvdHFNwJDJer%2BlXylNFERL9OaML0zlDHO5MR5Ky9IT8mgXHdPm0IIFLoQcNL%2BOPoYwvF5phyHIK2y2CWnssvY7L57mNoexLEXnAl307u4Wg5Xdu8bHTfdVHo2xNWL6b0bggPWPDK4J66JVkgHEf1iQtPjNFlzUZ18TmspQMWhvTk4LQaQWZGVtldbzbrQwoBRLHAuG77r1QFacahWjM5yZW1RbcPbz2VSqXy3ToWO%2B8FHKIhAr%2Ff1wGs6BmO9QVFYEvM7umA3SA%2BVa9Cd4NEU3qOLai3bj9FmFepMaaSr%2FlBrLRDKHQghYt%2BqW6ZYypIZ%2BsNuR%2BCIjcwowX8JojHcWiMIDDQx3%2FPmsjpCdoroj%2FIFVMc8Nc%2Fg%2FsH0q8P7cKJ8jgo2zIb8pQe1d8R%2BNi0jGbZO%2Blabomn8O6FTHWkJdT2p8rkrFEv6j9kSqXbOnuBJ5UASDfVTQUlNUjIIVItiYotVn08AIKDd3dc6qbEtwgLHOZXuzW2mprRXrS6w6DHfYFqwJc2J3ZP3CZ%2BOl0VhJCANUBXlvgH24wo%2BHxzQY6pgGyKiTIQPNaKEPO9tqcotA3uia0aUwASi1j1oMU3Jg%2FpzRiFipb1DtlwxURRc%2B%2FOQ21DwkMIkkIfIYJZ4XjZPtsoqgDbAIIFS7e2sTT2JTPvVomWIcwVIcu%2BDF%2Bun1%2BZO8DYRl%2FFpwtoXVYhqfHRWECyMg%2FrlBK52vDn8LLadGGzYmFVE5Bq2HNZ6iyUL%2BJZ006boRki8vm%2F9NXOoJcC8bSAR5ql2Hc&X-Amz-Signature=82540c6177589455d9a7f7caebfdd2410c564debd478a59dbf061d7291d91b6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHY3MNF5%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEHhOGjUF9K4B3BTxz60YITPkd%2FpLAy6ru3o4F2Ej%2BW8AiEAxpNPCqwpE%2FLNZJqFab9XQVDx3upK1rimH4FMKO8%2BvVIq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDEvBQ%2FWoaGfgbZ1mMircA8Nw1gWnGYHW0jivgMRcK%2FURYYUlZNiodQVFj4t8Jgc8U0nEr9ShSd3xz4zQXbkJkOtk0r3Eu5k9NjDdTVVsFrYUaA6e6dGN8R4v5bP8fD0Q%2By6E7i7F6%2BPsCcYvzwc537BKqEDYaOR5mUaAlikN5aRYWrtE%2BjsXPm2Gs1EVXHLQCuF5QOspJhbhsForRxWv%2BbIIW8AHZ0J5uWw09CHScZRddRWEkjODnmkZuRnigIvPmP99zXX%2FKLO7qVh0u5Q66P95ZuEgXFELdgYwAPM0nTlyHNt6iTRs7P0FICTkLgFZJNvjPTDwqMmxeY9ciVYDDCFZo245enQm9AeEm2wKCfi6BBE8bhjJpfm%2FNgRjEnQGD0apdSK%2FDnZcK8n2wMfGsuHTutZ%2BLtqSquYjF44BZDKZK321Anza2pGQ4oKAElmS4FigyhWuT1SN52uP11Jh75v69V1qGyHQmWgYV5M0WCgKfKNHlluaEET7XZoFS6%2F1KNzRKDlTWqyzWh%2Fns1uuxgOmMRm136DKoWN%2BhTMsOLXRGdleFz0SdCF%2Buk%2Fs9ZYEZWZiatfTSsPxBr3zfJIj1ERoimqZLm1Do7HKWTdyXz7oEJwjobj%2BKwb2dt709KvsZlfWcTdNVbKg7E73MIPh8c0GOqUB6aTaUJCL6FTAEU4ojr%2FLSUy8bYets8Zdjf3ftbeVD%2FlkA%2FeNFY%2BrVsJnvGbwgYRfGJfLG1XxyRoWyUl5qpWh14JYdlAQwTHtWmnyQB0gvhXgzWmQV%2Fe8bJHvZMOV%2BPz%2B5Z9VMLiNbXeAACizQGVLBUXyrJ%2BF2V9zbYgUr2bB1EkzKeTIwj41wCLj7luWp7DPOD%2BfxoJjLgzqr6c46lJYeo5osmB1&X-Amz-Signature=bfebec628829ad29389bfab03127cffef50e3b404b61b5c8e5f02c0bb20bee9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXXKHN63%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQC7OZSeKIFw0DzVJ2DJC1agctKaMsfThp1BZ8lRDS5rqAIhAKwH4nBXsl1mQxIZ4ogqQvH%2BRbL%2BnY%2Fpe6QQQ8fUctMQKv8DCCcQABoMNjM3NDIzMTgzODA1IgzZxxFXrWMfVr6MIQMq3APlLSvhcGidxKgrfkVGgmgrPCsTEoDgcYaphMzcfKfIqycdbCRFM6yUbUPkLuLChcIMuU6lkf79dlDvGLv7xzn8LTXfZS8hGzCw54nQj%2FFY32tfLSngMWdTa1QqTm%2BqYABElIliH%2FBU5YTTnSl3zHRWlVyTfHfuWPfXPDypf2ySUonUhWsTwECeqkKPCIHfxLTDvGl7vTmm6PXygsCut%2Bl1j845xeU%2FkseqqQsv469t%2BnC6nNdt5Zj1omwmnASYAS1QuFdgs0tXdg7KnyQYWg5F3F3fVmyN07%2FI%2BHkzpk1cgB7Z0aPSe%2FIW5c5j7cuRJd5fd82spP4rm2q0b0FGusYh25Z%2FM6DIt%2BIsa8wRXfQ8WXQ7bwRjfFRd1oG5oVVh6yUpG%2B%2BhuwMkOPDqYYiBb4qGW6KTh5P8hPgmVVwP%2Fsz57siSH953pQ8opnd4ye7lwrxFynirqgLWmIwsVqJik%2Bb%2BSEVZBaDF%2Fibh%2BlV5oiRhpkvYVq%2Bvbj6HkEKVRmdSofsrz0mEDmtm1gWCvfRvmfejV78g8g%2BSCvW3nsIalf7jilLM8%2Fpw7L2ITF1p7XL4b7Bz%2BeozE6a5g5X%2F%2B0bXleTTxofIC9uZQ8g%2B1dyjoPdhPegmyYED4zfb7p%2FWRzC%2F4vHNBjqkAe8q5Jyhxo2hIlZQhEO2Zjz9HLjzhCvXUpDS38AWkesYZdVlTsenLU2wEnNJzvHZRDxSqxZcuPrSQZXkHg6FkN3YH9QXf1v7hPkAO8K%2FYAdqeyT3LIolkV9d237C0EBoe%2BC0j6iQKV8pVkgF5y4e7acAEwa24bRfZKKnbWpd%2FbV%2BTDscIgv%2FbViVv1Ur5oB0na7BynTPONpyNc9RDmMKl6JEE4lR&X-Amz-Signature=ede5aab502b532dfd9541202e442f74b72023ce48340ea8cb2255b1118978ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXXKHN63%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQC7OZSeKIFw0DzVJ2DJC1agctKaMsfThp1BZ8lRDS5rqAIhAKwH4nBXsl1mQxIZ4ogqQvH%2BRbL%2BnY%2Fpe6QQQ8fUctMQKv8DCCcQABoMNjM3NDIzMTgzODA1IgzZxxFXrWMfVr6MIQMq3APlLSvhcGidxKgrfkVGgmgrPCsTEoDgcYaphMzcfKfIqycdbCRFM6yUbUPkLuLChcIMuU6lkf79dlDvGLv7xzn8LTXfZS8hGzCw54nQj%2FFY32tfLSngMWdTa1QqTm%2BqYABElIliH%2FBU5YTTnSl3zHRWlVyTfHfuWPfXPDypf2ySUonUhWsTwECeqkKPCIHfxLTDvGl7vTmm6PXygsCut%2Bl1j845xeU%2FkseqqQsv469t%2BnC6nNdt5Zj1omwmnASYAS1QuFdgs0tXdg7KnyQYWg5F3F3fVmyN07%2FI%2BHkzpk1cgB7Z0aPSe%2FIW5c5j7cuRJd5fd82spP4rm2q0b0FGusYh25Z%2FM6DIt%2BIsa8wRXfQ8WXQ7bwRjfFRd1oG5oVVh6yUpG%2B%2BhuwMkOPDqYYiBb4qGW6KTh5P8hPgmVVwP%2Fsz57siSH953pQ8opnd4ye7lwrxFynirqgLWmIwsVqJik%2Bb%2BSEVZBaDF%2Fibh%2BlV5oiRhpkvYVq%2Bvbj6HkEKVRmdSofsrz0mEDmtm1gWCvfRvmfejV78g8g%2BSCvW3nsIalf7jilLM8%2Fpw7L2ITF1p7XL4b7Bz%2BeozE6a5g5X%2F%2B0bXleTTxofIC9uZQ8g%2B1dyjoPdhPegmyYED4zfb7p%2FWRzC%2F4vHNBjqkAe8q5Jyhxo2hIlZQhEO2Zjz9HLjzhCvXUpDS38AWkesYZdVlTsenLU2wEnNJzvHZRDxSqxZcuPrSQZXkHg6FkN3YH9QXf1v7hPkAO8K%2FYAdqeyT3LIolkV9d237C0EBoe%2BC0j6iQKV8pVkgF5y4e7acAEwa24bRfZKKnbWpd%2FbV%2BTDscIgv%2FbViVv1Ur5oB0na7BynTPONpyNc9RDmMKl6JEE4lR&X-Amz-Signature=ede5aab502b532dfd9541202e442f74b72023ce48340ea8cb2255b1118978ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFE2VCNH%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T221431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIAhXAqFmrO1%2BGnGpkOm6t1f1CfWKDOEYUhw8bzhW1ANjAiEA6H3J21aXSGj5WLvYj9ddQ71ZVeVqa%2BA1Y7kcBvbibWkq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDK53dDSA7UuSGRjAOircA8401JPvp%2B3297EZCwaGL42mAy4UTArzgm8LkHn%2Bi%2Fu5EGfqI9FPXscSKJ9C%2Bst1uU3Z143gg6ECZNdsnPjAG7YJJatyB23yjDjKdtfrQtg7piQcReXv7ad4xCnG1UMRVCTuYB%2F8TJdMVPDCExxa47ulUz5RLYzXa6YHyUhyWCIF81ub%2BJVRkJgE%2F1lb%2BZxX2hyRFIuketLRJayNVZK%2BnN5W7wWUWGB1ebBU6qhQkX%2FdtAm58%2BR7ZIjxLYgQ1Vc2KXPuZP7OHtrH2QTRtLxwb7tgYVcCPtq8baExzafzDLItXNvq9voO%2FealKt0rafdwndcGIViHTHCNKhSvcwIEf73ZIzuXfPFD8Hhbb0Skv%2B6GsdXc%2FcOrta0vmoJAP87sujAfZigGZawVupg%2B44RGzlJZlUIyuXSjbE4tVJu7anMAU1zI1TgfR9oMS%2Bvq14fbBAasZQuUskibuUDXWMj%2FN6DhNbDPdNKUbKS9HHw61%2BPOOA7Ee3f8QoKtfTacSZkNxZ8Q5vjJlL7sFAaXSqciuSYurlUs0Xb3FlE4abFH2bKyQ6FzSSBphD6O0uwi1zol2UcXRpmyzgZe2muSB6M6eMMzYk6HofDSOZECzvCu1yPJZof1b5CNyG6uwCkaML3h8c0GOqUB2GV9jEXQEr1As56MkOADiURvP8XvovPpOn0TIr%2FcQ%2BKZdUPqU04oW9z2q9AAScaa8oX3faMQq2qQr85g%2FVVwnLdNIJT5zru%2BV5hv8gARvgYCEQ%2BpJcJwPijNOsz5lBp2PV5Y4%2B5LTYq0vw%2BWsvo0DF5GZvA4q4AT2bx3SXvEGw323QH0LEH%2FIjQsqBCEqueUGHvY12GNlf0JubawI6xwJG8egcoa&X-Amz-Signature=d251aa55d5e32bde4c230b553c487118f6215eb30599e6e666e5008b326d8bf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

