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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOOHXO5D%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkRHIlRtf6zZ1LSmaZc3cUOFoxtexv2eSyM2uasyBLBgIhALHF82uNKvXeGpxcWkAK74uxOCUHcOOC45qzp89o3P96KogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUJPnR1YNjfgw%2FJREq3AOvMHpRsrc%2BiILUQTjtMeRtTSxYdr0p98J0qiNMM4MZVJVusW3zeF6L%2FdHKLLbsi0HbBbScRdIKyoFyYWF%2Fd%2F4hYpE9Lk3JXX8MVcsv4%2Bpdb3VrKAOzOd4mD8oFe4i0OMFm2xJIuwt03raiqZvqjkejy6ZTXyEfWQQ%2F5lBeBs7npgjQl%2F9ErvlgMKjYMJlCfQ6wTkuN3%2FRBFC5Q%2BVj1%2BuxTXVTHuZvuTY6%2BTNSGCKd2XxD24jEvMpQRJpF2mFE9AttvSXZUYqKfhgQA1REf41mmvGLwTmEhHlvBXo1cQUGsPilpt5g5nhMxRxAfd8exAhy0sDouiSx21zSQPwzTZoSv0SrpPnQ%2BRIuLbziDq1pkheKOdWZvH%2BO9wCHl4I7uxIYZCQ%2F4tAWfZ4%2FCUytx09%2BZPjKESOZTvrX%2BJfOzRN%2Fjv%2BrXfOUWB4IWX5bfpOXLk7oYFAGGTT%2FVhm5xG60Mwg4%2F%2FbDHtEo2mdwWSsYlSr8w1A7OBf1JR%2BAPR1R7bJGWx6Wn%2BRKIbq%2BMhSBJVCgFzTXahF%2B2EnNnn6HlohTjasbcfU2Yveqow%2F%2BFIcWpxcxlrgav%2BGV4rG1U7mtBCIxNdrU7FnHL6%2Fk18VQ5EHvOUO8ZMiW9tZeI7N2bJ4%2BeLjCCzZ3NBjqkAZ2o1l3W2t0MkTyjEx8DgdBkX92XGadqmHD%2B50LCYAPMmm%2F64Du7StzjqmFDOR%2BzXNsHQGIYt8bfM4EtPMWJr7fM2XHl88b%2BZxyZhKe2YcI0EWx2LdV92831fF5%2FTUT9TbLIYRP6jLG12lzyduPt9ZYrvhR426O6mgL80b84ihXjYDaD9MvosYc9vTIt1rB7OCa%2FwqVh97sCz4q%2B9CTpMnsKvrTi&X-Amz-Signature=6f1c2a75f9ffcdf39c10563baea40c0bad6eeda5f840b9e8c5898e64c23c0556&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOOHXO5D%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkRHIlRtf6zZ1LSmaZc3cUOFoxtexv2eSyM2uasyBLBgIhALHF82uNKvXeGpxcWkAK74uxOCUHcOOC45qzp89o3P96KogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUJPnR1YNjfgw%2FJREq3AOvMHpRsrc%2BiILUQTjtMeRtTSxYdr0p98J0qiNMM4MZVJVusW3zeF6L%2FdHKLLbsi0HbBbScRdIKyoFyYWF%2Fd%2F4hYpE9Lk3JXX8MVcsv4%2Bpdb3VrKAOzOd4mD8oFe4i0OMFm2xJIuwt03raiqZvqjkejy6ZTXyEfWQQ%2F5lBeBs7npgjQl%2F9ErvlgMKjYMJlCfQ6wTkuN3%2FRBFC5Q%2BVj1%2BuxTXVTHuZvuTY6%2BTNSGCKd2XxD24jEvMpQRJpF2mFE9AttvSXZUYqKfhgQA1REf41mmvGLwTmEhHlvBXo1cQUGsPilpt5g5nhMxRxAfd8exAhy0sDouiSx21zSQPwzTZoSv0SrpPnQ%2BRIuLbziDq1pkheKOdWZvH%2BO9wCHl4I7uxIYZCQ%2F4tAWfZ4%2FCUytx09%2BZPjKESOZTvrX%2BJfOzRN%2Fjv%2BrXfOUWB4IWX5bfpOXLk7oYFAGGTT%2FVhm5xG60Mwg4%2F%2FbDHtEo2mdwWSsYlSr8w1A7OBf1JR%2BAPR1R7bJGWx6Wn%2BRKIbq%2BMhSBJVCgFzTXahF%2B2EnNnn6HlohTjasbcfU2Yveqow%2F%2BFIcWpxcxlrgav%2BGV4rG1U7mtBCIxNdrU7FnHL6%2Fk18VQ5EHvOUO8ZMiW9tZeI7N2bJ4%2BeLjCCzZ3NBjqkAZ2o1l3W2t0MkTyjEx8DgdBkX92XGadqmHD%2B50LCYAPMmm%2F64Du7StzjqmFDOR%2BzXNsHQGIYt8bfM4EtPMWJr7fM2XHl88b%2BZxyZhKe2YcI0EWx2LdV92831fF5%2FTUT9TbLIYRP6jLG12lzyduPt9ZYrvhR426O6mgL80b84ihXjYDaD9MvosYc9vTIt1rB7OCa%2FwqVh97sCz4q%2B9CTpMnsKvrTi&X-Amz-Signature=6f1c2a75f9ffcdf39c10563baea40c0bad6eeda5f840b9e8c5898e64c23c0556&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675WDSPAP%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9kNVQojgx3t7rciSD5hTDvzk6BOoo5cKuQVm17ScS7AIgXds7R5Q6V5i3ig7705J23w1PEJ20TdYDn8hcIaUmK5QqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1FnO%2BCEFIJdPYtbircA3BEcGM7kTjNqM%2Frw2jWR8f1qad81c5TQVcAhkd%2FWNtTATxJ4xuZGtztp2I2eTZqn6PwVio3B2mJKw2enbryPl%2BemUvAGVpmnRn79gqFdqWlHXUAuVqTsh1t7rPaKHRoDhLzOQ0n41KnEareJ7KBakoqPrDycTNBkpPSBbtExKgODOGdRePD6eUJ0d2hltm%2BNa3JuSNMQr3zIO6CbaFRtjHJeJOF22Y8RqygsdefGGqAJbAuN0dYQfTXcJfsUNdV9Hi9R9sqMXjEhVw8p4ep2mkBd7feOPIDC%2FboywtYsdUjEQOqJWG30YA8cSJ3aZbb%2Fi7ge2lKHDEvqeF%2FV6qZp6lkDdxb0vrarSKue2ZtqzszeBTqoOoEgA6bGyyGbbkSxrkx9gmghkCoM2QXbeaaGGSCadxdgcIuepSaqMuQ6lgGEnD3gQ1wd51ne8OR76S%2FOv76duiRhy0OvsBU1T%2FpaFO1yOuKCW7emd04EsOWO%2Fjv6veh60%2BZJ2oJNzBpwHIK8KzalJ5Z6x7GR%2Ftnvnn%2FUN0y0DWRWxQVqZHYuGWnOBa0AUXGLrFn4Vimq6YaQe2b%2F%2FTxoEj5y5c3fmyd5GneFRW4MAXnWrtdvh5mqNUMbwBoKbvINlLfMqhJM48LMLzOnc0GOqUB5aRyFNh%2B7XG%2BNPbNrZz97ZAxzE29i1aHR9Wz3MikmCBjsw0JkErsIxN8Xpi%2Fwo9uzY4Gvi53StGdaf1s6brhnp4KtAs7dtrs%2BThNYb70LKgGvK9MUg8NcAb%2FBh5KUyGsqe28kleAyPsjqz9Ec%2B6KwSM8Z9PB6t8x2UjgkyqXcHLEEudFvVVUaMbZSYN%2BalkWC8IvMntRFstv8%2FNtjNKqJmUVHH7b&X-Amz-Signature=5d142f833951f1883d5eff353b8dee30518d252299fb33e60d14d48725ab8235&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMEXP76L%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHyBWLTJH20har%2FKzQCvgehI1%2BYSH54Jqzz3Vyt0nExjAiBmvsCZSY%2B%2FKNfYTG4XQVC4gkpQc6B9XBAIstpu8vGEvyqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMccbcOhtLIwr8pmt0KtwDkKiHCMAOKqxs8v4WDoQGJ9DL7yJcMuUBIwuLjroI6XEFuggS%2FqNwMJu%2BXINyqqY6M3rYWbazj9nzyMM6eHMAAqK274lWf5zChdfLAX%2FVIiUAYenWXDIx9msXWFINDighkZSfjGmISLOy80ZH8%2F9xwx4dDCUhHIygIx6ptORJRyJGXFKdH9Z9pasDY9bRYPdi221UUq8e19%2BNIHEher9jQNZRkdTYCau7JC7PoQ2UpJFYSIGX500pjB2%2FXgFc8pdfwkaT%2Fnrqrl0%2F5S7U7QjEukAg2WURGuOYN4WGh%2FJOssvP0lR5jzFNZ09mQLN4h52vEEMuliCV3dIfGu91qUcpCh2iOKiJdJVXcNA6Aym1GXHDTum6zoWmO%2BkIN01VpPzkeZhzHeji5VbbfnhLbkwXVHQO5ZO8j2zB%2BgEWksnLwf%2BPlsxldO012ba8fdjoWB5cThjEB%2Bs%2FmQZNSK5AVj51WhzAr3jM7nHlhp206hVeyL0aAij3ZInBlVsQzkYCoFHaj6QJdcMZoPPBxobD4eB4RmtLaG10eMxqWpBxiC3t4cjpTN3TLgzYu3yFr3pGQ%2FQ%2B41CftWiUYmSLSCoR%2F7zfnNaN7mL9lasWQ425twqbn%2Fl3LdNz1XX9OlwI3aIwsM2dzQY6pgH9584u1nmgAnb%2FHd4aDufN7zOc7KLvCU%2Bq%2Fa96uwavy2Hk%2Fhci9%2BHTrAP1JuBnuzpS5v8whYUG1NcartN3V%2BdD9lsNYN68wN%2BQoGIdD6VEE4k2Vte6YHG35lzlmjovnIyVAO58KUONVSyVuDYOljiq0DkeYdGcIAmfz%2BaC7lSpUbuNxQRw%2F5USbvxKibmcWH0ep3HK8w9e76PCP9bmJoRla0QqQOQ8&X-Amz-Signature=c6e4aa6a730c1977b851619de48d5d1030a8092a270a2bd098b0fd0794242f8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMEXP76L%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHyBWLTJH20har%2FKzQCvgehI1%2BYSH54Jqzz3Vyt0nExjAiBmvsCZSY%2B%2FKNfYTG4XQVC4gkpQc6B9XBAIstpu8vGEvyqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMccbcOhtLIwr8pmt0KtwDkKiHCMAOKqxs8v4WDoQGJ9DL7yJcMuUBIwuLjroI6XEFuggS%2FqNwMJu%2BXINyqqY6M3rYWbazj9nzyMM6eHMAAqK274lWf5zChdfLAX%2FVIiUAYenWXDIx9msXWFINDighkZSfjGmISLOy80ZH8%2F9xwx4dDCUhHIygIx6ptORJRyJGXFKdH9Z9pasDY9bRYPdi221UUq8e19%2BNIHEher9jQNZRkdTYCau7JC7PoQ2UpJFYSIGX500pjB2%2FXgFc8pdfwkaT%2Fnrqrl0%2F5S7U7QjEukAg2WURGuOYN4WGh%2FJOssvP0lR5jzFNZ09mQLN4h52vEEMuliCV3dIfGu91qUcpCh2iOKiJdJVXcNA6Aym1GXHDTum6zoWmO%2BkIN01VpPzkeZhzHeji5VbbfnhLbkwXVHQO5ZO8j2zB%2BgEWksnLwf%2BPlsxldO012ba8fdjoWB5cThjEB%2Bs%2FmQZNSK5AVj51WhzAr3jM7nHlhp206hVeyL0aAij3ZInBlVsQzkYCoFHaj6QJdcMZoPPBxobD4eB4RmtLaG10eMxqWpBxiC3t4cjpTN3TLgzYu3yFr3pGQ%2FQ%2B41CftWiUYmSLSCoR%2F7zfnNaN7mL9lasWQ425twqbn%2Fl3LdNz1XX9OlwI3aIwsM2dzQY6pgH9584u1nmgAnb%2FHd4aDufN7zOc7KLvCU%2Bq%2Fa96uwavy2Hk%2Fhci9%2BHTrAP1JuBnuzpS5v8whYUG1NcartN3V%2BdD9lsNYN68wN%2BQoGIdD6VEE4k2Vte6YHG35lzlmjovnIyVAO58KUONVSyVuDYOljiq0DkeYdGcIAmfz%2BaC7lSpUbuNxQRw%2F5USbvxKibmcWH0ep3HK8w9e76PCP9bmJoRla0QqQOQ8&X-Amz-Signature=652296f201c3cc6551b5c3396cc25fac337c88467a0cec6fda704c8652d91a9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUDPL646%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwIg4r1NwrEFvIn1pT%2BKyKBmCwnlzqUscxA0GTMQM3DQIgaFPmu%2FSZxet2Wo62sS9nuMutiC4PnlYo%2Bgo4w4ymBMUqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFXodpXYIxTJlSwaXSrcAxYW4iYTpURRXy4z8eXAyXM4%2BWTZ2rZkftju0PH3eiIk%2ByXQXOrpmmSbzDg9yOfBDyglLIR%2B1DBz95MkOz%2FoFr%2B2B9MojBU%2BRmK8GErdOmqi5ncfDJIV67dzTurfo4MMZl93jP6xfc9rTjkqc5Ljq29ugzLyGFY3vQzZQlSMY3yf2Dwg26GdMvVtae4u2i3YBxOPyX6bF4uTsAgnZoSceRdfjQU03O8JSumm9Gf5NTYufDtLA2IGH4HDKEecGdQ%2Fj1eYJ1g2c66sqwXHgoCMDKeBHxof1Wza%2F3tFRKnUTvb3iqAWwdIQPq3j01CJEyWZw0apeNK73ygrz4x7xP%2Ft1PT9XnlVDiwvWh%2Bn1IPviZtG2DGSn94iXxQUJcOGRUDkX4lYdeqXHbTAXfrOgQ4DjODplmo8rjD4WAgjSqhMd%2FLgNEb19Dfl5OAnsKDIT0ceLcwTL82fihE%2FMds7U2%2ByY5yvs0Dwq1CMK7JYKfRKAa11NKSWTZX9XVUUJcflc%2FbhbML%2BVnMPdnpCvmfG8QArE4qD%2B6YebqN0WLY%2BXdcHQFFH9gLJdtha5i62l8urJWAHf0vQXDr3fMTI2%2FszKAIB25aW1rgH1oIAoIz9KNZ%2B%2F3cTxlOo81rVbx%2B53pS1MJzNnc0GOqUB5EmnjyBrKC1ZXXQKpKUAVb7yysqUTBBZ3xLCh236spsQIKOM7kRP1UaSGXCbrFNs3GjJJIt0WhBsNb7Z8lNwUc6Zoidh0nqTwd%2F4l8%2FyVbgrTk2%2F3B6iCOaBBvnnBtGFpk%2BPXbTxFTR4omoyPxmj4VzpAr9kltBkQ57Q3ktRBC3Wap4jMS8FNGw%2FHeHLoM1pcp4dlm8Vwh3EHqY1XYmyKas%2FWre%2B&X-Amz-Signature=85b79a2a0a46b97c0243de617e69a0913c3725e98615964d4895d0dc961851e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTMH3BFH%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA5XNcgLzwj0mInYUDK9wPGNCBSqSyxrcA1ePo5qZGP6AiEAx7Ik88y8bfjZjQvixLYw1K4lfnJdAihX5N0oeyBN5pcqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPk22Uw%2Fppc1PGwa6SrcA0mq6fWszZmzWRA8B8r0jl2qdlRLbI1wpM4Zfd6pRpPOM3NYJsAaaG5Mqv65Df9%2BEVXUL5lN75Q0QNIbCWKxuTWQfElzKifcU6fVXeZsZjxCnqaNJSGeOObQsZ%2FJIp6dT3YH9Vyw9UUa6iDoelhGeUUbhAegCkCWmFK2Dy4CgsTrioim6WRj%2FjJILLvA3myHHNmVbtdBX2C3XD4A632%2FZ40n982v4lv%2By1nUDIPIEBCDRDaT2pwUK%2FfZLdxllH9UsKAMgD%2FLexGB%2Bl7l%2BpsoXUBYVsF9u5hD6F%2BRKRP9gQGog%2Bq8VY4lGK%2BwOEP4z1ESXdDCUqJ2R9uPXw7mtswNiFjr1jO%2BvG5pWdGe36AAwnaBeYSKWWdnI9ivNwW6zsr5JS6vBt3VOhcjJnHH49iObc2M6CqLYBBFgTidzEIvj3xLwQ1JYMlC0nkS46l1KyPbTOn23EBZqj%2Bkcg%2B7JYE9DXwJ2YUbodSb%2FlzPKJt1FPCUKViU0WtyuRRjWXjY1B9C%2BXEBiIlMXk58tXmGIVSFp8gec5o4Nyqu3HghIX3j8UPxuv%2BYwykpN2mCxBAzb5n3ysZLWNXnH2Bcdoaav8yqITzAlKQ6iOtI4TOnRJivMq4rgYd3yNbBxIY89l%2B%2FMKfNnc0GOqUBtdtntzXkVAaxWwULmK6oGG3WuXzTM4bDUAecFlg8FnSQ4d0EJS3kuz8DZMYAjyQlQXF4Vx9aFcPBwy0tmhINisBD%2BB%2FbGk438gx4g0QGX6AmVuHwumeVjPHJ1Hy9wJzwzRz6dK1lHHNnPlpSfNJNbS6ddgdSX0FvprP0pIvgR7lhSLsKIwlEp%2BwQMfWLNlxPT1uHzuzT77Tz0sx75TigHbrMpT6l&X-Amz-Signature=df251cd81fcb45213f1fa4300eaeba66aadc4218f317c19112c926e39057dec9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FRPEV36%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUX7FeuFGIzFC9PMx5IgjG2SFuR8b1inge6Ye4HMV74AIhAKjBH3nf8r%2BwHy9Ws%2BR4zM8MC2BYRZKfytdGaQgRgPWYKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxTp05uQ8tVZifXwAEq3AN%2BoQFjzN6ujNUv61KOs8IjqWQ7f7vZ9nyLysAvL4qgDSu1jUgjHH0dPmcYhc5EqvbjEmLoVxJlDd3bWY8hUvGUfDIPo6PkIjzcY%2BLyHclTEDojhLxDFI1vA89Ryr%2Bezlgfi4HIonC%2BOiqEgQDvFx5CQm%2Bn0aiXKOftzd5VdrzFAt1jG0JRkxiJyhIVb7NcAmirOjhg9xjdHyzydCkxcIaHK1mW%2BciYgtIzwqs%2FxBiqQpOxxXt%2FsYycIA7RMNrq1QpzFTA2j1q7PkDsEXlC7gbUEphdzCQ3tMpeAlzEOdQu%2FT4IqiMejPIa%2BZHEmKWgesq54boNPZgSPojm%2FFdvzYgavyxqJTU%2Bb7QYBD6WZFFXXICZErwTfhN%2B%2F3LrQIUScugYn9WwY%2BETkxl6Jr8MzlD30ObEw1U0XK7STLKFUSZ40G85w7Q3vyHDi3uYs1qKPXL86PQxnAkZyHRHZeBy1%2Fi4UPcEjfTbmUXcDMRIrjmjdtIcEGLWIvEaRHYkqRtGZv7zVMsviojSNNGlF6tj8IcQBjeZF1kdzO4Cc%2FGaznQ5CebcGX3q7PB%2BV%2BFSBAtN0Gpa%2BTZH0IQOMjxpFqO4KkHf22ODjWmrwSgKtbClMXIQJ1JhQ7QqbKjy3BDt9TC8zp3NBjqkAfPpH1JaC43E43TJb0AGwXhcSvXGUPWJ5Ho%2B8Nmmx%2FwkysQFB%2FSru5T87fi8adTtxqhgVdxUGDlIxC4Smczj%2BFcSKzyFUgpXoqtTCsPS7IkzEOXkSfQVnAabimouHjAUC1CztYoSszN9vYX6FxZ1d9suU0yUceiJBF3Hi1qhgfeHAt2DcXZuOmFqE7IEupX7muqiGmmjXeetwUm0OMi0psFlzug7&X-Amz-Signature=841be6bbbd0001d93273ffb5de4c5ab137554c5ed297a334ec9535b3faa1baca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZKRIDRZ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdljgdAXbCCcIo5UY9Pnye3wJnoPbNDzrUOFZYp80oKgIgGbou7L4VRIf%2FCzVS1bu%2F16oqNTxJ8%2BI2D7ej%2FKBDgq8qiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLgjHd0JyJRxf%2BgE1SrcAwgSC2fKRlkr9tNKCc8Z2KHIKYAc057DzOJV4t98csN0R5NRqgdVIGK8fdIDfURY3e3DYqhYf5bzI2zrpkewz1CMeJGNeVc%2BllwTitMeLGYaunTafZ74PdojBcUHHoZJRfR9WnTdL912Y39rt1A52N1JZBeYsUD7Y03WRSS%2B9MM6PqaPIf4cCuECPMmBrtLH7LDyRVVhE0ncS01sfM87oDauZ5Ur8khWKUdFsng0SwFeFUYD5nOjN%2FnAwORNktD%2BSkxBoUDj%2F4m7pqMjA8GWxK2ryElZvWrWPcQk1TX%2FtHe68tIBH8JJJ7oHFNALqhu8SFuPnf6qnmYysngGrcOkarDk2Ogb5D0%2FcsnmrO1%2BS6atoLUYqwisqg3hf8%2FQ3htaVBx2jDTsxwugZ6ODqcbfxIngBUW5P3RWDhASH4HZnyxqETKBv8%2BnqYLNNsGPjzn8gG9p%2BrNjj9Iu%2FNsz5G6HTg2E2CdusiQGl1iqubWAb%2BMzy5nVZPpEgsK62lFKn%2B5SZTK5UEehzLO9iULnByz0K9zAv4jmqW59k9rUmkYyEGDfdKbUevb7odUuNCYP6ER2Xqb0FOk2sLma2sGRSXVx0BTbaa2nIh%2BQIj9u%2FQpxtzw5gm3G5el2UsDjRjnCMPTMnc0GOqUB%2Bhym5nabQyDZmwQIeAFDP67IBcnaEOUZvTEqVGY1ZNZVVKapDuzD1ZcSRO7ArgbIalb89JI%2B3rc3%2FEYPssNl69FB8gAEQVAZXFm%2BplS3taQy6yAL%2FfQq9hpc7EqZux1gwAEDhWhA514nvMqk1jNwuS%2BhNGQndI2ht1SoTQ89BElSxXDOcn2aJzMK0a2%2BB4QDqRxm7MSxjbrZMWmUGu17rkJLjVBJ&X-Amz-Signature=792159927f2459ca80cec3d2ec8ebf7decc46fa2886853db2d0d83374f3f7270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZKRIDRZ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdljgdAXbCCcIo5UY9Pnye3wJnoPbNDzrUOFZYp80oKgIgGbou7L4VRIf%2FCzVS1bu%2F16oqNTxJ8%2BI2D7ej%2FKBDgq8qiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLgjHd0JyJRxf%2BgE1SrcAwgSC2fKRlkr9tNKCc8Z2KHIKYAc057DzOJV4t98csN0R5NRqgdVIGK8fdIDfURY3e3DYqhYf5bzI2zrpkewz1CMeJGNeVc%2BllwTitMeLGYaunTafZ74PdojBcUHHoZJRfR9WnTdL912Y39rt1A52N1JZBeYsUD7Y03WRSS%2B9MM6PqaPIf4cCuECPMmBrtLH7LDyRVVhE0ncS01sfM87oDauZ5Ur8khWKUdFsng0SwFeFUYD5nOjN%2FnAwORNktD%2BSkxBoUDj%2F4m7pqMjA8GWxK2ryElZvWrWPcQk1TX%2FtHe68tIBH8JJJ7oHFNALqhu8SFuPnf6qnmYysngGrcOkarDk2Ogb5D0%2FcsnmrO1%2BS6atoLUYqwisqg3hf8%2FQ3htaVBx2jDTsxwugZ6ODqcbfxIngBUW5P3RWDhASH4HZnyxqETKBv8%2BnqYLNNsGPjzn8gG9p%2BrNjj9Iu%2FNsz5G6HTg2E2CdusiQGl1iqubWAb%2BMzy5nVZPpEgsK62lFKn%2B5SZTK5UEehzLO9iULnByz0K9zAv4jmqW59k9rUmkYyEGDfdKbUevb7odUuNCYP6ER2Xqb0FOk2sLma2sGRSXVx0BTbaa2nIh%2BQIj9u%2FQpxtzw5gm3G5el2UsDjRjnCMPTMnc0GOqUB%2Bhym5nabQyDZmwQIeAFDP67IBcnaEOUZvTEqVGY1ZNZVVKapDuzD1ZcSRO7ArgbIalb89JI%2B3rc3%2FEYPssNl69FB8gAEQVAZXFm%2BplS3taQy6yAL%2FfQq9hpc7EqZux1gwAEDhWhA514nvMqk1jNwuS%2BhNGQndI2ht1SoTQ89BElSxXDOcn2aJzMK0a2%2BB4QDqRxm7MSxjbrZMWmUGu17rkJLjVBJ&X-Amz-Signature=1fdc3ed3e352dc808448650a6f9800e3c8a0cbacf03f4a267a027786eeead35c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3IA2ORI%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCCX20tXazBNvjd7wMd2Iru28ZjV%2BGwU%2BFoDi9GHMgWLQIhAN9fGlwjHbwgQp80FCTfp0ocs9pESHTyza0BGbCxQ%2BBvKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzAzty9telzEwqn3vsq3ANERtJ4fBSbcy%2Bv581I5c4ft9C4XFwzk4dHQvKp2IUtynaeL6OYeI8cVRrqM%2F2IAiHt9ayidkOdQkBYNCIHyNjSecujjG4KwVW6zgW81BAsJ0iyxpUQHaU6SheQ0U9acoWPEo6r0%2B9lKfb162Mq%2BUOb59IALiDdcAtOUjsFTVblXVOd6kk9jFk55fanxaSMkPKTlcCY9pglAHR7e2tnR3OJDo3Xjvx6SF%2BJ%2FcRJKn3Q0OXAbQjdAaQ6DzbIRWCubXZ3aK%2BP3QPOkeL2s%2F1mkLOSkne4RfLQxJJ4m3JLejG02X8qKDyTmtdiRaUsa53OLsHWVdYy2jgsmzzqPU9qo8jKWHGsxARaEgMbRbZSz0W7p9CqkshnwLVhYI1JnExLW9OVEmTCIB%2BwfHcKW67W2nnqUmEayGFqaaEEMN7t5wx9Rgg87A%2FmYva1bchdB65B1lsn%2FHZxo1Z1FkIXbvePNXJFsmNm11zu5GRmY5ddgtv9CjvKIlwDkDgpzTCjHnUaEMAkL86rT%2BKOT114Cjy7yxUBCwiA6lW%2Bf7Q0F1KiwfHdiSO2Flbpy39PisjPSPNudjW6pF%2Bt7Z%2BuK5sAMjFzGevZE%2BkwdRcCq3o8AocMZFNSPMbTVrZjqb4NRqqZHTDNzp3NBjqkAX73zBAsJ6NVCod3TeSLsyNBpMfPDubj5UIhLcPqP3grC%2BBmv83%2BleM%2FIHUKsuNYUGZ18ril%2FUHG6zJ2gFY4QDIO%2BS%2Flu9%2BQA%2Fxvvcyjm%2BIgDF6z8W4Tr7wtZ%2BNlVwrzaurw%2F1ULRNMhIgCjMMrMK4gsoEtDJViKKD7NNrkFKKUT7Yfey0TuU%2Flqtf1T2VJnF00He%2BF94CmAHy%2BCdPSdy5Qhflyb&X-Amz-Signature=5762851dbc38fb072061c65fe2f0bde55a0053f02c0b977c30f26377bc470afc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665N7YFGFK%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBeMQwvCrtT3QmblHx9zGVv7g3%2FfnXnNnFMKcmUvS31zAiAZ6wfVK7yZW3%2BnSi0oUci2DxC%2BELOQ4Un%2FIvyGPGsCPSqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYOvhBhSaTh%2Fnw2X8KtwDXuOO0ry8Rv3PK5D5l7rnKQ%2B%2BPeeQfefIqv%2BwPwDEwt5pvRcTYuK%2FPCH3%2B5MJomnradTujekjPeZ9nePefgbdGb6x1i7j0TFxQ0oDI5Im1OaMqDQkurQbn%2B%2FZG59JQnob3aC8tRREw9mdGxR0a7SJOT2ahYsKsTgHm4prAhvl%2F8DN1GF%2FHRX7luq5g0nv9N6ACjRlhHTAuv8CTAb5cVgRrSzkVHfHSW172qcafLhr9W8I0Iylvh470kstjtSFR0K0qjuJtRtWggeIctf%2FcyyrnQfjKbIpA%2BS3eFqcRG8Kj60Vc6Woes2hQXXUCxD60th6Or9Kb45qs1u4NJDDgoSYReOsKoM06BBxqXlp1mF%2FxsABrPhjYuK%2F5e2HxGrSNfiQP241pEMdyroPWrtdEeliZSf92SNvDLksd5VqZJVyMXbQmMwpwQ%2B1vVlaMLbsDCWsJKjV8kpTetmt3uZOtufxKpAYr00PyxqBNzPru45IYmtftdAiAJJzf2PuipwhjnyG0oXlUaL%2BKW4ARVjnxdEFdwOTVzghT89B34fFExipAAIyRP0yM0nsa%2B5M9hqAnt8OAYnxV0UYWHaz7%2BWnsjFaQP%2B9MFw%2Fg6xCCfS%2BugAWotwTgvmHIuYOjEENzlEwz8ydzQY6pgFxMAG1ePIzhKAzV9x2uwTmiluDMVdA67AYEUyJub3JP%2FycAQyng7cAudJbOZD6eNh2MTezYrgMgx%2BDQgl32gAIHwFEOMVWIhqZlDtuB%2B9b5YKrxGn5LstWmJStdTYlVaIAhj%2FnvxR3rGl3g3JhG%2B%2BYLEwZCZflR%2Bzj%2FONIWee8dH729RmOO0dYdBy5I4%2BIED34AKK%2FWo6GbeEMpKHwcONbaDWThsau&X-Amz-Signature=98e79504b1fa94f191ce085b1299996ed56e33bcebe5314f1772a142bf0f45a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665N7YFGFK%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBeMQwvCrtT3QmblHx9zGVv7g3%2FfnXnNnFMKcmUvS31zAiAZ6wfVK7yZW3%2BnSi0oUci2DxC%2BELOQ4Un%2FIvyGPGsCPSqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYOvhBhSaTh%2Fnw2X8KtwDXuOO0ry8Rv3PK5D5l7rnKQ%2B%2BPeeQfefIqv%2BwPwDEwt5pvRcTYuK%2FPCH3%2B5MJomnradTujekjPeZ9nePefgbdGb6x1i7j0TFxQ0oDI5Im1OaMqDQkurQbn%2B%2FZG59JQnob3aC8tRREw9mdGxR0a7SJOT2ahYsKsTgHm4prAhvl%2F8DN1GF%2FHRX7luq5g0nv9N6ACjRlhHTAuv8CTAb5cVgRrSzkVHfHSW172qcafLhr9W8I0Iylvh470kstjtSFR0K0qjuJtRtWggeIctf%2FcyyrnQfjKbIpA%2BS3eFqcRG8Kj60Vc6Woes2hQXXUCxD60th6Or9Kb45qs1u4NJDDgoSYReOsKoM06BBxqXlp1mF%2FxsABrPhjYuK%2F5e2HxGrSNfiQP241pEMdyroPWrtdEeliZSf92SNvDLksd5VqZJVyMXbQmMwpwQ%2B1vVlaMLbsDCWsJKjV8kpTetmt3uZOtufxKpAYr00PyxqBNzPru45IYmtftdAiAJJzf2PuipwhjnyG0oXlUaL%2BKW4ARVjnxdEFdwOTVzghT89B34fFExipAAIyRP0yM0nsa%2B5M9hqAnt8OAYnxV0UYWHaz7%2BWnsjFaQP%2B9MFw%2Fg6xCCfS%2BugAWotwTgvmHIuYOjEENzlEwz8ydzQY6pgFxMAG1ePIzhKAzV9x2uwTmiluDMVdA67AYEUyJub3JP%2FycAQyng7cAudJbOZD6eNh2MTezYrgMgx%2BDQgl32gAIHwFEOMVWIhqZlDtuB%2B9b5YKrxGn5LstWmJStdTYlVaIAhj%2FnvxR3rGl3g3JhG%2B%2BYLEwZCZflR%2Bzj%2FONIWee8dH729RmOO0dYdBy5I4%2BIED34AKK%2FWo6GbeEMpKHwcONbaDWThsau&X-Amz-Signature=98e79504b1fa94f191ce085b1299996ed56e33bcebe5314f1772a142bf0f45a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHXPDZJ3%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T231329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFDHBjei%2BOMKk1KWZFRAuXcXJY5XFhd2ac1po4e8kcvwIgVoze0NDrC54I6zwTszDc0rpxkAPiC8%2F%2Bal%2FUCJ3PWnAqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF5O4ehv%2FBKvelpxHSrcA1Ee3n7j6%2BEQq9KhNphU7%2FkAw90QyxHCItA%2FCIQr901gaQBRI0jdvwlvFCV8cq3GF2eCl19241r9VchIhQwsJDGUPmTf7PyGfESL0DtnEFhK3ke8ur8VgWYVpbpretYYzQAiYa1HSAm0XVtnQjaAzY73GFUovGF0kwwn3lsjrlufgbymNdwBUZWzxpPb8KL2bZLEOvvEAYpJxlITKKtZpFlD5%2F9MQXkw2V7QqCpp1FqE4z0nmwHOWNHEyRpdIBlNapGp4JCHo2qS0v%2B63fhGpvXTp61zp2PSbFgbsTVwr6Tlng7SjFF%2FHZ3Tjo7xMXMyfTX3VUJcsFD07qxKP%2FWIo3ZO%2ByEnkc%2FPfr87%2BcUXf%2BgetEhshk4t0jEBplL10VJ7uEkdqOUhtqvyeUk8SUWWNMyJthHeO4OS28YbkX7yGUVoj8cdHN9tafyc8cPKHslKCQAzYVFO42nvuxsz0USfgV1QWf0xOLg91J0uVB%2F8Uk0PHSvpUYblcLc3OuKLrAowBvv6yQYciaFIRbxd0xbcGXUmutjYlNqOyjHDOIiJrAj8a366ADXrfusEBWQ6%2B25LYj78QMjDySfioKj2vBgrmPjDOzlrcPF2nYVi4LEOBLBJi4cZreTNGlH3YLvJMPXNnc0GOqUB6Wqjlpr%2B4KcT4ECm%2BxPXhKtdV4cKXuHIR5UQj2cwsXEOnAufSAJx2CoeKgF%2BmRCODcMxSp21bn6TM61xt1%2BJpLBwXmQzzt5mn%2BfAsAzxisCEhLoU9kDTAfxR8oZQ2ryjhc5l2XMp6YcI4MuZFfNVboLyaScCfbCTEWcmeZLpDsfoj1LcpgHJK%2FmxCLp9cTZW5eFXKCm5OaJ%2B8fOl0%2BOD9xecrMRW&X-Amz-Signature=21ed738276e575110230027b255b7ac45cac87978ad348aff8b264c28e382c92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

