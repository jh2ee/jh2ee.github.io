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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466433U42XG%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQC82pgzviq3C%2BzFUMcDi4Ck1cyFU0yeNvgsoNkkRFP8gQIgEq9cUQDC%2Fp0%2FW1pLN0wzN69RmlfcIo6GN%2FRTDB2CVzIqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN%2FMdE8Y9QhL19QbUSrcA9sDqxH4lkWdjmnGNq9yrbCJ%2FFmPS7GpyX72u6nXxuaHsOx9IDY9YEvlaHlysIz4fJ9Dr4WnzGD%2Fenib2NWr8ybpphwW%2BIy6e%2FSJhTPWYcLiPxzsrmlHptikEmsWl7wd3Md1KWn1m6Xd%2BSg7uhXSF59AYa39zjTSMiiPBS3FoF8X4HVMA6QoC4jcizr5EcEyvyHHR2Qfu0Q%2FkvHXA73CE9AQhNBXfC%2Fp%2BnGMhKtr0cKfzXsmP6X1GxFtqcb0BNcc3ZpNSSdSXJloTbIz3W2NMf4Zm3ksTbKTK7njQIPpteJbYoNLaqcLW8rNl4pFzoesSFx7Jqmt8qShtbiQKsrTkNy%2FT4WmDedJ8is4s0sTY%2BXz%2FVC07arOuqlloEdBiDAWKN%2FGR5K4nc1P18deg%2BEaTBXqC2eRDmFNChd7fPICsdr78RW9vQE5duvHg1BymAcEucFk1qtAu6gkZrBQ3iHluyPxVBp7z2Zug3CELNyu7k4YQehSyVf%2BrBH2QymyTswZEO5VZhlIsM%2BsaQkmsTNM9SMLC067VpUz6BtQfTrOoQyeVnT534KILSPO8N9vEBqRLKs74t22gXfojZGZIbEiYnblxOIQ%2BxTto6ZZKscRDW21cSELNkSGedJ%2FXIcVMKLTyc8GOqUBL1E0N7j1quFEm%2BOHperDNz709XN2FZVF%2FeFZyFXtDERS%2BRwvinRarnmS4%2BtKasEUhR5FrbNr7YmPV8n8DlPXJCkV%2FZvScT8wP5ImCSCngGIuhLCVC8HxKLb2w8RSXFsw5ir7iHD28%2FHbXLBqAm2Nofp5ZeBpRJjnhoF2Mu4f0cA2sH3085J44JQT5fuiYTwm3fjqP%2BcKz%2FCb8rmJEGi6CzBpC6Bp&X-Amz-Signature=02ec46ac17b5253d8695fdc4d30295bcaa571ba7c402927fa32730b817cc8a22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466433U42XG%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQC82pgzviq3C%2BzFUMcDi4Ck1cyFU0yeNvgsoNkkRFP8gQIgEq9cUQDC%2Fp0%2FW1pLN0wzN69RmlfcIo6GN%2FRTDB2CVzIqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN%2FMdE8Y9QhL19QbUSrcA9sDqxH4lkWdjmnGNq9yrbCJ%2FFmPS7GpyX72u6nXxuaHsOx9IDY9YEvlaHlysIz4fJ9Dr4WnzGD%2Fenib2NWr8ybpphwW%2BIy6e%2FSJhTPWYcLiPxzsrmlHptikEmsWl7wd3Md1KWn1m6Xd%2BSg7uhXSF59AYa39zjTSMiiPBS3FoF8X4HVMA6QoC4jcizr5EcEyvyHHR2Qfu0Q%2FkvHXA73CE9AQhNBXfC%2Fp%2BnGMhKtr0cKfzXsmP6X1GxFtqcb0BNcc3ZpNSSdSXJloTbIz3W2NMf4Zm3ksTbKTK7njQIPpteJbYoNLaqcLW8rNl4pFzoesSFx7Jqmt8qShtbiQKsrTkNy%2FT4WmDedJ8is4s0sTY%2BXz%2FVC07arOuqlloEdBiDAWKN%2FGR5K4nc1P18deg%2BEaTBXqC2eRDmFNChd7fPICsdr78RW9vQE5duvHg1BymAcEucFk1qtAu6gkZrBQ3iHluyPxVBp7z2Zug3CELNyu7k4YQehSyVf%2BrBH2QymyTswZEO5VZhlIsM%2BsaQkmsTNM9SMLC067VpUz6BtQfTrOoQyeVnT534KILSPO8N9vEBqRLKs74t22gXfojZGZIbEiYnblxOIQ%2BxTto6ZZKscRDW21cSELNkSGedJ%2FXIcVMKLTyc8GOqUBL1E0N7j1quFEm%2BOHperDNz709XN2FZVF%2FeFZyFXtDERS%2BRwvinRarnmS4%2BtKasEUhR5FrbNr7YmPV8n8DlPXJCkV%2FZvScT8wP5ImCSCngGIuhLCVC8HxKLb2w8RSXFsw5ir7iHD28%2FHbXLBqAm2Nofp5ZeBpRJjnhoF2Mu4f0cA2sH3085J44JQT5fuiYTwm3fjqP%2BcKz%2FCb8rmJEGi6CzBpC6Bp&X-Amz-Signature=02ec46ac17b5253d8695fdc4d30295bcaa571ba7c402927fa32730b817cc8a22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WLP7SUI%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDpiclfxnZYDV2Hkxeu0%2F%2BdKoMhCrs9hJcJv0ay0Ww8OgIhANIRCgt0d4Lia%2BKqckPD2Cio0LCwZ3QUduipdT%2Fywg6pKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwPtPo4Uo%2BNoHWXZsq3AMHYcxsna4Foq43UYysCqaFdu5SaiKv8tKQcOtJMfh2neUOEFdExUFRsoc3wM76mCj5ReOkkwCFphPOFQMrjuFGQ45EUTr%2FxYj85CTuYHjt7bgbV6giODEu7X4YigDBvFM81cY2AssFh%2BVuoGFsJVUuwCNy%2F1Sovwo6x9WCDZI3YYJwk6i1spYHdGGQ8d%2FFcWSWiSqYec7fm1IYApC8%2BQRo6mdiiESQMCSIGNFezWaMKueYRGn3pnY8n5fhvPVnK1K7qYAIv3aMpLo2swkazcJS%2FTsRKFghccBm5ByAMYm6GAy6ZBd3iGO7v0uV74uHzg2kyylzXM7fsUeGHua5UQMStzJJXDOYBc%2BtJud3GQujxti1LGI0YF4bYN397fpBprmbNqapg8c7kkT0ngSOR3JzPqQbirG2XoFgarrJVlY1Wjm2AA%2BuhoF7Fau2IKJkN1dTKtkLeDHvcsVqZQpX4vvkl0LPKgP1lYbC%2Bpj5N12YBJIfPMro2pgIdyvV3Trunov9Ztmq%2FuhEP%2FjTIkV65WXB4LqunjqErEBPmxUQ%2Bkxy2gAb35mdVqbiqJZ%2BQxXMjksH1TX0uuWXhJ7nQ6p5uCKTQAuknBGaFfsrLf9eRE9DSuQ2Ok8FFjRzfIW0tzCT1snPBjqkAdCQ3hiMQpA9YlIJh%2Fs2ymIKcSZeloEYPE5gWQkYmtKwQAnO9jQtTUw2as4hBjlWp6w%2F8JfsrP9H2mx6Yc7M0MNd%2FRLbxV0SwTa38sanG1N7AHGbHfR9kqxAF4v%2BfwW0vlvYCgoWH6mytMdosFI6T5a4Py4j7F7HkUmLkjMO7vD4qEDDgKSuTYDB5L%2BRiv9GJ5ld2JrKRdgOTU%2FZHRsx1%2BwpvIR4&X-Amz-Signature=683c94210ef8082ee368dfa7555320488b8335e6325c1b5b1d30ae74eb5cb5a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6Y2EUD4%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIBtFr3RfRrk2LW%2FiADj8SCp%2B6Mi7LK%2BExk5EzDp26a1uAiEA9V8S51K3cpoUsBUibZqYItW49kEJ7jWB3Q6bpUtZzRcqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGwtqBIVigkwjy7QrSrcA2U3BCKcr1PgDgOWGCLXXakIrkZ7AyZGv4kdaeQCVU1skdnMEPMduMzZ%2BMPPFlQET8pZlF4RfWucKaTHIVGPV5EcxbIoUGp7ZSOGvMoiyrYnoclVqwK4k9hqnRlijYrAy1ze2%2FUslOxAigk9SNOPYby97LDUiGjsKbmJDZjxwf1WFLo%2BBG3qwAY8y3v4sURBBsUTLuj6Ye6qkdzuP1BwAKV1S4YAzDZ7045PQpIkK2cTNM7RqkIpymcqFFXxGiBN8UHC%2BfVfrQz4GCdxfIQuinr%2BAkbq9k02hXnXaROpQrEOsJc78PR3v7A3L3XHruT5b0ycq0%2FVPJc2zO0Tdtd5Q2X7xDuxC3KBAC%2BEw9fLxrmrXt5X4oZpye6JDVrm88QmdoNtP%2Bj%2Fgq8SfTgOZ3hY7tEkN4ElRDd9S%2F3PoqB3FPNIhqMAiM1VhYUtQwceTZ2EwaiGNknRsh9sf%2BxGGwKpKZLeoeq9qurfp3IN11Zdx7pXWcO%2BNceWdugolZJdC%2F6O%2FkAiIjOfkhZvKFmMupmoqIMXPUflZa0r3OAdWxWXnX%2Fag1hTlgfIe0f1%2BgA6x7BkPEgSqsK5kKjm0YpeeRbZdBfE%2BCv%2F50BYhh01fQI9iprBMGXAwGwp3OLQMYa5MOXVyc8GOqUBi8XmTeOLpmOSghelXslyOVzBDPa7dA8aig9%2BFuKslgynTaYBOLj41e4ge1GIJszFuQ%2BYiwIoUkVWkXCuvvlD%2BRcfaJF%2BFuYQ6g4gD52%2BbYsXcj8De5df4B2%2FVSmhGuqGAb9KmV%2FNHGRoPUef26DcNwkdKj72pz2F4R0ockAIynpZJxxcD9Kend0TIskx%2FuS%2FT1u7Wr56G7Gp0ol3HF4WGWSvUBz4&X-Amz-Signature=20a601c05a89fcd0b0fb46ee905a679ef3c5d503ea77405db9decdb61710ff2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6Y2EUD4%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIBtFr3RfRrk2LW%2FiADj8SCp%2B6Mi7LK%2BExk5EzDp26a1uAiEA9V8S51K3cpoUsBUibZqYItW49kEJ7jWB3Q6bpUtZzRcqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGwtqBIVigkwjy7QrSrcA2U3BCKcr1PgDgOWGCLXXakIrkZ7AyZGv4kdaeQCVU1skdnMEPMduMzZ%2BMPPFlQET8pZlF4RfWucKaTHIVGPV5EcxbIoUGp7ZSOGvMoiyrYnoclVqwK4k9hqnRlijYrAy1ze2%2FUslOxAigk9SNOPYby97LDUiGjsKbmJDZjxwf1WFLo%2BBG3qwAY8y3v4sURBBsUTLuj6Ye6qkdzuP1BwAKV1S4YAzDZ7045PQpIkK2cTNM7RqkIpymcqFFXxGiBN8UHC%2BfVfrQz4GCdxfIQuinr%2BAkbq9k02hXnXaROpQrEOsJc78PR3v7A3L3XHruT5b0ycq0%2FVPJc2zO0Tdtd5Q2X7xDuxC3KBAC%2BEw9fLxrmrXt5X4oZpye6JDVrm88QmdoNtP%2Bj%2Fgq8SfTgOZ3hY7tEkN4ElRDd9S%2F3PoqB3FPNIhqMAiM1VhYUtQwceTZ2EwaiGNknRsh9sf%2BxGGwKpKZLeoeq9qurfp3IN11Zdx7pXWcO%2BNceWdugolZJdC%2F6O%2FkAiIjOfkhZvKFmMupmoqIMXPUflZa0r3OAdWxWXnX%2Fag1hTlgfIe0f1%2BgA6x7BkPEgSqsK5kKjm0YpeeRbZdBfE%2BCv%2F50BYhh01fQI9iprBMGXAwGwp3OLQMYa5MOXVyc8GOqUBi8XmTeOLpmOSghelXslyOVzBDPa7dA8aig9%2BFuKslgynTaYBOLj41e4ge1GIJszFuQ%2BYiwIoUkVWkXCuvvlD%2BRcfaJF%2BFuYQ6g4gD52%2BbYsXcj8De5df4B2%2FVSmhGuqGAb9KmV%2FNHGRoPUef26DcNwkdKj72pz2F4R0ockAIynpZJxxcD9Kend0TIskx%2FuS%2FT1u7Wr56G7Gp0ol3HF4WGWSvUBz4&X-Amz-Signature=1acf60d16d2f98ee6af685586da8f6ac23ef46cb0b6de1e58cc93f66bdbeb597&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIXN65QJ%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCICMSsiP1s1tXgrA9zJ90MHMILx7WFa6QFQdC1q0R1lQyAiEAzBen4xPIzr%2BUkw3o7KThKx29RtwqUV4mehcoIKQFHTAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKrEPxpPTN8mjzQbkCrcA2jO7nOF%2Fn%2BZjIn748JOT1wPpYRNsUCcsuGkswHvz1oYVKf7dc%2B%2F%2FTU0IgGzawDLRKXxJseTjFpRdlm%2BO1nGj7DmwhdGluINq8XONgVrVdQonb1OM2oT1ZzynM%2B%2FOMht3USXNHEfHwAKYwZwQcnf0SCoa8Qa6%2FukOcFOuY1E5SLp2RhNPzi%2BprjBoO2koj9%2FBTX52oMymtzgUFk94Eq9L06VaC3kklF%2BU8FVbT2R7Tf8r8GCDjemGLwFZ70N6aPXtiy43LU8HRoIL11PQ99d6oWwrrPLxg%2B0haxL3jQtUiBp%2FiHKEFrdwZJnxvYCHvus3WGl7qMAm%2Bhl0HGzjytZVWei7wfiqrWm62wMFpcWOE9wfyk4cH3sWoapr5wGaX45IMBVVL%2BrRwp9fd1FlICOFjoCUvY5fF33AU3t2w8QlVjdAnDVBRJVohVQeV6dlFxAnjeACrUSO%2FaZmQevDZoAe84MLxQz%2F3jukunJGtb9BNH9bB8fgPOuJdX%2B46jggpgGM%2FcLnGayZrrwTLj8aJQNy%2BI0rMq9UFsPZioplfOAQPfnvNKC4kuO7Q%2FJMqed0Fso8tXZUTtoceiidQ8Vy30QW7aq557EgJiHaY8TWaNELHd2miGK29W9UfqQzUNgMInUyc8GOqUB8zvGW6OnMM5u90x%2FJd%2B5Qf5d%2FUhYs1l5woNkiDrlv4T%2BydhBCAHI0kAGcLPWW3sIRsOCcKHSdgjjNgrwGeR6kiOBlefN%2BsJxRFVwzWxyYV4Ei4nwM9Ye2VGndGIPy0CNxf%2FRf%2B24lkRT7pHwLKgMxnJS2exdwRxp3rkxdjGSs3l3oMleoPvLYZdHbjV3xsV275kLo7xgul%2FXoxpltQXhuiRFAdHm&X-Amz-Signature=0bbcfcdb900935976a5f7390a52e2398d43661186a8b7e3536fb04ef567e0aba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DYBVGB6%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIE4KW619V4qcdWOlNv9AyY6F40mOklHtaGwnxl%2FGgqBZAiEA8Db2f5A3SVEpy%2B81K2S5OeDXSNrt86JoN%2FshKETVhcQqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEcE7kZ%2BootS0jdU%2BCrcA1pzPAgTveJeVaz49bCBgCiZLI%2FPRboaHo7v6gHoWvtXB%2B1LhnP7IPDPjfahDYxCmnzcEQP2IYh%2FMT1htnsoZZJpkrbdUGhIf6AW3tKI9CLJ3E5d8tqOWxbmEkNcTH0EIknkfjnu3c5zNeycpKjW%2BjGu3kZeKnHofAlPYl9T7P5OTazeKgxBMW4KihMyT0%2BbF%2Fn%2Bufn0B46ZMrhBUOjlVpdIja4cdKRnanLSlCksnqlBlXhMgBsuDBdg1vkqxuHuo%2FtN%2FNw9CAc7rT6yJ01EYdweJr7dFa%2BMWqDj3GQX6b7krRGdLeRVh2WozDmi8B0iJze%2B%2BjInhVS1amMtglkXk0puogR1Y0NhBL8gnoJyP2EnRF24S9olc2zDr%2BV9eNEGuQ%2BzrAQZnDWOAIZJqLXsc1onIItMlx3b8pr%2FqY5LNdEjtg%2BE1ZDa8rRC1sEJ%2FFQ3%2FAsUIs4ElqSCrUCO5s38DoWqW%2FT%2FvOWs5SUrgyhIwOK6J2QjCsSML46ePNLF2Ur6Kvk%2FoxxULs%2BGCojzcvK%2BOQg%2BPcHjlfucFH0uERQgITYkXMv8iNBib7cEU1tmdwA5Fn%2Bp%2BfMCMhqN%2B1BSdzLBmDeito4l8DLR0T60eZ4xzUNTMIC96rx%2Fxfhz%2FWJVMOPVyc8GOqUB8C9zm431gE70PKwWhKKvVIs5v5XpNbo3oRhmgXoKEVXAMM2wWy3ze6XhLvAc0fxsQHiRgW0zBNT4Wc12%2BAFL0mt51y8GO8IKzQ%2BuO7VCwz2obes51b8NyrwPof8w2Yynk0zgXxxIDbUHa2%2BdKJu3djekfjFdbEbT7c1CDl7OSFx46ykNCxVIUUvP4LYvqDCGTdG15wYGBK7UCFbJCDj%2BggjqpUcE&X-Amz-Signature=d84a4165e149440669d77659ef2485f22b022e665d8e77b4ec1f0728cfbd379e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLVK4J27%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIAP4KU6yBUX6yrvo4mJJcAHdCwRT6swIZXg4BNVa4LhrAiEAs02zQIGOBZhRe5Y0jsnBuvyxYMHJ0xRmqk48OmPSvMAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKDhh7v%2B3VVUPWQpiircA0t%2BE4tEGsWl2m9y2rMH03nmAxs5y547biuO%2FesrQcg6MK8vZcUbTr5zZtA09Up7dZJBaMNw1ph73SYaWRqpFNxiyWbbOTTgblrJgu59T%2FuJcD%2B8ZUVccV9O0bf1AydciDEndGnl8%2FKWjJOqQhsTYokZSjzHaRiDaYXuasU9a2ZFDWJfVyViSanIUHZcwmpLNyLHHo07QSuCobXZakJYElsyKP77RdObhd9lmHncsRk9Vk4C5b6PvikFCu7ygfLOBL4Nd94xSLnJnGVtfANjUvNXp0WTa17U3eSkwP2z9g3LX2wN9MefcIAmE%2Bdj%2F15gTdQFTsiTrR58jzdQalStimbAkQxp0wOx1GN%2BrLI%2BI5fFuKyCKGdVssoMxrvRnQp5gTkK6ndP4oA0d1tUoXu78TtnxRW4rDluIzVdPqrRQZfzDL3Qtog%2BxfUsJPOt3NV%2BIw7eF4Q9BktC1DipN86uSUupxY71o5%2BiXvBXmcan7zsdHS%2FNTU%2BIHtrF05%2BT4agqjmjnCCvzXJjr6BHuuTEP61rLlRNwgiun9BZPNDOny7d0xxfA%2FgX1ZMYc8wADFvArTgwvv2s2i5zYBpcftALUnS0FVd2NZug68czgGiYJdOrpNQ65e6xYSYMCqxEMMKbVyc8GOqUBuLCcn452Itx3BbsjSY9MUIMHV%2BjEI%2F4UCOtJxKKA1REe18wiwXUclqh7X9C92Zbj%2B%2FYmLbo4%2F%2BtgDBqSOdQzf1LcP4bIzNseHPRsSy2o6MbORKkkpNNFk7L8Kj563YQZJOJhkIsIk2k8cUUf5%2FIxIcScN2hDwyb5QcLe1RQObPvqt%2BUyNKBZjHOz8i69xutpfTQ9nKKNLDgOLa4DkjQ3oT86ZDGc&X-Amz-Signature=195a21de6c0ddea9bdf9507b45811f2b16193481ead97f3cce1cf48682227e70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZME4O5HP%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIDSy54Xh1xiD4yIBRKyBB8%2BXcXiS3oascr%2BrbBG6IMOaAiA2jYhXkO0xWGjHzdb9Sr%2BtKMYElFBBNLQKxn4Yc3A7LiqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZ6G8IuSLZvBGqolEKtwDpI3ONJyqtvCe2SNPxTnxbWuwPIeBzl%2FDKl6SCZ2ZIkHFYmHEjkXL%2FLkZo0fwYEzTsCCBFM1cyTITZn4QEx7EJxJG3zbWZXINu82%2BetSIs5yB3GJ%2FG4jSYCBf%2B%2BjYbKLKURLusF6svKnQheVm%2B08CEfsiToJPbSv9pgNi3W0EHvft8s%2BTnQO6eNIHnS%2FH36JYN%2F0l3UtZ84jnWSP7Jv4QWt%2BhR%2F17LYDriKX56BVYDWz7IM53Km3xfTfltENCrNSKkGLwTEbh%2FAj4O8ElWqbPjZHbZREEjAsfVZvpP2dZVTPJ2Pck3MrWW9e0q9xzBMBt7ICa8R%2BplkdFVTF9%2FlTW6yzON2Z6xwdAnHUECw8az4nW3RKxShcjo7yoCPLWQdLy%2B3C9c7KUAHZcaqKfIvSZukRs0BGViZEIjsRxhSqlAh7qdjsmlDJ8SkKg6yYz2MHUa0tmSCLkz1MPGti85ygMrh5Pp0PLpzMS%2B%2BkamMqm6qcDQ6AIgA785jz5%2BK%2BMfmHdPTF0ts3p%2BxgEAXmGfjOVqzH%2BaVIgoCk2kQ2LQyw1gPDB6UYr7yZjG7DP7pA1SQl%2Fy8LzbaqCkBX9gLiF904CT0y2pYLAjABdTAG0tPcC205rSq7GpXprM6UPRqUwjNXJzwY6pgFTn9Mt3am4raxijgfUe8ThF2IrbC9FDvdaVDrbJhcjRCkr2EUHAH%2Fc8uGoxWn4WB%2B6d2co93ZZjoSp2f03L8GJb9ebXATiOWGLZ1x%2Ft4CMLxby7zXL84vwl6r30L1RSVfvG9%2F0NaJ543O9%2BFXF4TVHXUULErJicoCnDMszrkjkkQucPsjS25Uoj84iOfhr3URjszLkWxb7ya4AsOh0g9JyuWSp%2FLz3&X-Amz-Signature=45e5584ef1284741541814e439a21c1b4029b0b8569dea04f5e71ab300e4cc71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZME4O5HP%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIDSy54Xh1xiD4yIBRKyBB8%2BXcXiS3oascr%2BrbBG6IMOaAiA2jYhXkO0xWGjHzdb9Sr%2BtKMYElFBBNLQKxn4Yc3A7LiqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZ6G8IuSLZvBGqolEKtwDpI3ONJyqtvCe2SNPxTnxbWuwPIeBzl%2FDKl6SCZ2ZIkHFYmHEjkXL%2FLkZo0fwYEzTsCCBFM1cyTITZn4QEx7EJxJG3zbWZXINu82%2BetSIs5yB3GJ%2FG4jSYCBf%2B%2BjYbKLKURLusF6svKnQheVm%2B08CEfsiToJPbSv9pgNi3W0EHvft8s%2BTnQO6eNIHnS%2FH36JYN%2F0l3UtZ84jnWSP7Jv4QWt%2BhR%2F17LYDriKX56BVYDWz7IM53Km3xfTfltENCrNSKkGLwTEbh%2FAj4O8ElWqbPjZHbZREEjAsfVZvpP2dZVTPJ2Pck3MrWW9e0q9xzBMBt7ICa8R%2BplkdFVTF9%2FlTW6yzON2Z6xwdAnHUECw8az4nW3RKxShcjo7yoCPLWQdLy%2B3C9c7KUAHZcaqKfIvSZukRs0BGViZEIjsRxhSqlAh7qdjsmlDJ8SkKg6yYz2MHUa0tmSCLkz1MPGti85ygMrh5Pp0PLpzMS%2B%2BkamMqm6qcDQ6AIgA785jz5%2BK%2BMfmHdPTF0ts3p%2BxgEAXmGfjOVqzH%2BaVIgoCk2kQ2LQyw1gPDB6UYr7yZjG7DP7pA1SQl%2Fy8LzbaqCkBX9gLiF904CT0y2pYLAjABdTAG0tPcC205rSq7GpXprM6UPRqUwjNXJzwY6pgFTn9Mt3am4raxijgfUe8ThF2IrbC9FDvdaVDrbJhcjRCkr2EUHAH%2Fc8uGoxWn4WB%2B6d2co93ZZjoSp2f03L8GJb9ebXATiOWGLZ1x%2Ft4CMLxby7zXL84vwl6r30L1RSVfvG9%2F0NaJ543O9%2BFXF4TVHXUULErJicoCnDMszrkjkkQucPsjS25Uoj84iOfhr3URjszLkWxb7ya4AsOh0g9JyuWSp%2FLz3&X-Amz-Signature=9bb4fd0cdc93a0bea9f726047f76a446db12b7f8bc43b0205c8cc8ea32c57800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLOF6HD3%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIAi%2BCt7PSTwMcqGDImdF3aI%2BVXMAmX4b%2BvJA6Pguy4C5AiAoAYWyKNz2scnr%2FlSoQJtieOX%2B7GscMk2TMc8pGsYcNSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhgfrXJr%2FMa2HYwSlKtwDL8ny3iyRFfJejP4uPMVitBC2UQuwZspsMBeNAvyJWrygpLtB8YZVMVPnItUmJmz19JrjMGHLaIYg1aoh42ds276pBil1ZXjL7LSel7w95GPRyURPKhVuFblRouwq23IU7VPFYFarDh7%2F3waH571lo6R6%2FNj7R2XhnCO0A8RAzobzVyrwWW5MeqvC5q1BtOElsnq%2Fb4v%2FVH%2FWpuABr9DxnkvJfaSECDp%2FCEo%2FycY4%2Bj3B9c%2FAeGYOfmaBWa%2FHxPDMM587j6x0Z4EWYTjaf0AUjtN%2B%2FHtVomt8SyYmtk2c32ZfcSfy6wJsyRDrpBQ6bcdSuRJlqOnyilWEsUkbY7wtTWLMA4OKPvBarW3pXCFv4hegKAY4Oe3j4LYD2UBTGTYUat7w8havODXauT9iRMWQ2P7itlwn%2Frke%2BjL2L2yPJ%2ByCiJ6ap82hMncN3V3i5XmoIFcimpYX8W9q93NqlCO9q2rvnl1l%2F%2BvA1ZS7TayB0DBUFfBuRL%2FG5YkGB8mTqtlVosXBfC49L6zaSNaZl%2Fb98pUa28ZD0ANnx6B0BjaHVwPrJEHhaBPGOghmDiNMF%2FS0YnWmYkq6GCXdFa65a5CyBnvG%2FPPiH%2B16ErVrD1207%2BHjNik%2FwLLPHzoIlmwwiNXJzwY6pgEGeNG1u4SAPyJfgBIbYUt814F9bl9LvoIa8LS1DcPmo7gQnrVHy1Ps7hmAyJQDqv2M%2FqSJ%2F%2FGElxMkC8RwF7rl0jEuBqNRvfq%2BeJwjzLEL9af%2B9FJ%2Bp1ekiVmZNMUbI3ua2SQLmxil59JjWP8IVgepLwa2RoltTOGqjMMgwrvcvSDtdsii2h1WuWmwNLuk9qu0mhUDTZkYxxwoU6YrW%2FmD4v2OmkMc&X-Amz-Signature=cd287538c7e28aadb313c12f973e0bfc79fc3fafe2e2e396082fbf1e375ea406&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657ZGHVAM%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBrsmSpMku6llBH1V0LoujeKRyEYWTTRwGyEjRjfFX1nAiA8ET3yWaw09dOYq4QuzFqbr%2BudCeYycWVlKISaUKGbNyqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FIgzh%2BKDAVNqCuHBKtwDVi%2BBtVEN83ccgcYQI8gNRRN95501%2BtbTaUNDlxp0W8cAb94oQBi6xeN9H7mmiq7EE00tc9drhz0%2FIk0dfKuNiZHG5H8nSjXPdEOgnqmF4q5asro%2FLd9l7lEa3ZI0zAXL7Mo7mHNs0zxpu9oALCAFa6AcbDGXN6dMcJlxHkKp6JbALNb7Xvxy%2B1i91sLCTnlX579HjLBK96HcKb5KoIm5VXoB%2F43%2BRR6NyT0HhzTFBTCVTMx1MSXV54KDh8duSqcS7OXNl07lnbk5ukpg8hcyAJ4yYq6fhyLnstrmtRZkL8B5WZvRlcEMHEJEIJEJ3MwJlsDKaNAMFn6ulpsfL5NtLJhh83y2rGsg5T5f2g75m70HuOrj0o1yfoNEEZYO1aEaaAjWctW09UeENv4UP9lMWiLrBxZJQJxQfBtXR14E8Y3HAiVnwW8pKcPfug4nJ2FAxbsniy%2BA3xOI5xbZvnXmrYXXv95MROYd4nZUoHkFnCEUS51Iu09Bhi9LvwyUdCws2JMznqnyoWQ83e9cX%2BjcGFwZmXVDHuf3CYrBvUS2smXPyoqDWp7y8skogsfYI3Qm%2BYRuEQ7uLpGkUJQLt0mHRZkRRivZEm470C70ABLbq96Xd58NwPsMClKD2CwwldPJzwY6pgFp4ZV%2F2FgwrLGfGh6iGRTy67mvGfsM0ZlrFU0Ws0rAgNgUW0kbuYzm95DVB7fer7fg%2FuJRVzDWOK16txvyGccYxxwbaR0dCDgiQmVZJtMAhhvG0Y2p8g3ujRIeIIg8EDBZTWnDCEHWUgK10jmz4nNSsfFzPZKOecxfgm0MZtQK7TkkXi1j865zo%2BijePgCMkONa6coJg%2By3BeGyY%2B3YHTgv96hPgUC&X-Amz-Signature=48972de6871c1d4694cdf4f6c9a72ac23e5fceb4d797ba54dd7ed870e792abcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657ZGHVAM%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBrsmSpMku6llBH1V0LoujeKRyEYWTTRwGyEjRjfFX1nAiA8ET3yWaw09dOYq4QuzFqbr%2BudCeYycWVlKISaUKGbNyqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FIgzh%2BKDAVNqCuHBKtwDVi%2BBtVEN83ccgcYQI8gNRRN95501%2BtbTaUNDlxp0W8cAb94oQBi6xeN9H7mmiq7EE00tc9drhz0%2FIk0dfKuNiZHG5H8nSjXPdEOgnqmF4q5asro%2FLd9l7lEa3ZI0zAXL7Mo7mHNs0zxpu9oALCAFa6AcbDGXN6dMcJlxHkKp6JbALNb7Xvxy%2B1i91sLCTnlX579HjLBK96HcKb5KoIm5VXoB%2F43%2BRR6NyT0HhzTFBTCVTMx1MSXV54KDh8duSqcS7OXNl07lnbk5ukpg8hcyAJ4yYq6fhyLnstrmtRZkL8B5WZvRlcEMHEJEIJEJ3MwJlsDKaNAMFn6ulpsfL5NtLJhh83y2rGsg5T5f2g75m70HuOrj0o1yfoNEEZYO1aEaaAjWctW09UeENv4UP9lMWiLrBxZJQJxQfBtXR14E8Y3HAiVnwW8pKcPfug4nJ2FAxbsniy%2BA3xOI5xbZvnXmrYXXv95MROYd4nZUoHkFnCEUS51Iu09Bhi9LvwyUdCws2JMznqnyoWQ83e9cX%2BjcGFwZmXVDHuf3CYrBvUS2smXPyoqDWp7y8skogsfYI3Qm%2BYRuEQ7uLpGkUJQLt0mHRZkRRivZEm470C70ABLbq96Xd58NwPsMClKD2CwwldPJzwY6pgFp4ZV%2F2FgwrLGfGh6iGRTy67mvGfsM0ZlrFU0Ws0rAgNgUW0kbuYzm95DVB7fer7fg%2FuJRVzDWOK16txvyGccYxxwbaR0dCDgiQmVZJtMAhhvG0Y2p8g3ujRIeIIg8EDBZTWnDCEHWUgK10jmz4nNSsfFzPZKOecxfgm0MZtQK7TkkXi1j865zo%2BijePgCMkONa6coJg%2By3BeGyY%2B3YHTgv96hPgUC&X-Amz-Signature=48972de6871c1d4694cdf4f6c9a72ac23e5fceb4d797ba54dd7ed870e792abcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCCK24BL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T224200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDiBY6hwYeYjmquBnUuuyc3%2FFkGj45V42BSH3Rar8HgfgIhAObl4JfiLUkmGa2pu63%2FiBAHSNP4MGt4gNtS5epc7%2FD9KogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyKB0hray2lUFue7BUq3APn%2BtgiPX4CTpR2aJnQcnexPfx1fOl%2FrLTW%2FRNZnC7lP3yqydAnn2Wn2qJ9Fg4tZh0UtTn%2BsaJCCfKHN%2BXOvxms4y2cu1f%2Barb6R%2B69DrD8KvsNwu5SzsAuH%2B%2FmpqP12ISq6%2Bd%2BkgfZGF%2F0mbE6h74n5hX6n6FLzUMPe3GewU60hmQs8KUDT%2BPblL496zh%2BqPPq2Y2nC2BVtZAq0V2AVmUjpZJ3cuwXELSdWojHBy1zk1FfxaWvkbzAeTGSlV4vElnl6DGFmawlRxeOgxMBMBxWmoPfqdkyjLC9JDIfi%2FedYODlfZ7hJTs4rwwfkUm7%2FXd6ih8UpVIqKKeNd5bToppTDD0GUNFv78GugT0XTj70ItHZeJd%2Fw6yHgswVHUp%2FZU8D%2BV40AnE%2B1osJWHES4By5KTOMiuzhioYVPn%2FjxOz%2Fsom75LthiFrY4KmtMkIpVPkV8rqrmvR7sQhkqbdvpHoCOwzvmZ4EyG3a0BlzwMmg0ixz%2FjSfQA0OrwQdR4G9Rbw0%2BZHzufCftVz8vVBz6TsrkltEvmgENY4PLfzzPiDpZciehQYGD%2FHdEYvo8XmrUIfhlJmt5Nw8KXga9wbOyFGixTDOJQm9K6R%2BZ0M3G9rMKLddBS8c4uGOYzTR3zCP08nPBjqkATY62ZjjRKZG5V4qcAfNCZ8pBaKWZ5MZv%2Fq3U65g%2BEsZvf5smCGSqPMoaVdW8E3vaaqbvxhGNtLrVFfTbu%2FbeoC58WzRoCCZrxS9w9sQTNRHv4z6DoG9G28k%2FfkYvmBOhFi10D7o7TpwF26FBwu7XLZ%2Bj7EeJfOiYtSihWQvCW0JZP7YbSEWReWMaXUnLBz4ktbfjs5J0rJixRYhbAZ%2Fkw0aJBav&X-Amz-Signature=cd2c91c02adff42e095748fa8085054c9e0be185e658b3b23c3c29b572fefd41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

