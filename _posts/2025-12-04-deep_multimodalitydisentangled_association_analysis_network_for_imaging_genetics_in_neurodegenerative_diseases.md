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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQAOMY4X%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDmyHY1Ik0t%2BcKhgBWgaVFwN0npSDVTZDuDqtnYYKHLJAIgXmWbhz0cnp0UMx6yKHagQpbuYObt2nyOo%2B110PH7Y9cq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDL36EmqK1sd1Tks%2F4CrcA%2FTMNn62asKOVH9gd3w6rhbk7MfWYz9q0S2QnvM8vIdj89hitUNq18WT0S0WykoNqoqeg1htTzo5ByogKmlGrWe99G6lcC6CyYGi7UC2G3X92IR%2Fj%2BMpmDXM56pV3foliQzs5O3pq3p0ssqRi4zDxzJSrd6aRYXkvC%2FnYgQPbqnpvg6jeoxwIQGfysQi7Wk8mw3%2F7otNGqcLy5JImNxdD%2FK5xXpFCuuEAMJU2MfyDT%2BhnoSqo%2BIybG4G39chBhAxIyyUkfBrfKEGuRof%2FtA6AudzoojxymeVBgstHV4QJ4AvnhLj6EsNE87Css9h2K6vh6Tl4v6MidUXCKh5OvHb0dHmfuIcHPEI13su0yb%2FW16dViJJVzC2CIh%2BZtt2XiI%2F9oPsYS7xU7zycVkeye4VNYZ6G8OYyPUvM5ufLs5DjBcXydZK4YX3AwYlc%2B4LFruTUiViQ8JcRXNQkAB47CYh2gkMJBkwQjtLoeiL7M1xF%2FcVnMhcvW28Rm%2BejBNCveRKf8NG5L4MFxMywYFK6si0iVbpsSl56tazWU3bQatoR1ng1UqkYQfjDoYTrMfnNSA1DRD7tKyiHyFOkxV5pPSnhmjhNfyUFhodgOBitA48flFLku%2FhYcXFnTQUDeIXMKrJqs4GOqUBV4wq3RK92ERqYzbkF9TWOXj6eCm4gMWfF0q7WOwAMaL0AmICDOE%2BSHUcMm%2FTSnRYkd3KuFUlh6d%2B%2FtSBWU3nr9GbSULehTUp7RkjtgQBetUeAGB45kKrBIbjJ%2FeU3x0KCPZdOwUl6u9RXfD2wuB%2FBTXbfE7824uyU696M70AQ%2FzPU7Q%2B%2Bg5NwQfhOipYw7cCNLtOKTUYW9AtnmqaEPlw5qOnFZUe&X-Amz-Signature=4ae20a8b11dadda3741abf0888cf21ed3b056cce4f6837abd9289ea2c24fa7aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQAOMY4X%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDmyHY1Ik0t%2BcKhgBWgaVFwN0npSDVTZDuDqtnYYKHLJAIgXmWbhz0cnp0UMx6yKHagQpbuYObt2nyOo%2B110PH7Y9cq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDL36EmqK1sd1Tks%2F4CrcA%2FTMNn62asKOVH9gd3w6rhbk7MfWYz9q0S2QnvM8vIdj89hitUNq18WT0S0WykoNqoqeg1htTzo5ByogKmlGrWe99G6lcC6CyYGi7UC2G3X92IR%2Fj%2BMpmDXM56pV3foliQzs5O3pq3p0ssqRi4zDxzJSrd6aRYXkvC%2FnYgQPbqnpvg6jeoxwIQGfysQi7Wk8mw3%2F7otNGqcLy5JImNxdD%2FK5xXpFCuuEAMJU2MfyDT%2BhnoSqo%2BIybG4G39chBhAxIyyUkfBrfKEGuRof%2FtA6AudzoojxymeVBgstHV4QJ4AvnhLj6EsNE87Css9h2K6vh6Tl4v6MidUXCKh5OvHb0dHmfuIcHPEI13su0yb%2FW16dViJJVzC2CIh%2BZtt2XiI%2F9oPsYS7xU7zycVkeye4VNYZ6G8OYyPUvM5ufLs5DjBcXydZK4YX3AwYlc%2B4LFruTUiViQ8JcRXNQkAB47CYh2gkMJBkwQjtLoeiL7M1xF%2FcVnMhcvW28Rm%2BejBNCveRKf8NG5L4MFxMywYFK6si0iVbpsSl56tazWU3bQatoR1ng1UqkYQfjDoYTrMfnNSA1DRD7tKyiHyFOkxV5pPSnhmjhNfyUFhodgOBitA48flFLku%2FhYcXFnTQUDeIXMKrJqs4GOqUBV4wq3RK92ERqYzbkF9TWOXj6eCm4gMWfF0q7WOwAMaL0AmICDOE%2BSHUcMm%2FTSnRYkd3KuFUlh6d%2B%2FtSBWU3nr9GbSULehTUp7RkjtgQBetUeAGB45kKrBIbjJ%2FeU3x0KCPZdOwUl6u9RXfD2wuB%2FBTXbfE7824uyU696M70AQ%2FzPU7Q%2B%2Bg5NwQfhOipYw7cCNLtOKTUYW9AtnmqaEPlw5qOnFZUe&X-Amz-Signature=4ae20a8b11dadda3741abf0888cf21ed3b056cce4f6837abd9289ea2c24fa7aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FAZMVOS%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIGhecfCkt8nVdHMHIYsGYD6LKKcueoFkLwHd0F2H64sMAiAX4mgw%2F0qNl8b4l%2BQKqqaC23prBHQOnzj93vdVBFscFCr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMQdFgfkIHxEcxjQoQKtwDY6byCNmUTEpSNevmiX9OSmYQ9Qhsj7noapgcEn0X338h3FExqUwcAglwOaB02SLZ4EhYOp3j8wXKU5MukzBn70dJGTavxvWFxMti%2BzZIjToi70APdJ8AFspW8KSyMntcqjtSbKs1q2KZb8Iob9ehyTuQTDLFsuOI%2BJ8RiMJNGQdFANrNEMSxUzx61IcTK5gi23cKaeAf4hbHPMffgy8OBJr5sp%2FrOp2iMzisc8kNNRq1%2B5zEoR6Qqjr6ndwSe1B1h1DzmPh1DBBG3p7bjjK9zNBw22LVx6oM6e0JxveYuV7TT%2FvsbLO1Xpbg5JrQxVn341533%2FswzRAbKc2fvMQ6%2BgRu4X3ZSAM5bQtHG%2BkXhJyeWbxsiXs%2BF%2FL8q1f5gcELCcgvIIic9cXMmVCu7F1rvFQ8pDcnP%2FV%2B90uPC0mrOMkljGhjkNkdPHwNT1kpouPaWU7kjgiStiRhsAosjtBlW6oVq2LvglmZ4PE05%2BJYyFeVyMYyiVSQl9ieMEHq8K1QgW9AttddtaOxojr%2BQKpuJjTw80pytGHBgtKT11gsT87lvOp5OfJCEJbHb9mRNr4kmtq1O0ixS8Ez6GKYfdg2PMAdS5bJNesTNV2YQBSAiLGRvqv6M0gFY%2BwPbcwwncqqzgY6pgHyapYhSP1njsd4R0HQ74wJpOjPTPq4mDd1ZBOErj0o0LbXU%2FiqZ5ASrnpcE0VulzGvkNt5hmu6Zi9b5af5t%2FB6xA8jNOXGJSMMlWmncvBCfQlO4XJmspa70pXnbiliQCATSLYCjJbKrxbbNRn9%2B1LGmks9MW4jvCEtLBwghlLmlREWg5wKlC9peqY05e7NNFPJMPLGmKzpsSH85hgv4%2FhN1RhESw5r&X-Amz-Signature=f111b7760b842cef67ec0a55d076cb8a769d3dbc291e7f6a3a1b11a027a9ae69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG52HGLK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCICFSk8EuqpBt%2FzeEsaVtNvdCQ%2BwlPOBmNXxqd8lZIheIAiApL9oTK%2Bj2QRDwmNWPZp3iWbErH96aQUcicZ9IjehmSir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMZfUytFpjhj2o1TXoKtwDhBYqkUGG%2FEsx1%2F6y4%2FgiRdAZ3nQGVK3cfVZpgVSwMnP5O3djz07p9ediVbIDBdGlraWwBnkd0CD2Kx7ittDr%2FjgV0mS1Hx1OCMDFcOudsfFGY6rkGmFjfvjx5H%2FZaIu74VX65HFwFB%2FAAnk0UTcAGF%2Frip5tgS48OrKUOcdYTzR6LNIdRBOdBYmtUuXWcX1LMm3j8LVAbLCbaEkKdZE8wM7xs30oqA7V8Ok57iueKJ8rsZFxS1rBg4VbORId3xpJZbBPZKFUCiAw7PGfpRwormuw6eKZtBG5Zk4VeCd9Ft5yYA6LieHRlkadPqAn37aNpDENuXosUKVBDgQXr0uwBLJ4APeJaO4wiPKvFPVTgKPwfaNM5Mj%2BPPt7DPO%2B57UpXXsM4k0rPNqQVRU9vZg%2BD6vmcsmF5MjtnfdfGIQpojCGPzvBPDDmbxzALsaUz7M%2FCRyFjxqrJTP3bjOMDR7DNXle4OL2n4rEvApnqiND7plcl80OmnYUMe0jiX6eaO4GAZahARgr8bfYjOzBDIDwgUIrzWTpmH16VDw%2FULQQhf6BgZPcLfxXfTzFRVFMx00UtfvMztcF1S%2F%2FaYaI4ttbeyHoZm0FpLOAYYuxRNFFokDxATYtDX3c5u%2BmT50wycmqzgY6pgFL8doCceuIvHE2YYV9tiDQXcJxQKDy3OlG03CHEVtKZpnzPV4%2Btel7WXNsYfyM3R%2FIlZcKNK%2BDlNVeKzolqYQVCLvxg5Usf32SPREUn%2Fm2dFeRliiIW9tRQ2ZPkwS4zEthIkWnZpIjWyQSzbzC8R%2FAMjLAEzakEDRWSxV%2FBwFJ%2BsJBckj5VAIAz5Ws8Qp13vHcox68uCwcPvOIghAEuxPQqujkgBb3&X-Amz-Signature=2738ebf3824da4476b2e0912bee808dcaacafa2fc5b39f5fb2c99c78af608a64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG52HGLK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCICFSk8EuqpBt%2FzeEsaVtNvdCQ%2BwlPOBmNXxqd8lZIheIAiApL9oTK%2Bj2QRDwmNWPZp3iWbErH96aQUcicZ9IjehmSir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMZfUytFpjhj2o1TXoKtwDhBYqkUGG%2FEsx1%2F6y4%2FgiRdAZ3nQGVK3cfVZpgVSwMnP5O3djz07p9ediVbIDBdGlraWwBnkd0CD2Kx7ittDr%2FjgV0mS1Hx1OCMDFcOudsfFGY6rkGmFjfvjx5H%2FZaIu74VX65HFwFB%2FAAnk0UTcAGF%2Frip5tgS48OrKUOcdYTzR6LNIdRBOdBYmtUuXWcX1LMm3j8LVAbLCbaEkKdZE8wM7xs30oqA7V8Ok57iueKJ8rsZFxS1rBg4VbORId3xpJZbBPZKFUCiAw7PGfpRwormuw6eKZtBG5Zk4VeCd9Ft5yYA6LieHRlkadPqAn37aNpDENuXosUKVBDgQXr0uwBLJ4APeJaO4wiPKvFPVTgKPwfaNM5Mj%2BPPt7DPO%2B57UpXXsM4k0rPNqQVRU9vZg%2BD6vmcsmF5MjtnfdfGIQpojCGPzvBPDDmbxzALsaUz7M%2FCRyFjxqrJTP3bjOMDR7DNXle4OL2n4rEvApnqiND7plcl80OmnYUMe0jiX6eaO4GAZahARgr8bfYjOzBDIDwgUIrzWTpmH16VDw%2FULQQhf6BgZPcLfxXfTzFRVFMx00UtfvMztcF1S%2F%2FaYaI4ttbeyHoZm0FpLOAYYuxRNFFokDxATYtDX3c5u%2BmT50wycmqzgY6pgFL8doCceuIvHE2YYV9tiDQXcJxQKDy3OlG03CHEVtKZpnzPV4%2Btel7WXNsYfyM3R%2FIlZcKNK%2BDlNVeKzolqYQVCLvxg5Usf32SPREUn%2Fm2dFeRliiIW9tRQ2ZPkwS4zEthIkWnZpIjWyQSzbzC8R%2FAMjLAEzakEDRWSxV%2FBwFJ%2BsJBckj5VAIAz5Ws8Qp13vHcox68uCwcPvOIghAEuxPQqujkgBb3&X-Amz-Signature=577e912e7cde461fa6cddc881197ab4c2a21d07857e32a3e7c65e7fc38bd8bb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQYGYAHL%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDfc9SncYRODmHFOXti8SEysj3o2wlPezRopx30RlQAogIgRRQyfEWpHNk3UQ96EDaS0kjTaU9fVGk8xyQizPe8HhUq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDCVr8hquQYHtpLygKSrcA7qLCTfQgdX3lCQtjEihEm5LoA9e661MmGo8zOsEq78%2BubjOnPUgDlFi0k1%2Bc5Z3Yv2En8SZzMPARXTVo4wExJGOTCapURQRN%2BV%2FFYS9n1FPEivYeN2FEHBaXHXZhAyWNG61JskbypgxCC1nwCLSkYAREUcI2bLisHbJYzxEHYzwQJYsURYT8PQYvvuuJC0FXWLXkYSkEBp6GAfRdRJBeqLFD%2F1OfDiyif27s2EcsbePkzKZ2tf36S4oNKLVD6nI8RhVP%2BevXPuYG9spAAYHiAbVq9gq8y09DnHrppJvEf7NHnY9paajhfOyc%2BUpimqOndlsz40KeYrY4tkYZ8c99gpE%2BOkmobjCHkynM5dJbBpk%2BM3nGBZKFaCyCfz5wnxIy4Xc283eCTBkLHx8pdHwCx521yicISw%2BuM5o94I7Q1WHFUZnnmZlicC099J11iVN4ZIeTQ9lHnLv2%2BtL2sIt9hltPQAG1bAV%2FFkV%2Bq%2FeXy%2F173P0s%2Fr8Y1u%2F9rfe8gRSc4B%2FturPZgCzp2x9q22V3RkIAgYJogCejVgs0IW8%2BdokIWOQdOm1pxoshqvSVSrbqxGHEaVFlD5eQQhO79yQQrzsHslmN5Fqe9NmFFqECCD6hYFVluH3Y8XR%2BnvzMPTJqs4GOqUBpG355NyOI772Q9Czc90FThrBAsR9GDklMDUzxpeFaj303m%2FBhwUbnGRw%2BAGdvhx9GbUAUgn9dAhbBIeyTggTa1%2BsSQ8WLArJBBZ5bGjlhSopZQDHfpAf5DCAunr7HHgUUX4t%2BrgIhnSlCivfR9yFoNWkIZ6kDvU03Rf4O61gx4W3zQAlvof%2BKIcarLxx4GgHRm6hEYNoUiVeyWU3RSGS0SLKRHBF&X-Amz-Signature=9a7aae1c3b24ef019426423ae88a36bcb94ca15ac4a55c7d90ea29ec72101cd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663727PB2I%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIAKpENFcoWw3poGyFnCrdXROiShYTBl57oxc5Y%2FFnxJFAiBuGHWhLQhlz4%2FNQsbWVGnmFh2zjxily9S7cXB4u1Ou8ir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMfmrla%2FmSFlOTPNPyKtwDuAD%2FSd0RhrmtgG46HM8%2BOzaB33FQXM8xKpM75LQ0doAwx4DdAOgP188NksTBU7GGP8ggxCrvEYZsJWe5kUZbd%2BGY5b%2B3%2FAMLQn23g2YqDWKNyMwpDyGwpBlNy59x5y2reebNDTdnRfH240VWe3CGLcIPpkluccT5ImcmteeS%2Bx2MfodOPKet7tyNxkk1Pc3ZpTah%2ByAsNiewTt0W28mWrm1rvP3DfAwVRr9VGKbpG9dX16BbcRcQ04OBdl0PQI4kZfIEMIMLj%2BQrVEX3MEStdg%2Br6BNh05x4BCE9Tvs4RwsF5SL1qwYeQ0TqP9AtmRgkElI2gmK10RaGWpnr6PHpdyM7s%2F78%2BsaDVgk2cZdpR3BMCWdedHeEFvyYPHnK0dpizObd%2B1jWlXiayUpPs5iFLy812OPvzjCR9Fx%2B6SlnGwcHs0scJQG1XECo9jTgwNzRyBxU4pjIZexCbFjPSbnt0hjyWEKSQtMtTpozASP%2BZ7BKXOpzFTCZvPIP8KFr4P5KCzG49pG8PK3SzXyc7KZ4YUtnCod47aBWbA1CrI746qSQAGJKTw%2FAxCvkcS9WjwS%2F9SXBI8qhh69rTPgPXOZoPrkNRNXytdD6%2F%2Fh0VqK%2BLxk7%2BbYpJ78GUA4GoaEw38uqzgY6pgHYP%2BnlmvVHab%2B9jEJyyn%2Bycw37AKK4cesGDT03ff4J9gvm%2FETpD%2FDHx%2FD0IVXDPAH6eaZxMUDg0OWMUJCi%2FJWqqnFeGPUTEHC6q0ISTNWGXXPa%2FNzl9Ut8KgxjBUhd9ublxPA4E89u6G8KetiTvsLJGMoOQpfXHpI4f%2BkyHA9z1MYeurWCvy1QjIq57FheWnmAw0jKKIa6AUcFUmZvpzIBmEnWZwiM&X-Amz-Signature=2c59048bfe2e9d33e99ca23db3dad1e3da86d636f5e7548abc15ef6288b50ef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRTCE3XN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQC7WOF7pEzjbtRdBMwkB2ksdQQjuy%2FXJtccoaFNB3OpFwIgU8Uq4WbikcUKNkjRRpuj1Ut0pbsUZsNV5KkNWRwPKesq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDAIsPifFrDYitGlfnCrcAwqfqcur7%2B86AKdzJyZxmHW2vjIp9xPvEbYB5VxFKzBudHWk%2BAPHZijBqLtb5oZTDeE1l%2FaatDspK775ltWPeX0zKnAdA9fGQdYDArgenqKoLyujpk%2ByT2tHgaaX9xO2eircq33mK%2FN2JLOKwsvLr%2Fo4bh%2FYPyPkwHgUe5QULFxljzvmBs3%2BEiySDfdM7hOPnYXiwX%2FakaoJ%2BwFCBbxCPI2m%2FBhdAJ8jpdjtBa6VTJKgYeimwk2%2FH0pWa2fsKO8%2FZ00kDEFzMoxBkZkAcQ8%2BwrMnSPok6pNpP%2F02a%2B1JTaOv2DygxYXiA6pTM4IaXb7YmSJupaXljcB94%2B0AMJ8CJ7epedBqoOy5Vzimm3%2BooLxU0%2FiObBGnoeqf8mg%2BWW7lh9tGbfVVQNdJ%2FZYd46hSOsg08%2Bwdq1e5dtdFX9i0bLs45eJULLNt8O7EJ%2B3m0qB5cQQrF0FgwSQnzpfiFD8nkkrUZ032RKJ5Ay1UBc6amveyhC4c0HmOgKR6Qxle13lERK4T2a4MDaFBfo%2FkqvkyxsNADRSfJpskxQMXc80PZyWNKSc2lESX%2FZ4AKavBop4LHEM6bDwIZWaaFzUNEK6TyYUJjdfBoIz5TpsBixQPyq4QI9RRHstMgHlhOd2WMITKqs4GOqUBv7YGFULLTveTH4qyeynWV2XtIseBM%2FurQXSp%2FZwnLsEthslWqeByFTxuVowmfwOsJoR6Dqe%2BdzDmx253hB6ew5o510cqYCnIR%2F2sS3XhfjGtqhZ0o%2Fx1grFB5DQEN2ATEOHx3PtmLctwew1tmWmAnWK4e7Z8F3UtCmJs0ZC0Jr%2FJ8ScDP5VPZJ9dfqX8rsq4347yCNOUFJ7BWevwcTocab0JWoFC&X-Amz-Signature=e418f2788a39845009d1c83424bd88913ff7095c9b471ebf576d0a64a9ec1842&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R67HEMHR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCuWEHYVv1n3lqHyX%2Bno4JoaHDYgH9aynE4v6UGuMIKuQIgRUgers96ny09qSdDQEM%2Bx%2FFvgaE7R0Zh0ib8Kuyf29Eq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDEnxkQm3u8d9eutkZircA50utDh9108ZPgidOGRElMUpD58VviRVePInNiInbwlLmDq6ExRazgSzUaixcmuu9uv3FtL8qjdBWSl9ytFUT%2F6u2kNVq8pcC%2FdEZgGRC8nV76hPwJULzwuqvxEGSiEWHlUu1%2BAFbFZ4gKQDIC0i8OaEZ6SUb8EkmynqARXfa1YB1eolutDpar%2FD226i3WibpZk7fbgmCTk%2BvxqdV4dSXa7A3BNhF7tAnISro6tXWVxEJfWhEJUnpoQhsn%2BXMNzQO2qb9HBBiV4gAxhllClSK8MKN6Jc%2FAYnVda%2BmgFFhbfF2BSUCXcuOJwlVcXwpdQrkG4xb6u39x3G4RkJzEvej2wiIFXw4CrAGjPdJYCeiH%2B1YTIr4XB8JVoW%2FnQEqRjK%2FyVRA%2Bkaw8CPmlQPsh3MfNgG2jwchzAwuqT5Pn2I26G38EvGeeVXac3A%2FYAdkUtMak%2FOZUHoJzNMEWUm6vVlN7nPpFDPw%2BiwnsSBu0kUKqpSeLPyslklO0x97wkeKLN%2Fav1IL9TSpKuJ51KtPaK0rHMpafNdf8R3IXTGaqqU2K%2FJT%2BwvI0t9F9A0a%2BY3H5t1j52i1igJL0rWT6tc3iR%2FTQFA4HLzix2%2FPt9JTGPBloPR6mTq0%2FeC282S3RuxMM%2FLqs4GOqUBpCq7biNth6XsmYkeoMbl6EFwao%2BSYuX1sue8IIBXE0HeA4x5mZo7ccHOUFMGdMHfwss8xfvknRYxbdtPJd4YpC4N2BNRKIDhwWPmzKVj32aF6LIBg%2BYnMPtXyiqhXDAROwFFiwnw4jPN4vDogQRO6VqBzt1bygBGDKOqmLaf7kLXVWsJ3RU2%2FiIgXiT2B24eUMLiGjyDT3UCMLupwzNKip7L90rj&X-Amz-Signature=fd25cce6c3c8c6be87ec09107b7b9ce8560547cfd49d3240e4d667ee28887836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R67HEMHR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCuWEHYVv1n3lqHyX%2Bno4JoaHDYgH9aynE4v6UGuMIKuQIgRUgers96ny09qSdDQEM%2Bx%2FFvgaE7R0Zh0ib8Kuyf29Eq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDEnxkQm3u8d9eutkZircA50utDh9108ZPgidOGRElMUpD58VviRVePInNiInbwlLmDq6ExRazgSzUaixcmuu9uv3FtL8qjdBWSl9ytFUT%2F6u2kNVq8pcC%2FdEZgGRC8nV76hPwJULzwuqvxEGSiEWHlUu1%2BAFbFZ4gKQDIC0i8OaEZ6SUb8EkmynqARXfa1YB1eolutDpar%2FD226i3WibpZk7fbgmCTk%2BvxqdV4dSXa7A3BNhF7tAnISro6tXWVxEJfWhEJUnpoQhsn%2BXMNzQO2qb9HBBiV4gAxhllClSK8MKN6Jc%2FAYnVda%2BmgFFhbfF2BSUCXcuOJwlVcXwpdQrkG4xb6u39x3G4RkJzEvej2wiIFXw4CrAGjPdJYCeiH%2B1YTIr4XB8JVoW%2FnQEqRjK%2FyVRA%2Bkaw8CPmlQPsh3MfNgG2jwchzAwuqT5Pn2I26G38EvGeeVXac3A%2FYAdkUtMak%2FOZUHoJzNMEWUm6vVlN7nPpFDPw%2BiwnsSBu0kUKqpSeLPyslklO0x97wkeKLN%2Fav1IL9TSpKuJ51KtPaK0rHMpafNdf8R3IXTGaqqU2K%2FJT%2BwvI0t9F9A0a%2BY3H5t1j52i1igJL0rWT6tc3iR%2FTQFA4HLzix2%2FPt9JTGPBloPR6mTq0%2FeC282S3RuxMM%2FLqs4GOqUBpCq7biNth6XsmYkeoMbl6EFwao%2BSYuX1sue8IIBXE0HeA4x5mZo7ccHOUFMGdMHfwss8xfvknRYxbdtPJd4YpC4N2BNRKIDhwWPmzKVj32aF6LIBg%2BYnMPtXyiqhXDAROwFFiwnw4jPN4vDogQRO6VqBzt1bygBGDKOqmLaf7kLXVWsJ3RU2%2FiIgXiT2B24eUMLiGjyDT3UCMLupwzNKip7L90rj&X-Amz-Signature=14b3461b547dee2443171867be3a230def4442410edfa3ad7e70640502863e34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUXPL67V%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIGtG93I2bdFZfCdE4caUe2tu6Wyapg6mEmPj6Hd67wwpAiEAm1rSvNPQES9pl6PIXZaCamKGIz1W9YfmR8vd3kQNSPYq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDJuyQayReR8xhRblPircA7tiLreXTjdsJ0Ex0cW9O1JQyKsmlEwNmZrVrtgv3Ef99Z1elHHTfEVby1OYCKK1X%2Fjqijqg0GLCU4NWtAPe2JBIohqbKwPNHc19b%2BU0WxSDkoF%2FBjDJiPw%2BwgExrb0%2FwWfqn31%2FuWe990BGjY6%2BoWCcbdMlggk7h9cpocLumn1gpscNoHOgv0EnS9jewIHM1bxfdpsEiduIhVoay2zsRxRC4tO23aksjWndPAmu2lylc%2BiH%2B132639fDN%2BgngxvbzIXn5KxVdJ2PJXQoSPIaH%2FEEMm5q5QOalVp1Qrxo949Jn4jacxkwJqhi8ih%2F8CP004JCoQQhSd2PGANdaVlhtKVw7ifGCr78mpCdFEm5rqH9peuw4q521s7qVy5BPeVvkDFpLf7NigDpcTo%2FezbJrifPUNfBT3y3Vq6lfDHytxss%2BeWp%2BCLysjgtB9kJAaws%2FL8QxdiRnLqpSrUng4bpzXI45nJ4uB6C9yILKvg9UrsyNtP43QZV4%2FGqi1rHcVvP3pYVHfHsidHxpM0R3IZxuo%2Bs1NRs9Ir%2Fv5DqOi5xzpYfq%2F3P46TpFk%2FP0xx02aQNmkphSCarW4Ec6ljmLg5COJZljbOV2EME0YAkf0voSePB3mUKDZjBomUjh4UMNjLqs4GOqUB0PrN8eFGXFWhVuc6qtN6xAYkQ5hVouLpHDDOl47xCAJ%2BiUb222%2F39tPjdFC4N3SuVczIh1Bpucak4XlzE%2BSQvr3nwTshMwP0TS396YWNiQhrBjxBv%2FW3iTB07bUvbVxCQmpcZp51yLCSDzv6%2B5ozy%2Fq8ZE6NS3G%2F1JRWaw%2Bwq%2FEORprT0to0XTQhWicGN8aD9cylIGC5qr%2FdEy9Z5BRZJSYUmb9U&X-Amz-Signature=23c64cab95671ce0acd3edb9171c820a4182283155193d5781be07fb9c96c1fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5AS76GK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDavlC%2FiC4nXIMUbyHxeNz8ZVzjaP%2B3qCl%2F32CHUdBEswIgdlOYF41h3Xyz0RX6lcjEMvNIPm85614Wt3%2Fe5czpgHIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDHipM2I42%2B3aZtvsWCrcAwNcvkYvrDaMSga%2BmsJrSujaN3NbPPNfOpFV9yS1OgzFZXsIpTo2HH0n9Y%2FQaWnXjWhhK%2FMvrxdwGOgFS4LJi4jr65WZ7lnjGbZUdW3gFfagXZaq6ne4anCpqFIes323KNCut4B5rJQ%2FpcC8I0vdbIUaIzYvAvndor9zL1tf0fa9F9ug8FzZRyPJ0Om6zrBloqRuYmFHiAIfmsEi1ZMOx5aVg7ZaaWe%2BgKqotWKAaFiJIIC6G8TBBtrYNRxg%2FrzObubIEuh2trrvPoLO%2BpXKgCEcnzD23VXQ7X0HesVPwpiT%2FcHRHSs0sRJ%2BmsIQNFs4LTZ%2BptSCGajjgjWoUy9wo1WE%2BUwDknkNiucPZ6OSKhPcQYl3bO9R%2FJPrm%2F5q2TDayyBUb56zNM0xyWdFgIuU9jHH4tDh14EPq52dR%2FUW9vs8pNAUOJ%2FuZ9tT%2Bshq2YR9OrUEGISs5BzipXmRas20T6UDDYrPmW%2F70WZUr5B0YtiLo0bB%2FU4LxMSls%2BwlB%2BidVlN0CKKAugtzdp7B9nhYOs%2FGCTPyLkq1wAYJxaRD6N5yT9BP0jyPz7K%2FUU9NkfyOesyOatzih%2Bmvk5YRr6sP%2BgbOAkbSMFreYmUyk%2F0quCcL7IKvuAk%2BIsSF3icoMM%2FLqs4GOqUB2i3zkyd32MGLPzeoc%2BwGqljH%2FRgMQ4stxE6VOwG87DD33tLeRV%2FeXpRMoQHZOtm2KfoE%2BNunCJMbngWBWCRV%2BJmWSpRit%2F0nCX5GjBt%2FNxWWDgvnZV55Qw9UAa1clYAZtH2yD%2Fe%2B4Fa5oLkwXVHUAVWZMqNlX5h01XvI8YSFxbt5Ei2DEC0QX7pkzurv0MYO9qoLbwnmwd0ADWWgQozG5dGFlhsL&X-Amz-Signature=c0f1f3dcac1cf1dbddf71bd5c92d72b7ee957f02330feaa3b51f6a98b01833fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5AS76GK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDavlC%2FiC4nXIMUbyHxeNz8ZVzjaP%2B3qCl%2F32CHUdBEswIgdlOYF41h3Xyz0RX6lcjEMvNIPm85614Wt3%2Fe5czpgHIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDHipM2I42%2B3aZtvsWCrcAwNcvkYvrDaMSga%2BmsJrSujaN3NbPPNfOpFV9yS1OgzFZXsIpTo2HH0n9Y%2FQaWnXjWhhK%2FMvrxdwGOgFS4LJi4jr65WZ7lnjGbZUdW3gFfagXZaq6ne4anCpqFIes323KNCut4B5rJQ%2FpcC8I0vdbIUaIzYvAvndor9zL1tf0fa9F9ug8FzZRyPJ0Om6zrBloqRuYmFHiAIfmsEi1ZMOx5aVg7ZaaWe%2BgKqotWKAaFiJIIC6G8TBBtrYNRxg%2FrzObubIEuh2trrvPoLO%2BpXKgCEcnzD23VXQ7X0HesVPwpiT%2FcHRHSs0sRJ%2BmsIQNFs4LTZ%2BptSCGajjgjWoUy9wo1WE%2BUwDknkNiucPZ6OSKhPcQYl3bO9R%2FJPrm%2F5q2TDayyBUb56zNM0xyWdFgIuU9jHH4tDh14EPq52dR%2FUW9vs8pNAUOJ%2FuZ9tT%2Bshq2YR9OrUEGISs5BzipXmRas20T6UDDYrPmW%2F70WZUr5B0YtiLo0bB%2FU4LxMSls%2BwlB%2BidVlN0CKKAugtzdp7B9nhYOs%2FGCTPyLkq1wAYJxaRD6N5yT9BP0jyPz7K%2FUU9NkfyOesyOatzih%2Bmvk5YRr6sP%2BgbOAkbSMFreYmUyk%2F0quCcL7IKvuAk%2BIsSF3icoMM%2FLqs4GOqUB2i3zkyd32MGLPzeoc%2BwGqljH%2FRgMQ4stxE6VOwG87DD33tLeRV%2FeXpRMoQHZOtm2KfoE%2BNunCJMbngWBWCRV%2BJmWSpRit%2F0nCX5GjBt%2FNxWWDgvnZV55Qw9UAa1clYAZtH2yD%2Fe%2B4Fa5oLkwXVHUAVWZMqNlX5h01XvI8YSFxbt5Ei2DEC0QX7pkzurv0MYO9qoLbwnmwd0ADWWgQozG5dGFlhsL&X-Amz-Signature=c0f1f3dcac1cf1dbddf71bd5c92d72b7ee957f02330feaa3b51f6a98b01833fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP5I3TXN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T174114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIDD4BKa2QIED%2BN3IU82lyBiRF1wPtiuB2QcMwqwpz3ofAiEAgGiexlAvdodLc6QeouQMVcExtH61ofacJdbafNj2mBwq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDHKiL8TJGIN6ObxP5CrcA93CFaT3wV5bUccWxVM4%2Bd9rWi5XEpinRxBpsyyl%2FtoNLMMCGsOPQ2z1QIBpclxHvqqlTD1BqhC6hZ3U0TA9UkCd5G2IKeYCLZPuOrlGRifgPGBgnIzUXZKnGlAHHBaqTN30Y8yIHBFzM1DCQAw7b5yKftE%2Fjunn%2BTaI4U%2Fti5HahTKFWklkrFbzpobBGGFO3BWNBozZMHxAozLb53PNNGfffELGIEMvybjDdmsFRoMfmbM1zc8gcXMmsvAO1XvKHvibjawTIuhYscSrh6IR7oJJXO5bdeOXnGB4DjsQ1rm0CNLYOuzmEpoukv%2FybaBEF3pfTjVC%2B2IvGZlxPysjNc4dn%2FVLhOo0GxZ0pmq5RzD0XJE%2Bolcqajm4BR5ggUpSUcIDbW9Z9ZslwGUMRbr0UkSoyqqD6TR%2FgPeQqTxa1R4qxjLJM%2B6%2B1GVTMMvh1h0w98a81VLYpJAHMYmZajPomEqRDg25WGfWYWSAOHpBbwbIRsJi4mZLKxcmbSEOuMXqVXE4hAQOC4ohryhk65G%2FS8aH26LJQNe2%2BSUNZIu8LecaZirbq6VtRLM0Dfzksc8kaDTzEQeh54YlVtGvqljzcmfy6lIZmQ12RwRqrDbVEX%2F0b2mns4NHC5GrbQ5TMLDJqs4GOqUBBmN9cUdIU7Xc59nhcjj1qIWKSxdjtvglfvpUI%2BE%2BI0Xo%2BHnf9%2BiuAO8brVjX7xfqZ%2FWhyqi92u8LmEA1wXN8AwzoMqZUJXjNgL6scqzVTO9adaQWjOPaW34rja%2Bsn1hLga3js87hHu31g5g4Z2ILpjBzI5Q14Mc7RxMBYUm0BSTySrn7st7QEucDckAHFzk4a3OywAp8usRjGaaoK1sCi%2ByFDqrs&X-Amz-Signature=d7b7a563d609824c5603ba3c00dccc9fa10d579172d1e57c29f3533da2f0966a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

