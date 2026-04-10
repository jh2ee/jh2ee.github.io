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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQATFCBD%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIEGJcegserqbKpP%2FFjtF8TSJczV1TNQd8EIzsIFbDnB1AiATruQgS5QX8E9pkVjfbJzOIjjqKoLqq%2Bh02fXKQ8d37ir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMfnP5biEHv%2BV6XOGyKtwD4zu0yU%2FX5Ym4SOQtBkbyr%2BkxfKNDRZ7ArX5wizoujZpdxqLM4hsPh2l%2FpmRPFbXld0sD1GnvqEvkiRkVAQ8EiXov4MQqgVTJ4r97LktQv13q5nR3NT0paJKGIdeFGcvxpBs1mBaK0lfn%2BnVKs4UDxaamDrw8edckrNiwozwv8KON6WPPvapm9v%2Fdyqi85F3y0aXY7v6vg9KqRRxdQVqWUiSWylkuxWfaAJWybhoMnkdToNJ1J3tmcZCGRBgRrxPokh9H3dozIS0mlFfeeCeqpI%2Bm1gHgKv3ISfipE8EZskGoCgS%2BZq4pZCHIux4sxNdKeWO86MHpXs5siplqeoyvFwOKapXBOKNU5SU6oXOnejLQKEYK3g4UnyJhUUtjgoXsUZ3nOrkUeAm6HL8oCKZ1QPf2%2Bos7NAhgxzpjg9Dbq1t%2BMP8%2Fm6jWMqQ6FsmGAc8bng4hBDu6WtKf%2F2RcxrKxBS%2BOG%2BUR6q%2Fe%2FGu6nkDy04o98Kzd2ilVJTLa43FnuiWSEv67jYLjFSwVZfPWt5EfULlbshREPdjtcepMeP8XkYPcOp9Z0asvKW1hi2eHmbmaynohkh2iVdPutQa4juccfgTEpZLjOMD6eAZrkPK9sB9R2K4Yb5eTFRupK8QwoOLlzgY6pgF%2B3%2FZ8G%2BblsQBdmN5akEQCoHqrjjzkt47QqMiciOEWslAWQs9hZQdEjU%2For1oYjjNlfNQMa%2BMaCXFkqNb7i5EZNjloyQBp2vlBIKdtAWu8B0KFO9%2F%2FLR%2BPDkO10Na7PPwGr1fwpAJs%2FUaRRLAcbz3k7%2FuauamjUNz1mI38ebIZSm87KjAQDpS8MOd4GDEQ%2FPHYchhCEOUjzwyeBF%2BVlpAcn2mXWNBU&X-Amz-Signature=c0bcd664369155d4e5e5ec4bc149eb7abefdecf527bf304936371e3456f419d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQATFCBD%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIEGJcegserqbKpP%2FFjtF8TSJczV1TNQd8EIzsIFbDnB1AiATruQgS5QX8E9pkVjfbJzOIjjqKoLqq%2Bh02fXKQ8d37ir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMfnP5biEHv%2BV6XOGyKtwD4zu0yU%2FX5Ym4SOQtBkbyr%2BkxfKNDRZ7ArX5wizoujZpdxqLM4hsPh2l%2FpmRPFbXld0sD1GnvqEvkiRkVAQ8EiXov4MQqgVTJ4r97LktQv13q5nR3NT0paJKGIdeFGcvxpBs1mBaK0lfn%2BnVKs4UDxaamDrw8edckrNiwozwv8KON6WPPvapm9v%2Fdyqi85F3y0aXY7v6vg9KqRRxdQVqWUiSWylkuxWfaAJWybhoMnkdToNJ1J3tmcZCGRBgRrxPokh9H3dozIS0mlFfeeCeqpI%2Bm1gHgKv3ISfipE8EZskGoCgS%2BZq4pZCHIux4sxNdKeWO86MHpXs5siplqeoyvFwOKapXBOKNU5SU6oXOnejLQKEYK3g4UnyJhUUtjgoXsUZ3nOrkUeAm6HL8oCKZ1QPf2%2Bos7NAhgxzpjg9Dbq1t%2BMP8%2Fm6jWMqQ6FsmGAc8bng4hBDu6WtKf%2F2RcxrKxBS%2BOG%2BUR6q%2Fe%2FGu6nkDy04o98Kzd2ilVJTLa43FnuiWSEv67jYLjFSwVZfPWt5EfULlbshREPdjtcepMeP8XkYPcOp9Z0asvKW1hi2eHmbmaynohkh2iVdPutQa4juccfgTEpZLjOMD6eAZrkPK9sB9R2K4Yb5eTFRupK8QwoOLlzgY6pgF%2B3%2FZ8G%2BblsQBdmN5akEQCoHqrjjzkt47QqMiciOEWslAWQs9hZQdEjU%2For1oYjjNlfNQMa%2BMaCXFkqNb7i5EZNjloyQBp2vlBIKdtAWu8B0KFO9%2F%2FLR%2BPDkO10Na7PPwGr1fwpAJs%2FUaRRLAcbz3k7%2FuauamjUNz1mI38ebIZSm87KjAQDpS8MOd4GDEQ%2FPHYchhCEOUjzwyeBF%2BVlpAcn2mXWNBU&X-Amz-Signature=c0bcd664369155d4e5e5ec4bc149eb7abefdecf527bf304936371e3456f419d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCUVE6HA%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIA5NfVlPGprr8lzo4kQaGmzxqSp55nOu5tDiLdYSCMTRAiA9uJNFaKgciYpuczRBOuAJSL527VFHgfDNGhH1HLjllyr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMSK%2FeL%2BA6qAM6J7NqKtwDrsQrlc3s59G64yHITP1QNC%2F%2FgZj4%2BaTwptjaCHMBu7nYrznsrE17h9j2DkoUl26fBF1g7j3zQ4k3ZiIqwPRZQjyGI%2Bcin4LC%2Fu%2B4NmkngsVJTBCu2syMlXa%2B6vhKe%2FT%2FcVnbQvh2PIBjfQLTjD7GjL2JajgrMD2v0vNSUzNTIn3H%2BKaDLYL8wPLri%2B8bQjb1ejmKN48P461QRqn%2FY7%2FV2ZpXp3fnWVTGhmoKTfBu45PK8ufLKKOP8qiatcv%2F0uTEmY0Lo17pouTCtn2d%2BUNkg95h%2Fq5NeWzYeSKpD3QERHGI%2BuV3h66WWgnZmJiejLkQWa4K2yGZ%2B0sPsS6k%2F7ztLb%2Bju4Rw02NcWYje6dlnpelzNagMz6vaOs8v208DwarBASrfmX8ukYDzjOVJ1PsQG%2BIde%2BQafErytkcH16gJ8uj8Mnr6mAZv7uHoXlBOYKOGGeUVxHbXcL7Hl0PgiVoXfnAUDRACun6nc6JK9tcd6CE1ozOyvupGbrt4cn5aYak0jG7hfTqzKtX%2BhP%2F5CLvHowv8y2mr7DApLPbXxQc8OZeZalVhzfKiDaQqcyb7KgrlzlOjnOGCKvJTupCwN50%2FhRSDd0ZPUualK7C41ZjFFMMZJX%2Fy2MLwlfvyj9Iwn%2BLlzgY6pgHM2jBQzyfV7hDgzkZLH2exshf6NJj6pT14y0M3QGml6CVl8lRe%2FvCiytnbGzYVEQElOhrPuP0PV8GnxVALdfgDTKeTPb%2Fedg8GCAi66ZG1LVWBJIuQ%2F6ubSWAOtMRE43B6oX2kc4u8d2IDEaUEMcd4FNtMy02X0qhk7DMbWO33XzFWebcNQ6RKZg764TdTk5uWXp9z3bbbn%2FH5w76jcVU3l88gaKx%2B&X-Amz-Signature=3eaef4865377c2f330f4955e237121ffe845563b6a8c457c7675dcbd1b7fa311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZP4AQQC%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIDwt%2BSYGaVj741JkY6%2BkcPwIqmQ3EfGsfe8VTWmXFM4AAiEAtEG81hhd%2BrHdkvXMPv1es4GiUezix7rakQsCVT71Xycq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDMwPkx%2BaEINw7EJlKircA9GmN4gLXtcx%2Fl9Q107%2BTHdw8IZlxakHh64vOupDMA1waD42q5s3x4Xi5VRBL61rC7AqUk2YO2udb815YRxS9pbVWpSghWhUicwMr838fvBSgfOey%2F%2FVBhbxKTo%2BsC%2FNV5wTMT7x0rDO1HuTBIvTbhOQQZMxj2YAjz15n1sBV%2FxR6g6yj9fd1DAD6LvatvicDfa30npYj%2FOzOR%2B3P3q6ZCOJSjc800Z%2BSPgRsPTBYevQS%2Fa5S1FpJEaJ%2FyxVH1iG1dwC0%2F4gwmpNMaN%2BDFmd4I8SYD3%2FttXeDqctiJvsEFQbGsBwDeoDVVq7PB4MvXdRcfIs001LylQYuUE5gRSm4iSma6TaJU5jwC6dLspyRgeHvsSpKS8FzpfX6p%2BgB%2BbnVPsSbj5CF4xwkwlEC6NWWHS6fLtXbJOp6WwYdXNzB6kf69F2n8xsVORUV5Cc3BgaOUUU0co3WTF5yQUEEh3P0JGK8MuSBCXcu3OtNGLAZG4%2FFXA1H9mFdbiBQ24FMx7YZno3JvQ0a6OSdvY7AzmeuFSIiR%2BNUeaaixVUuqKGyNMaxGqPbSYrj4Dsi3CNgpKkd4yBODKSGnYPImdFzfVvrvaohuIAtp%2FODB0UmlaXQMfexxAQDNsZ5vUlTkIrMKzj5c4GOqUBIJDL%2FLuLp56FdhwkAjUquYFyoCpCSiXtwraMVSPqfsk6o3RVRp6sZvDeaDOWQtD%2BtMyz5ElFbVaBqzLvEBi2Cjpk89zkLE5QZmotxUchSFXbgr6RjYvm6IvzgQoMu9xlfuDCKhwejLJKQbD43MEb3tkmJmrkcfHXmmXhlibYv5MzvDGfFNYJIcHs%2FYybzvFiKQ2Urx4zXI%2B62wEJEEiToP2GDFUr&X-Amz-Signature=e23b899a112f2673247a3934a4ee98590a04bda65352377923d8b51929fae73c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZP4AQQC%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIDwt%2BSYGaVj741JkY6%2BkcPwIqmQ3EfGsfe8VTWmXFM4AAiEAtEG81hhd%2BrHdkvXMPv1es4GiUezix7rakQsCVT71Xycq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDMwPkx%2BaEINw7EJlKircA9GmN4gLXtcx%2Fl9Q107%2BTHdw8IZlxakHh64vOupDMA1waD42q5s3x4Xi5VRBL61rC7AqUk2YO2udb815YRxS9pbVWpSghWhUicwMr838fvBSgfOey%2F%2FVBhbxKTo%2BsC%2FNV5wTMT7x0rDO1HuTBIvTbhOQQZMxj2YAjz15n1sBV%2FxR6g6yj9fd1DAD6LvatvicDfa30npYj%2FOzOR%2B3P3q6ZCOJSjc800Z%2BSPgRsPTBYevQS%2Fa5S1FpJEaJ%2FyxVH1iG1dwC0%2F4gwmpNMaN%2BDFmd4I8SYD3%2FttXeDqctiJvsEFQbGsBwDeoDVVq7PB4MvXdRcfIs001LylQYuUE5gRSm4iSma6TaJU5jwC6dLspyRgeHvsSpKS8FzpfX6p%2BgB%2BbnVPsSbj5CF4xwkwlEC6NWWHS6fLtXbJOp6WwYdXNzB6kf69F2n8xsVORUV5Cc3BgaOUUU0co3WTF5yQUEEh3P0JGK8MuSBCXcu3OtNGLAZG4%2FFXA1H9mFdbiBQ24FMx7YZno3JvQ0a6OSdvY7AzmeuFSIiR%2BNUeaaixVUuqKGyNMaxGqPbSYrj4Dsi3CNgpKkd4yBODKSGnYPImdFzfVvrvaohuIAtp%2FODB0UmlaXQMfexxAQDNsZ5vUlTkIrMKzj5c4GOqUBIJDL%2FLuLp56FdhwkAjUquYFyoCpCSiXtwraMVSPqfsk6o3RVRp6sZvDeaDOWQtD%2BtMyz5ElFbVaBqzLvEBi2Cjpk89zkLE5QZmotxUchSFXbgr6RjYvm6IvzgQoMu9xlfuDCKhwejLJKQbD43MEb3tkmJmrkcfHXmmXhlibYv5MzvDGfFNYJIcHs%2FYybzvFiKQ2Urx4zXI%2B62wEJEEiToP2GDFUr&X-Amz-Signature=82c1be54b6c02096488c61d9098a2de9b7d61b9b27040b9b881892dfaf27ae94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NONXEAR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIF2T2ZOcBMeR5DOrZ5M6STxCx0Bn4VdUffbH%2BTQ%2B8cUZAiABk8Zgy5yqCCdF0knFaIBBPzwmBNhVdch7s4ql60vlBSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMYjzW1PifOsnSMswDKtwDPk4%2BK9SRFnEkjDNkt0MPyP3fLzK4GLF6odcsNKmBF6r5oagR0DqLqsd0tptebbCOYSnTaoqlbD2gOW6FCwtaPw5bvgWxr9HpoklN5gxQaGf%2FmJOBdMPrwNJuQDQyHHE72hTi48AoRxU51GCeBbtWxZQP9%2F5UnUseb3EeAx2n10ZtGLDvAU%2BQ0wnaTQT4c2Map6jYMoBjmjxAiCUXEIltRshoFDC34YaKAnNKIOokeP51gr1gkGCzOQSstCwLhbnKDmt3S1giosSUzdeHxN8zouM%2FnducFJ%2FhsblIxPm2ws9OwOyiCEvmZCXwIvpToT%2F0R%2BuqQ32bCS1eMz3ISxrgbxvWL8hGKybv7nRAUTLFtww48bFnPcmlwPqfAc82%2BdirNyfFiVdgq%2B1Dsxir7Wem1jXJSTX3%2F%2BcUYOcKePQhGZxQyZrg4lS8Cav2wpfSg1Pd2iICMKxrTTOQ6K%2FkfRxVd4D%2BH0R7VG8s1lYffgRC4jR5K4c8neKGX%2FLB6tVGTPtDo4ygZB714E5x3nJHBJbARt%2FMxXGxBo%2FtD1h%2B6dFWtqCuABAtEpzZlDD55iVtCgAVfJaM2Sta08KdMsYRuYUaK9X0W%2FBOWc2XA4P4PfAzqx59uJQnGF70wnF1pMkwuuDlzgY6pgFagFmLi7sNVqQf0WbsnxKgsypfjO6sfLZXvBUANIPveBRA2Tw5NEcHFxAhljEQrmxL5ZBL5cN%2F75PNPldgwUAOeeQ6Edat5KJTyaWnrOYJj70rUOf6O2TgpqnsuuKGEawoF36L0ln1wifhbO7yBMZBodotTB1YiRpmEh1EsJwzCjurDTgvcC6ZoB7MJkXuBvwQ20gu%2FJk3V%2FTzKfQgPuamJiiztlmf&X-Amz-Signature=415ec42d82e091b3e00426024ba422d2bc8b2a06de81073dadd7b704c182d477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QI3MC2G2%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDCdC8kMRFKkpgqcPnXLur0e2LZ7hc3VBI6TJeFTL6aOAIgYtPaD1R7SvkGCOeBzXRfeF9kpxFgOZjJZ%2BRlgXWgmSgq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLFlmMGqenLxF5zugyrcA3%2BUebY8K%2FcT8WZn%2FQhFhlJP1%2FzUIZmWX1p0GFCWi6oYFDq%2BiKfdjIKrF%2BZqjkalVQ8bTcmmR2PkldLrS3LkZF6WuvaM7dbFMmHxIC%2FRngFPgnhgR%2BpHU6dqLcrVhpKCFTenCe3%2BSEoK6O1ah27D3rjKsmoxeCkD%2B2U1tcw6ybLNPP6uhUL%2B0j032q5mNNQ%2BgNdfmyG312d%2Fsk%2FbRoFELYVKu4ylXBnmQLsybWDkTcxP%2FR%2F7YVa99zj62IHhO7DjAMQOhfha9TvAfeYV1RGDZaGhjiAbvLMFvrGFjvkzADeLikI0UfPwyr3oktSLfcxy1qGa4aBF6BxkAwiM%2FJbELLWkeozF%2FYXFmHz84yKaW6y7oMe2wneSvVEe%2B5jNUhhVSwPKHAq5if00xpgw0%2BffDKQ7E5dlcBuIZeLBVAJthuOec5y9c3R4XBgDZLkNYYo%2F9EwS%2BLwNKzQqiXShqL0ITT3fAE5b5idSQ4R8tXNNQLuODl%2F6tNx%2FNYDe%2BoVBlegJtDyHWlnqijPX5G9qLQszDNFvW4VU84J8h%2Fm8q1l4NqqNfgkrDtgUXFHVttDa0ZhG1nMJnY6vYc8xgpUppaEVCcNUDj6wlDXY6nOhSHBEWLOuoKgZhgWzE2MNnZOXML%2Fg5c4GOqUBbrvasgEfBIdmROO0AWq44dS9q8xsrLsJJTt%2BQFw3GxTlYR6caVCDksHmYFtWTdmZXg%2FDAXaTsD9EuDv0q6MtlFvn7wAUdSSLHvGo34C7kvx%2BDVgjNPaRpfR0G1OzxAL0z2z133YorI5rLgC%2BxVjA67mHm596Bw3jjFbuJ4vXDPqnAfl00DHLON6JplKpU54n7MofQidVXFlZJu06Z1K0G8iD%2Fi6M&X-Amz-Signature=c56a4d28e6beabc97610924935832bf0106d34c3500c0a67d06b653eac1b44a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674FNWXNQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIDp7PEdR3ucRD664sHIRo2QUyC7q80HBe3DqJQIVtjwqAiEA4h8yD36lpnLtKYG%2BYlu8DtlyTbAfrDnBiVMrmjr%2FUqIq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDKCOcsoIJMrskGpbHircA%2FDeIg7vjoFyA9qhj8kbknPnYe5hMVlWSa%2FJqZ0piMEvhGZZM03YiUO4ZlsoEse3RNjmrqqKol1NiBegSYFkAPb4k4o2AOOjMbZxThDlDz9255XREYnzsha0XQiSXPLYYnLbRBPxNulPFyy9D22XISxAw26opGzeMyF7Kv9yUtwWUNYwrsUk%2BBOBonXNHubDdQwyE2kqxvx5x9QVjrU6ual9bm6M4t7gYzO1sC%2FpisBAB82KCEKUBwDMLM2E48ByIUsXPKoUqK3K47NCbX%2F8pVlY3dklF%2BZOwJ42B7jMZaBu7RwsGFsSghl5WUNng6z58sasOI83lsSPeGzGiXmkuG5ngkG4k2y76xoKT0OtiLCWj0xl2BxwWGa3GCmgLFmCd9aQvVS9NATk14nIFG9lIV2EeijVLyxRsxlxAc32SWe7w3PGiJvKaThmtwPNJ%2FrJI%2FUzmKXSgS7tEaxs3w1X%2FyewVCOllnfVjmjlbU4DXfdXqV0%2FshMc9m0iEh6U2cFqu9%2FZQQF4DJtXR3gHWyuoXSIL9OJpW5Qs9%2BLtQ88LsppwgWw9ZTZk8NwnfoTCM2zN6hpI4ii1I%2BKv57sY7KDBtJfKWaFez82j2Oa5b%2F5YtvMwf0V52SBSX9DS5zKOMIfi5c4GOqUBOIdTEZuZ6o8J1lnsnwS5GUlrQ%2FEea9L5KWaWweegeJlGTjMod1JYpR%2Bfe7EzOircT6Ah9ntUttLt1m7etQrcn0mYXqFRo%2BDtDOcVN1dscMZRrEuVmBQJOnvKOfq1Oee0y2jkpp2pW%2F9XqiBlQb%2FCzWDw6td0Gy7qVko64ZJ24pR1uZ%2FOY7S6k5Nv18mdNhknieSYq0z8IMQh%2BiuG9hUsbZ%2FNWLY4&X-Amz-Signature=22ba0a063d133d899627e8a2c4ecc88df72326158bf31b726e27bf5435da155c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNRPACM7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD8d%2FY0Hyg34Wz7YXtZM5Jyz5O4Q6vPwtIfXm%2FRJXNIbgIhAI%2FRFoACb%2FIyL4cCkYHkGG8ZkRGTpYYgt%2BC2cjPJbaUbKv8DCDcQABoMNjM3NDIzMTgzODA1Igzv9pTyECFeJzQcQZcq3AOHqxONmOcSRARdCQv57kA5uLcmeXTXSxN9yiENC6VDe5htUEtDj5pboud2IIhtmPqKaL00oqOEePkJFXGjUQ%2BSfBlPj0GO7vqKUaXE4f8xNw0AVgChXlUj8c6seh6BI0%2FdpMUJs7ghSysVLhRWpuqrIWQLOXl6cBHdPNpcfpTR4kCwIVBgLk5ta5AZlGgqiCvfH7o1afdQAAke6Z2b17a8hjiShm7eLHaue3iDWDQmOr%2FUz588HUZsL1oP7uSdZCsuEB8lYl3ZHKq%2BzbVo8meoP3fE3KKCf35jqdtS9KjBm1ry7DclYlz0J97xC5cvmYECCefiIyLTLqLNJj%2BWInemMwa72PPuwuUFxx6YbkdmRwgDSb2kmL0iy%2FMDlh0Bnh8ScG5%2BGrtHBTgp2fEwp6z3FyxKMeYIhEsTdghrwugguLsYQG5ORVkU62zMq7Ur4Lc92bK5FYfxKspa%2B9G9DqRlRyx9JrmwtG%2Fllt0uHI5Cx3nKgiUlwECq%2FgalNo0PMYOB7LqHCwFbAY7oHno1om3EOMl12eJk%2B0ychN0ff6CdrWFUhqksiJqOTkiSW6nsZ3s%2FKEgV%2FYpK%2FlBrad23l94JvOCI7thhqJC21jmNWUnfN%2BHtjV9KoPNFuFtkwzDT4OXOBjqkAWwROQwSvyQWDakCe2vS5fMSxSuRsYp3kK83IrCkPkN2AK2gAw9ae1YKzKe%2FhfBWn8oL5LFy6ouI1zM8qWSFpJIo9qZ4zgPhNK0mmMUBkGcMwZJSHay3%2BMdB6n%2B0%2BhMyKWtT6eT%2FhwhTLQg43c5K0dYsmpxXXrgrHP%2B9pZkim%2FKmC7QOVxMctPdNgMb8932UkiY2XDZDGfjLp5UMBaphBiNlG4pf&X-Amz-Signature=5af01147191afedfe12e05d6d6f006487f5caa264b5e1f8afe5a339a6dcff6bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNRPACM7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD8d%2FY0Hyg34Wz7YXtZM5Jyz5O4Q6vPwtIfXm%2FRJXNIbgIhAI%2FRFoACb%2FIyL4cCkYHkGG8ZkRGTpYYgt%2BC2cjPJbaUbKv8DCDcQABoMNjM3NDIzMTgzODA1Igzv9pTyECFeJzQcQZcq3AOHqxONmOcSRARdCQv57kA5uLcmeXTXSxN9yiENC6VDe5htUEtDj5pboud2IIhtmPqKaL00oqOEePkJFXGjUQ%2BSfBlPj0GO7vqKUaXE4f8xNw0AVgChXlUj8c6seh6BI0%2FdpMUJs7ghSysVLhRWpuqrIWQLOXl6cBHdPNpcfpTR4kCwIVBgLk5ta5AZlGgqiCvfH7o1afdQAAke6Z2b17a8hjiShm7eLHaue3iDWDQmOr%2FUz588HUZsL1oP7uSdZCsuEB8lYl3ZHKq%2BzbVo8meoP3fE3KKCf35jqdtS9KjBm1ry7DclYlz0J97xC5cvmYECCefiIyLTLqLNJj%2BWInemMwa72PPuwuUFxx6YbkdmRwgDSb2kmL0iy%2FMDlh0Bnh8ScG5%2BGrtHBTgp2fEwp6z3FyxKMeYIhEsTdghrwugguLsYQG5ORVkU62zMq7Ur4Lc92bK5FYfxKspa%2B9G9DqRlRyx9JrmwtG%2Fllt0uHI5Cx3nKgiUlwECq%2FgalNo0PMYOB7LqHCwFbAY7oHno1om3EOMl12eJk%2B0ychN0ff6CdrWFUhqksiJqOTkiSW6nsZ3s%2FKEgV%2FYpK%2FlBrad23l94JvOCI7thhqJC21jmNWUnfN%2BHtjV9KoPNFuFtkwzDT4OXOBjqkAWwROQwSvyQWDakCe2vS5fMSxSuRsYp3kK83IrCkPkN2AK2gAw9ae1YKzKe%2FhfBWn8oL5LFy6ouI1zM8qWSFpJIo9qZ4zgPhNK0mmMUBkGcMwZJSHay3%2BMdB6n%2B0%2BhMyKWtT6eT%2FhwhTLQg43c5K0dYsmpxXXrgrHP%2B9pZkim%2FKmC7QOVxMctPdNgMb8932UkiY2XDZDGfjLp5UMBaphBiNlG4pf&X-Amz-Signature=4d5beab3cae179b3b1f53983ab644301812a764a37d3e7a588f81c8334f580d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LJFFVW7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIHBmpIsY6L6cSW%2Brc9vkUb5oBmHTApW2Cs8zYy0caxE0AiEA48Gt920W8xIC1p6NtAPlAOGqml2Z%2FtuCq6a85mwv9UQq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDJ8pFpVK2I2X0d6XcyrcA4vIWyhzxi2Tin6jdN3rX8dMaaxSO4bV2QF%2F1jHoTZifAcyK0Tkr9Q465P%2BlvpQnUVqKT%2BoFlBUIeulFI09FuHNnVRU%2FZTzCL1TTrtab7xpCBvQpNGyHXGLuVZiN3N9rE87sO5v0K%2Br86tIiN0baegsZq%2Fr%2Fa43xrwpf%2BiT2Uez0pInX%2FCrjjUmQpyP05biSTokBNRD%2BT5Uaz2bt5LzF4uMoA02J%2BoFw3Gmlx3a2fbTeHeoBBmi4k3Eo560rTko12wCY8FeDYBmRcNHIfuFFqKsIuALxmgqaoih6wqjchrh37R2QyGcBGBn7Wquj2HgXMyhuQKRpHBWwhP4uzsUNgU4YKbmM%2Fa4Od7BdR3VgiGYMX2FbnGzNeLdG0s%2FWHRokKtqgaur5xXKxvyZkaikGWu%2Fb5NBIH46RYEB6kOMR3Our6rHA%2F5i54vOYz8z6V1Ui9qt%2FqDtXxO%2BIWrGg8B5%2BwXzVaBBLWgLOMd6T9p1LrT01p%2Fier6t2IhtjA9mfIZIAw0UyNPko%2BKEACdXA2gXohqu4CZm5GVNjsc%2FuE1zF8JQLKAX%2F0cIQtaFVtcy%2Blahi1VWqMJWsP4lZJnd60QJEy7LvqYHcNaz0CQ2y%2B%2FvHiKzyLU3d0VxgSdZhj6IqMK3g5c4GOqUB60WcJ2OLFdBK9LYhhHYCeFeV8bfs72PLIJy8nvrKEA%2BGPJKprDM%2Bl80Hv5n8UVMCQaVgneSI23gZVKxPNtur6KJtQI5GqBjKaK8bIbuqQHtupvgm51R9Ybl3%2Fzb3H7ycAp3nvE53SwT28XhxTiRkT1s4i4KesXacB0x30SE6lTLL2%2F4C59hOlLR0z1Ola1hoxJr7h23Ko3U67Utiwkg66E9bRWsV&X-Amz-Signature=6d94b3492d6f0f48197be8682a4051211e7e69836e163ed2fafe0b30e975a4e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRZOEETH%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCXtBB%2F4d2Vp7%2FmnG114xo3fN4VpipAxZFC567yAKUeuwIhAPETsvhdZEuZ8OPg1IDI8bjAFAlOeVi9zzisH9xJQuHPKv8DCDcQABoMNjM3NDIzMTgzODA1Igz%2F1i1S1XNIG8H6kywq3AOd6LzlE6iFRK%2FZgeSl2W9BkWolNabXqOLYYTekiZyVtKYtYkyN1OzQn53xMgW5XoEAuQHk3%2B%2Bj60SDVUgZhhmMf77OQR2u7jaC6i70rTwa%2FeCq3tSEPEDmVZGG89mrWKGfYy3OR%2B%2FzZ2DqGQImUpIWZdONpdVndWrYpFImYQxpvPavNVm6%2B14vpM4hZTHIP4No%2F4AabPty8qolCS2u%2BJ8kG61JXbE1AlnoJddIK%2FrYIlcA1QlVShq922GvuXbetaUHX%2BEoenNtN2YqcHIkOw4YowTp7yHnk5NVkKJXeIdAD%2B9sN%2B5GegPqADq47JwZsoc%2FGNmoSREyvmo20IS%2FpEyKv7RzR1LoyiUo7zgOIajgRbVHes1ruQ0cEcsmdjD0tHpFKD9qo3T4rRaxeED%2BmneNkdfzvcrU9vrpAiMOy7AllW%2BYP4ajQLJlT4niQJP6oi22Ql%2FD81HDF6v3khes501nzE7L61WvIgmVvmp6hNHyB%2FNl%2BRvQRWLOQqolLyXZK7XGvpA0LMHkMQRgp%2BLMqZ8Kana2kjG5CpgOF8axwf5RGPk7b1JB96tgNnlO8KHrTdvpms3I5WTfPaIKsHFawdUi9jh%2BdU28SxMsgz%2F0FRH5xTmVgjC5KsEXq9R91DCl4eXOBjqkAZZtjgxQIdpb9hdylrBqNwiAobqzRenWmzuQiFCskhXmfmMvTpjNJI1ldG3TF18gifsqbal9HSU%2BvnlWq8nAm9Ar4%2FzSpB2JKU2kwMaJup5tNhBjd%2BqRhOXttbqjo5NLhtXOeDztJSr7D9KOzwhz8Htiw9RcPDf8ZVbGdHWyf%2B9q8DNF%2F2f971IRouS7TR0fg1iAPy3RWJRX2SDUT8Xi1pXIy4Dd&X-Amz-Signature=7cafaafb50546999742c028ea5a554442772c6d904f4e00b3fdf74b61eed47e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRZOEETH%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCXtBB%2F4d2Vp7%2FmnG114xo3fN4VpipAxZFC567yAKUeuwIhAPETsvhdZEuZ8OPg1IDI8bjAFAlOeVi9zzisH9xJQuHPKv8DCDcQABoMNjM3NDIzMTgzODA1Igz%2F1i1S1XNIG8H6kywq3AOd6LzlE6iFRK%2FZgeSl2W9BkWolNabXqOLYYTekiZyVtKYtYkyN1OzQn53xMgW5XoEAuQHk3%2B%2Bj60SDVUgZhhmMf77OQR2u7jaC6i70rTwa%2FeCq3tSEPEDmVZGG89mrWKGfYy3OR%2B%2FzZ2DqGQImUpIWZdONpdVndWrYpFImYQxpvPavNVm6%2B14vpM4hZTHIP4No%2F4AabPty8qolCS2u%2BJ8kG61JXbE1AlnoJddIK%2FrYIlcA1QlVShq922GvuXbetaUHX%2BEoenNtN2YqcHIkOw4YowTp7yHnk5NVkKJXeIdAD%2B9sN%2B5GegPqADq47JwZsoc%2FGNmoSREyvmo20IS%2FpEyKv7RzR1LoyiUo7zgOIajgRbVHes1ruQ0cEcsmdjD0tHpFKD9qo3T4rRaxeED%2BmneNkdfzvcrU9vrpAiMOy7AllW%2BYP4ajQLJlT4niQJP6oi22Ql%2FD81HDF6v3khes501nzE7L61WvIgmVvmp6hNHyB%2FNl%2BRvQRWLOQqolLyXZK7XGvpA0LMHkMQRgp%2BLMqZ8Kana2kjG5CpgOF8axwf5RGPk7b1JB96tgNnlO8KHrTdvpms3I5WTfPaIKsHFawdUi9jh%2BdU28SxMsgz%2F0FRH5xTmVgjC5KsEXq9R91DCl4eXOBjqkAZZtjgxQIdpb9hdylrBqNwiAobqzRenWmzuQiFCskhXmfmMvTpjNJI1ldG3TF18gifsqbal9HSU%2BvnlWq8nAm9Ar4%2FzSpB2JKU2kwMaJup5tNhBjd%2BqRhOXttbqjo5NLhtXOeDztJSr7D9KOzwhz8Htiw9RcPDf8ZVbGdHWyf%2B9q8DNF%2F2f971IRouS7TR0fg1iAPy3RWJRX2SDUT8Xi1pXIy4Dd&X-Amz-Signature=7cafaafb50546999742c028ea5a554442772c6d904f4e00b3fdf74b61eed47e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T63ZARZO%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T222304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCICNV0vIf2WYaU42uKaID5cZ6bZ44alnlsTZK7ifwxVfhAiEAoZhETixpyIunCtdjSopsdyFZWEKUc0tStrfekX8u%2FA4q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDmGl1lpQ1NIVCIrnircA3rp4XOplPekPndWAG852c055ZlrAbJTPmGYWsAR%2BiJ5jOnYGFL%2Focjl3Z9iW88RjWKK6IJp%2F3kXGYSR%2Be%2F%2FWNKpbXvPm0npX2ojTk8iTWWGX4WahKe5totCXSDXgLo9zyaUamqYZj9Bw2oMXkdbAufeAPXH2VUUOv6Q4zQDFEAQR92HGqHXXAsraOa9qFTwUB47jZSndaCvLLc1siRTAMEhg4tkoT6FBuaIe0e8iDQTqD%2Fw3G3LL8pr3rFkfrFjHuy4YQG3w%2Fol0LmdLm1kVvE8sK6j8pyrVqNYod%2Bbjk3BEXrPBZfiAxlwoXqWEbEj6SavcDMyW1PTMHkUnfni3mbf8wgVqCJrDvOGCa4kR6KERb8jj3uJD7ETGV3V3rE4F7yF7%2FZGGIL%2BxHq3xWrwx6U67Y7juQkF0ZsXTmyGaafD6SEXcrXLaGUK4AizRE%2BcfqIS92rKEs75UAxogTpeYAs2rbmNxrnkU%2BYdzOv8JCa8pF%2Fe1AyUs4L8W0hwF5fg7HNBqoVninlw6p7wfNc4alxq1GFq2mlCBjZ05cS%2BFVqqOXoQsHaGxXZg1rOCwyOOwQCdIMeW%2F%2F06wy6WXPdsbkfz%2F3N1u1SylehLf55RR8Yiu6T5Vc87OsAnhXWOMNjh5c4GOqUBiV8r0df61bT7VaJqk2DcGJszYkrxPc33KywdxsD0xTP2yfvUtmdlSAz8ZYanhUj23m25jZWIQeGL%2FxcUDSqqLv9UuhDNEBDyLjilmrAlMJr%2F46StqLU%2B81RRBLtUoVZkMEgAJ4yq2eJ99A89KfS8lwBXRjcsRUOgde%2Fc1XX1bvBGdwR2G15mqXvdPv1FgqkmZxu5veOCXb17Px7rZ7kKCdGKc9cn&X-Amz-Signature=4f82ccbe4348dcc04b2b7c3feb9412825ddab7b653880212d9b16f4b0c1fbcaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

