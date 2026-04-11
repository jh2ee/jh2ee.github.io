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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXIEHIU7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQC%2FnyWdzy4r41%2BABRh0YzJ0hBv1%2FUQYlmouHTFJPqEPoQIhAM64mYvWTY8bs7Tn2UWBD9OcOQutuwaSCHGxWGbZm3ggKv8DCDkQABoMNjM3NDIzMTgzODA1IgwnjNJybq9QeSPA5O8q3APFVuFInsW5mj0DS%2BOA8Sl5pKI%2B9wcsVmewKVj8OT8kYgSU1VhEQl%2FZKzBOo9rowiPXuKsoi1xtbxZjstqmv%2F%2BJvDViXu1efTlbsgN4murZaQta9GETiRRvpYli%2BDBuC6def5eMfAVT%2FCE2EeWmCYJ5sm0xWxP00xfwSceXyqUj2t%2FknRabEAxHt9BDnwYbs6G1OjIbnysygh3LNDoUXP55%2F%2B%2B2cYidxrtBxGi1gwVw5WTSV8ng5EwRkA9ST71oETX8rRMpDBASWc%2BVA34XDt6b%2BPct0Mbqn5N8y6qoLYVFVzOziwDEJr9L%2Br1rziwUV40hfjoMOm%2FquQ%2FTsI9BljBe8sCyPMlI0sh5ySri1yfUkfg0vdQ9xu2tjUPBEF1Lkdun8Y08AlWzW%2BnxhEmpv4NlnKH1ShXIgYmxPeZ74U%2BIUl5OOrLtbqQ6XfIY6GHgLG0%2BdXQ8x6gcwdNyC1FLhWzSuSUi0wN50aP0Dbmh6Jw4NOkJfRF9J9yolBgbhjHq1ylx5oMVZtwwUD%2Ff1OllWUBrzOFVJgd2eBSLMCKaUvZcHqPs%2FbHmN27lfjPHwBHjUBxuW7rQfLUjAnDTi0Gq6Z3EDyxQKF61oc7rdvEKelbhe9gGwsZRZPPHDFiKzjDwl%2BbOBjqkAW0KZ75oxjO%2FqYfEwfhPVh7GKqMugbTCzBax7kXUYNJPhzlrJAhq4O5xqRMDcM0IOhGvqb3soa%2FVj%2Br5n9anxJPyyUIYVacTCBlrO4v2Ds3kgRODCpTTU%2BSEFN0K%2FIFCw3gB%2FKgC2SxF%2BUjBpfTF%2BZCzKMa8xnl%2FameSJdKqeyGX%2BU55gkxj5yunnOgZgc98QjEdrdwt7nwRWNX%2F4190BWdgtd6x&X-Amz-Signature=c66a20d294958177817135a1434d9caebc82432e2d83c676e7dfd0a3d4c71c7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXIEHIU7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQC%2FnyWdzy4r41%2BABRh0YzJ0hBv1%2FUQYlmouHTFJPqEPoQIhAM64mYvWTY8bs7Tn2UWBD9OcOQutuwaSCHGxWGbZm3ggKv8DCDkQABoMNjM3NDIzMTgzODA1IgwnjNJybq9QeSPA5O8q3APFVuFInsW5mj0DS%2BOA8Sl5pKI%2B9wcsVmewKVj8OT8kYgSU1VhEQl%2FZKzBOo9rowiPXuKsoi1xtbxZjstqmv%2F%2BJvDViXu1efTlbsgN4murZaQta9GETiRRvpYli%2BDBuC6def5eMfAVT%2FCE2EeWmCYJ5sm0xWxP00xfwSceXyqUj2t%2FknRabEAxHt9BDnwYbs6G1OjIbnysygh3LNDoUXP55%2F%2B%2B2cYidxrtBxGi1gwVw5WTSV8ng5EwRkA9ST71oETX8rRMpDBASWc%2BVA34XDt6b%2BPct0Mbqn5N8y6qoLYVFVzOziwDEJr9L%2Br1rziwUV40hfjoMOm%2FquQ%2FTsI9BljBe8sCyPMlI0sh5ySri1yfUkfg0vdQ9xu2tjUPBEF1Lkdun8Y08AlWzW%2BnxhEmpv4NlnKH1ShXIgYmxPeZ74U%2BIUl5OOrLtbqQ6XfIY6GHgLG0%2BdXQ8x6gcwdNyC1FLhWzSuSUi0wN50aP0Dbmh6Jw4NOkJfRF9J9yolBgbhjHq1ylx5oMVZtwwUD%2Ff1OllWUBrzOFVJgd2eBSLMCKaUvZcHqPs%2FbHmN27lfjPHwBHjUBxuW7rQfLUjAnDTi0Gq6Z3EDyxQKF61oc7rdvEKelbhe9gGwsZRZPPHDFiKzjDwl%2BbOBjqkAW0KZ75oxjO%2FqYfEwfhPVh7GKqMugbTCzBax7kXUYNJPhzlrJAhq4O5xqRMDcM0IOhGvqb3soa%2FVj%2Br5n9anxJPyyUIYVacTCBlrO4v2Ds3kgRODCpTTU%2BSEFN0K%2FIFCw3gB%2FKgC2SxF%2BUjBpfTF%2BZCzKMa8xnl%2FameSJdKqeyGX%2BU55gkxj5yunnOgZgc98QjEdrdwt7nwRWNX%2F4190BWdgtd6x&X-Amz-Signature=c66a20d294958177817135a1434d9caebc82432e2d83c676e7dfd0a3d4c71c7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IZAIKD%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQC3kS4CpIOShknUW%2FdiM0qcXl9646q2bvj8oZLi0UjwwAIhAIRLLpzran8av%2BFg%2FB217gWi6uSconMpEZtLvN5AvHckKv8DCDkQABoMNjM3NDIzMTgzODA1IgwHKVFYiOeNI6dWBPgq3AMm4ZFU8Q%2BdJFpONP6EnSy9BBGH4h%2Fu6KnK%2BdkU8wP2qPKt4oEV%2BR%2BIkCR%2BvZNMW7XcYp7Lc7P4CUySWOBXs94VOuHNy7au5QDQEt6KUZB6ljvzATeoywPiKofMk8jdVDhDWvcTxibqxxJ0n%2FYFZIEm44Q4hWCurgcoC9iOjuEKUioe5Eb0tlq0%2Bmvr5m0qk7KeEV4sBPXyLMcj7PF01vezdlAN%2FL4Ud1Cg4IjF4VfKcmo1NirfHnvi%2FP8Df2iBuXFmPuLAMtzOzWvYiBnJHvLDd8jkIYXca08H0S9f4t6UsoSn%2Fv68N%2FYWrWr%2Fy1t4%2FJXzLRT%2FOS%2FRq6rPcN%2BtbnONdaHR9jvJ%2BjVHWNd%2FuuEYdZn%2BlE%2BdE1IXnT7iiH2Tclb7%2FhQ4bVwit8xCmMOluOq3p3QnNTpyy57hM7DSNaPO%2FSjnzlcIo5nd76FKWOATsEfk%2BBs8AFGGVigt3tziOOt9zE4eALAmPU3yYL0nAJVNw5XBOTtRTdQ9FqxMdu7Yv9DQ1JEDu%2F6bntRUeOgHFprzxDNpji02%2B0X2zf0kpNBcP1Zgk2ChVLGtCIbnp87ekJ9ovEDQRwtZhPIMBcpHG2Uli4ETkQEBYqKRFTFZQpn5mGWbXREuEC%2F8FkrVKDC4l%2BbOBjqkAa%2BEwoxzfbwP%2FQ1ravlAyLuorxK5zsi4m73z5cGqKuENXybm8U5bmEZM6tGzW4NWWiTYaJ3eIMhq3ELlHs%2FvGR4dpXWx0KN%2FPTCBqQlWZ2l6iXyf0aEIIGLJBqybmdUWtbYhT3yHyPwBqps5xLoGt3o4aP%2B5Iz0q7J2oQA8qI6IDKLTRDYOz%2FRLdrkK6PC9J1akz7yXD42iovzpNmk8lCfcBmpKY&X-Amz-Signature=e3ed6f0531e475d719a87e75e4bfe7881a199dcd1ad593af2b1424ffc7ea871a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S43HLES7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIBQ8uymOwlUotSRrsxJJFgKkH2l4B93opWgc3CWc%2FWBtAiEA8agpMumk7clwIRmphnALXZ9fKvwopn1cbk5RqQ9nxI8q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDFeQWAFPMYtEbjLjpSrcA0Z2MGKb7aZlc3D9mo2Nl0c%2FXbCjSEbt2eiddsiGjZPz%2Fqv8Qe5Xt6cmyq2c7eoRhP7mwD1IOuKTNDPMQ46aLJhM81O7JHzd4UIIpmb8up3aHKB37FiNSCwXey%2FnDtfOcGQFNoljTqFeJ2OQTtYSWw%2BsKt1x4EN9CDtG6g2iWsVeU59RMSydgd%2FRxtz54ozuNu8NKtiNbgi3xSc1k8AIVhIw4NOJieKqqs7Y8iAWfq67DmfwM58KVUWGTpjXY7Nols8Ltc%2BsZP2JLRpLzda9Z%2BqTqciTWaviAIoQ0mfOl83fxs%2FlNQTW5lLCsauxEF5jaW6VBloi6LCX6MywXexzjXlXbIFdpLhIbmLay891rUO5ogX%2B5hFVaSs73OHeJBEBB932%2F56gFgpZG5HHULWFXOygl%2FN%2B3VMMuouL2A7cWZhNPElnd7%2FVJ4Av%2BOcQ7s684m1ocnau96cHx5WZUmpbPByZM1f41OHzRo88b5UT43XaF4kYY0TbCeWutw0WSD22pllgZqSBpZM552tF%2BvmV5ND70XTM85q6HtTdWz%2FIYqHGi74T9SueGBSPeKlYLFQqVJIb0CXJ6ykHtT%2FEIEMgLebpH1NxKP2va%2FqzCITXlfwiQ4%2FPOmf5Z1UwLKrAMIKZ5s4GOqUBl%2B3OEvy04g9VuMfnfFBxjlLIUK%2BYFskgd0V7Dlp3eoocIQRBYXb1ad%2FnWIPP%2Ba0RLn7DzSwmNeMVEqOd6Y4jgXUxWNwLFdmlxKf9kyKjHuq7UGooKRxJ6O82ZeBKAxiVJIi1Adg%2BHS3vfAYdycguDCl4EUGwFXwCpKnmVdRBW4Jlr7elh957NdxGnmwaxesOxae%2FYvvz07vjmbU%2FZRvtM%2BByOCNt&X-Amz-Signature=833767ddfb011b1d9d386af5de44fb251b9dee7c56d970b2becd5127225eb56d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S43HLES7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIBQ8uymOwlUotSRrsxJJFgKkH2l4B93opWgc3CWc%2FWBtAiEA8agpMumk7clwIRmphnALXZ9fKvwopn1cbk5RqQ9nxI8q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDFeQWAFPMYtEbjLjpSrcA0Z2MGKb7aZlc3D9mo2Nl0c%2FXbCjSEbt2eiddsiGjZPz%2Fqv8Qe5Xt6cmyq2c7eoRhP7mwD1IOuKTNDPMQ46aLJhM81O7JHzd4UIIpmb8up3aHKB37FiNSCwXey%2FnDtfOcGQFNoljTqFeJ2OQTtYSWw%2BsKt1x4EN9CDtG6g2iWsVeU59RMSydgd%2FRxtz54ozuNu8NKtiNbgi3xSc1k8AIVhIw4NOJieKqqs7Y8iAWfq67DmfwM58KVUWGTpjXY7Nols8Ltc%2BsZP2JLRpLzda9Z%2BqTqciTWaviAIoQ0mfOl83fxs%2FlNQTW5lLCsauxEF5jaW6VBloi6LCX6MywXexzjXlXbIFdpLhIbmLay891rUO5ogX%2B5hFVaSs73OHeJBEBB932%2F56gFgpZG5HHULWFXOygl%2FN%2B3VMMuouL2A7cWZhNPElnd7%2FVJ4Av%2BOcQ7s684m1ocnau96cHx5WZUmpbPByZM1f41OHzRo88b5UT43XaF4kYY0TbCeWutw0WSD22pllgZqSBpZM552tF%2BvmV5ND70XTM85q6HtTdWz%2FIYqHGi74T9SueGBSPeKlYLFQqVJIb0CXJ6ykHtT%2FEIEMgLebpH1NxKP2va%2FqzCITXlfwiQ4%2FPOmf5Z1UwLKrAMIKZ5s4GOqUBl%2B3OEvy04g9VuMfnfFBxjlLIUK%2BYFskgd0V7Dlp3eoocIQRBYXb1ad%2FnWIPP%2Ba0RLn7DzSwmNeMVEqOd6Y4jgXUxWNwLFdmlxKf9kyKjHuq7UGooKRxJ6O82ZeBKAxiVJIi1Adg%2BHS3vfAYdycguDCl4EUGwFXwCpKnmVdRBW4Jlr7elh957NdxGnmwaxesOxae%2FYvvz07vjmbU%2FZRvtM%2BByOCNt&X-Amz-Signature=67948839b55f206ddf17533fa0d1eb8957ac771c0f08e58c2a750fe43e4a25ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVXKSKLL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDCjleFqrYn%2FPq6F4Sax39lZKXLxfXrvltt8eOaaMyMBAIhAL5EymAsuVtTF02c2zb%2BtvRCWwPoXoXULzufq8gm8g2MKv8DCDkQABoMNjM3NDIzMTgzODA1Igz6WV5rU7k0%2B1aIsesq3AOCOZSiNcM4r0VG9AtdwB1CN3a8CFEvYzGvazr7nsIRPtH9T21FYScdNfEZ2p4XxBOAS3ccZYYpYCHRkpysUjZVEiTs2KLZkubsBKY76nxtyLfC%2Bb0498pkirUYAnQD%2F3FYsZCJReohzo8sKj7ygxl7bU4VdlTnhiMtlO3%2BFyVLU%2FELYu9Vi4Ftj1tVuBWLo4X2WzrzFe0Zr4aJPTJLxlnw%2BVKdK2Aua2JBZyl90RbBz3SR43CtiAMNJVNT92pElo4LGCB8%2Fe%2BQc%2BHO8Q47%2Fd%2FwYw3lD1jqGHa3ZDJlemsDVRtKhCj8awLU5wTH2LRKDR8kE2DoRF4GuTpUxfBg6hnlFBPBov%2FNfCZQ8U8tgDOhovvTrTWIddiTrUGFm%2Fr6%2BuKyJ2KfSgIZWjk99oBooYDEMnzwdIe0dkkWvkxyo5AV9viPiwIT6RZN%2BzXRqwNAQ3eN4MUuwwi%2FuQqTFWobYC0aD1eFDN2SBDH6uqzRxXogcZEMfIlVMAAmDEzGDwh8tsnOAWM7kSaAT7vs4qA1MN5OSR0R74Hn7zNY0Qdm480esHoBwMtbYopHfcDToRr%2BoRYyP8IdW9fTT%2FcCvJYWzv2DMVorcz9L3mH6GbiMVvYn2W4jUixq3kW9C8miADCBmebOBjqkAYCsPx5cC2kVhZLQKszes62UGCaULqB55K7LwWmFKoWQQJWClCJMxp%2BdseV%2BmRzhkmhVJbLD2zkEOgl2ZJ02LUo09uyG7DiDMZ747QFn2XHBoPBHNsc34TtuWmReZ2JQOvhKQoZSzYpeZUrfFkN8nbhsOhYJxmfPeyHgR8zfawfFkKaDXSQY6MO6IVt7%2FZo5HqR%2BBHru5%2FZB7mBAIa6g07TAd6n2&X-Amz-Signature=90ba0ae37c1ec0b3a415a3e84132ac8cee772ad55df040df5417cd841e73e5ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GOOX7OF%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDOmnX2L4i5rl9Eb6P6kHgx8gmiXJeuLfprkDguxgaQlwIgBxZEr8FTdD8Yw8wIlsWFU%2FY7JgC5zX8lVpLNwK%2BKqbQq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDP7KW8aOfAyRimUUdyrcA5NsDGgmZutQYtozr7PiY0duTk9NZVlEw2Cr5hmP70cs%2FlSI2%2B4iRCOtdhmSZASXvPTV8worYj9pWi21%2BqrtmvFZwWzc6m59Q%2BKTc4hhmjpC6rdiwMkGVddBPI6K3cVmKIUMH4iG%2B8O%2FdmaaSkGFhZQLFyb1ScXVfB4HAwy5EtprMklNJ7gfNSwD%2Bhp63HFoCit%2B844KeiUIbF7TTT02lvcpbwcJ2ZFfijiWhSqsCIIoNOoRPwz7%2BJLU4mOQYM6xXY7Wc7OnChxY21%2F8w5q0X2oeAJn8mZkHZk5AIKaZggpLtl3w8kV%2B0Qm44V3s4rK1Z11ryGWY551U8uCGBHFBsasAX9BQNypUDmWWTDcI5Miee2tQQ1VzsnA3cjrL%2Boz8DQWkUDlhhW8BhZ8A2b7uwYtpmxwgRA%2FADqNBOJFTiCgcnU74mnv6cLZqDGFiJ9jSM%2FNk2q89EGubw4gtytYL2F9366lkq%2BrwabwuChfXB5mQm0BxJpA7f2TnxET9mlrIB0dnpAZdXfN%2F%2BdI9qAPTq6KvOFYQ8470RxLlkl%2F2VwMHf5nKJ0IT8yIxWqfJH8siqZ%2FwAzESKdE0ZabKDdgIUx8Q40Yl9%2BboZ6uoGmXIi%2B43pFId%2FeoJojafddimMOqW5s4GOqUB0L0Pvrst7HC7ccAsbOGgW43Lxwm0osZ8pwU8stziSybbP1oFBjF%2B%2FV%2FHMd9Qc4ChXDQjfnqnza5gQOFn5x%2B5ixbwO6JwNECz5drScv%2FpfxO47zzKZ5KDVFi3u9%2F5cIain36CnHMtCPtJzdg%2FWWNHExWY2NmRQPmfX9XKz8mDzQCmZkXBou5gagXJ3KT%2FBZrS%2FwZy2qvR89YdEAGf8XTruOFS3KSE&X-Amz-Signature=f90be1f10bac44a34a2ebdbcccb22b14a06e689de8d9c64e768fa328b9827d5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R76JTD4U%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDPaNJMLtFAErtAnE08K7M0JN7%2Bpa9k06azPWreknFBYgIgCLfOZyVf%2B%2FWu7MrAf41wxMWKjoX0sVZivfWupSJhQBwq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDOB2hgsFJccEdGajjyrcA%2B0NanKmA4U4s65cl9%2FfkXSk4Sy4d8Nvkh6U%2FGr1%2F%2B6%2FljZROtV%2FIwTRp5mGqH7bgrtUvT5eOdW6KGUiLCm0iL4mv0kPEIUvwAQa55PGJ150bqra%2BNEAme9yDMDdw1%2BEo%2FHtyD%2BNpFc%2FrTEIoxAbhIlfDM2t%2BujlfzqOMKupgFhJNJkqCCmEIuhnMmtllYoLoThBUz1M7hl8sswL1x7Y7HRNt6nsi8lfM4l3vD3aZGotQskxscWM1vf6QrxUzxCwB9ighrLtBOpq5guvm6vMXQlZqofb6rLhrHWP3Key0%2BsX6ZwUxVxxlRqIZn4jsnafwwmPK0lmOuZATdioVF2CvcgjWjylFt%2BF%2BGMboBdhXjmuMH41H%2BDJywML2SzeZwUBHe8oh%2B7xmObcgrcBJRoUcYt7Ouwm9M35%2F5V%2BztvhBDaSH1s%2FMEyRyu3sJbiP8WpYba08I%2FFD3CXOAmyaqSsFwfL1YN0qEcRjcKoP59oqnEeCBInOKVTxiI%2B04DN7HAxboPSAvnEm2tMPLeUHzshmdyyAU6c7KhFQiRSYWf6kY4CRzjxDjtSBj%2Blwu59djOJvUF9GriX2L0WgZV8zFMzoCz95GetYrVMZfWVIpzBKDBcItraISe2zzWkLmB9kMIKZ5s4GOqUB%2FczcYqnOm%2FZHrc7ZAA8r4M4IbnXPWeP%2FCeKAkIXJA5e9hJaQc9tYXAAQeIsqyoi9pWFROzd%2ByqpPzL1tdm%2Fb6hvlcrsyHl7OIUglzufoHy0yqZi738OK99LmWYAFo6F4zzFobHSpk1tTodglF3wY23l0dbY1vjKa1qPF1zW6ZKnr2ZRd4ECseCLcNghTlxQEXeHaT%2Fh23UttJoQP9LX7x9QJYgBg&X-Amz-Signature=e1573a5caf29ad2ac2e21f82b66bc631ea03f7c2e1d95ba0e307af65de471757&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDDQS3YR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCys5k7xbw07%2BQSwn%2BCp2BmZvwkq56Q7OjUAzFzw51R7gIgAUCbcWBCTq7wKR6RBKKfcnxAiplDAOhjIuE9vaGJI5wq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDL2w1Z9iWkhsYVsoByrcA0T7IB%2F%2FA6xXidkkyl5jYWs5B92VsyUZFSZFXiIb5JDJpUGYzPMHDuTQLOidtE%2F%2B%2Ft7DOmVMOdLiB0uBhxiF%2F6caO0x%2F73AQGEtSVfcz7hftAhdVdNNJ6R201F20tI%2F1gN5fPqiRgaXG5fSXX0YgmFyHJotCsl0dhH0ERonP1T9fKt6K1SeUs2RCHj9SBOsULbhFbawCcapP0GK5h4yz1z0RulWRDd7N%2FaFNctxNhOEOPOncA%2FTI3g%2FgnzSHDKGgOUq7DhBQ4g%2BtHlIMZhz3jaOjPU0OES%2F%2Fgw5xgG0GYhs7USJf7w%2BbM08SXkrmqLc554Z2yZD2vd2CBM%2BlyRG%2FP5OrvjGLwXuN6FhncdLdGwAIy2vCc0Lj1w0LaSEqy5JRxLIf%2FqLzQE%2FeAKJ3xLQJBV%2Fi6v%2BskcJN%2Fv2SzV2J2cwDYPO%2BGA5DlKB2RLRp6%2B6rcjSqCfawK2%2Bez1AI2jjVS4Vi451wDiRy5VR9qfWXHuPWrRq93Svg%2BYwXjmRiqKWXhAkdgBajgFJVTSKUGAasbe8WhqxRA0Ujtwqvbdi%2BRNUfLl58yuRMX5LtfNhAi9Dz%2B3oMYu8RWoCivIn82AgVCRL7qgkuYNVbntcvfQXxBRagurAzhy1xw%2BZntx8tMKWW5s4GOqUB8wx8qcFlOH%2BhozXALs9p7MnKxamd8lBTU57xshl3EIymILS22bPcM9C2Fc4qB%2FIewQBieYFs147FzIXoVxNoYXONR1er1bTHQkAk9d3ZQbqwArSrQHDO9mNtMoY%2ByqcjCm9c9evo4eW3IAwu8aHsRkejIpNMmA49tzrd3ao7Yol2aA9P%2ByKVGnEDOS65WFUm1KvLVmm4ajWevyY6XpG2dQt7ZbZ%2F&X-Amz-Signature=d57cf72a80939a129cbf262c57956a1ed18d0a166d5466a4bb49d54debe57edd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDDQS3YR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCys5k7xbw07%2BQSwn%2BCp2BmZvwkq56Q7OjUAzFzw51R7gIgAUCbcWBCTq7wKR6RBKKfcnxAiplDAOhjIuE9vaGJI5wq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDL2w1Z9iWkhsYVsoByrcA0T7IB%2F%2FA6xXidkkyl5jYWs5B92VsyUZFSZFXiIb5JDJpUGYzPMHDuTQLOidtE%2F%2B%2Ft7DOmVMOdLiB0uBhxiF%2F6caO0x%2F73AQGEtSVfcz7hftAhdVdNNJ6R201F20tI%2F1gN5fPqiRgaXG5fSXX0YgmFyHJotCsl0dhH0ERonP1T9fKt6K1SeUs2RCHj9SBOsULbhFbawCcapP0GK5h4yz1z0RulWRDd7N%2FaFNctxNhOEOPOncA%2FTI3g%2FgnzSHDKGgOUq7DhBQ4g%2BtHlIMZhz3jaOjPU0OES%2F%2Fgw5xgG0GYhs7USJf7w%2BbM08SXkrmqLc554Z2yZD2vd2CBM%2BlyRG%2FP5OrvjGLwXuN6FhncdLdGwAIy2vCc0Lj1w0LaSEqy5JRxLIf%2FqLzQE%2FeAKJ3xLQJBV%2Fi6v%2BskcJN%2Fv2SzV2J2cwDYPO%2BGA5DlKB2RLRp6%2B6rcjSqCfawK2%2Bez1AI2jjVS4Vi451wDiRy5VR9qfWXHuPWrRq93Svg%2BYwXjmRiqKWXhAkdgBajgFJVTSKUGAasbe8WhqxRA0Ujtwqvbdi%2BRNUfLl58yuRMX5LtfNhAi9Dz%2B3oMYu8RWoCivIn82AgVCRL7qgkuYNVbntcvfQXxBRagurAzhy1xw%2BZntx8tMKWW5s4GOqUB8wx8qcFlOH%2BhozXALs9p7MnKxamd8lBTU57xshl3EIymILS22bPcM9C2Fc4qB%2FIewQBieYFs147FzIXoVxNoYXONR1er1bTHQkAk9d3ZQbqwArSrQHDO9mNtMoY%2ByqcjCm9c9evo4eW3IAwu8aHsRkejIpNMmA49tzrd3ao7Yol2aA9P%2ByKVGnEDOS65WFUm1KvLVmm4ajWevyY6XpG2dQt7ZbZ%2F&X-Amz-Signature=35c1ec45076ba9e289a9921df4d6b0b1a42c5c250216c9bf5951a862188e9be3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HTFNBKW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCuLufdLck59iDzrNoQ6%2BHqBVWkWbr5mrS4x%2FP0ldJ0sgIgaD0LpGNHjbkgHohwO%2BvFRJ0hyofowbDu6n8Y7oz1OJQq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDAZm09JJZTkPaIM6TircA6LEG0KpLNhACRpH%2B19g2tFCJVvVosFNtM7C5EAg1EELr78TfPsrE2kIklzEUTngY3%2BJeZOvsu5vDdWOWqgk8SnZBLcGhboa50jKOEQ6MbLO3T%2FlsDeYU%2BgS3NuyhzXkXQu%2FJnuaRAdS4dWTu2iRe3aJxXr9A43knJAJkOwA892Eg0IQbnmh2vXRbRG67JIVfmlcE0T%2FktzGfxw4rnb5J5O%2Fp614Zw2sPIbQWvyLzcX0NCy%2BViqmCEAUlHL5b%2FvwaMvHRrfvgVJdeTBHl03qJ0AubOFTgcpk4NyGL2bxfBr9pYjn9ddU17ASY2Qgxp3n0%2FCw0tOzMXXNTYNfNu6Uw9HtF0VUeLALSiwdmJiftcN%2F3KmEJJHtQpSwg6AumL31WLpdL8AOcDNzfvbRMxnCbOczXXTiWA4iWolO0OOaGX18%2Bm2dQRh1NPYH3uWv2GOHfnbb18yFf3rtyFMtiEFRNV0a0X%2FF4j4qHOB2nU9mUTaXheERK%2BboRp9emxx1jzrSdE%2FI5sIOwUec2d%2FlrmQ52krEUFJBLnObsJrWWXAkcGAP68t0LPzyoWW9zKRrOCTQbXKBslutK8JXvqtOHII9FXQ6HG5%2Bg%2BwRaNCwcoFC32CrpkGZFv%2B3n5SHY3X0MImW5s4GOqUB5cpMJQF1XW408g9lFQMxtRAFAZZbe3kbu5kmKV6Vih3WLqhraylDgMWRnAFyy3tlj%2BLiFhedfEQm%2FbJmFndo%2BlWsz77x6%2B9D0fGJWiGdPJ0gbiltz9w5Nq5AeA2VqRPzt%2BDfd9pLx%2Bn5kB96xnfo5IC9LO0BqSUSlAR26uvsQKMDa5fBwjtxfazvCHznxtkcKj2aHiGJON42rk8EvQgEXTqKE5Hz&X-Amz-Signature=43e7ac73713acc77cdc8b9c4c2855b89223c3ad16c4a5198ea311b9ed97c0104&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZ4XRSQ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIHG4ONPM%2BjVHp3d9A5AJ4YI%2F0QO1Gu0zIqD7232RmuAuAiBwocu7E%2F7HsMhkLcprEslYhWiVN9h2pTXvAxs5RLzvGCr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMhM15%2B%2FanOSIyRdRNKtwDn7X7Gyd6H%2FOXwUwpxEA0tAimevXyv7YDIW6vDieSCv6WnJ0J%2BQ7dumC9pgUlldmgH%2Bx%2F23l91iDJDc979l9BI%2F4eSKgc5Je97Y53KkXhNn6DkHQTPeXtojvrpOlr%2BS0e4PzOET%2FPi9EYQt9NrZO2U8o6XPqrVvAgJuFOY27speFop7nBKnKnixPWixu37hNyax2jVPdnL2tWq1wLnHtCjaVUs2SuhimQWiSiO77A5VXEpX35%2BTx8okD9I2deVKM1dmwTQvmA0FYQUwEV8Ztb9AhHICEBKwtSKFdcTF9SOrrFtbJUHdM6897lKl2q1OtnR6kDGnacdgXFZm5CTfXhqW64I7jl1Xx%2FhHhNsUkwpeY%2B6gKDr9hd%2FehX2F%2BJP0%2BOpIxF5%2F2cp531hpx92cE1GazMKJSkuyOfYh49Fr1dSGpHDbTu2%2FipyCb939jH1OosnNI726QfGWLoq5sCzGj6XT1QubvvA2lrJICYE1si8C%2FAjmoTxnLKoiCcUWv7WV72COkK18KUgDoVzGY0Prt%2BXrTo532Dh9SpBxKMWx9uYFtDObRbGwl3xQjS%2FVMK6TOwjbFerg0usYFZieNI61XgOJPyREyU9A2QymxVjcFHc2peT2XSXHpe7JPLRA4w5pjmzgY6pgGT8m0BhZoTIffgcLY1u7IS5%2BcRljNWrj4OYfm7D3scyvwuB3zd%2FvNoTYnl0uasMQTI3OYqbeNV7E3x1qZB70wkbTfjWoMvNqqZWlFomJsCJyoOfVZ9m8vW0zZQ1ywBf0y4Qpy5yo8hys9FRPgM3F96cQJcpa4ge%2BqNROeizL0OnXw2mACigp0%2FCwiytYBUzAlsGVQb3NoicwOwVUPKQZ7n6qz8uZ6O&X-Amz-Signature=b41e491d2dcaa7a754f247e6e1f817ce63defdf4ab14e02963a25fd4f5b2f4b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZ4XRSQ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIHG4ONPM%2BjVHp3d9A5AJ4YI%2F0QO1Gu0zIqD7232RmuAuAiBwocu7E%2F7HsMhkLcprEslYhWiVN9h2pTXvAxs5RLzvGCr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMhM15%2B%2FanOSIyRdRNKtwDn7X7Gyd6H%2FOXwUwpxEA0tAimevXyv7YDIW6vDieSCv6WnJ0J%2BQ7dumC9pgUlldmgH%2Bx%2F23l91iDJDc979l9BI%2F4eSKgc5Je97Y53KkXhNn6DkHQTPeXtojvrpOlr%2BS0e4PzOET%2FPi9EYQt9NrZO2U8o6XPqrVvAgJuFOY27speFop7nBKnKnixPWixu37hNyax2jVPdnL2tWq1wLnHtCjaVUs2SuhimQWiSiO77A5VXEpX35%2BTx8okD9I2deVKM1dmwTQvmA0FYQUwEV8Ztb9AhHICEBKwtSKFdcTF9SOrrFtbJUHdM6897lKl2q1OtnR6kDGnacdgXFZm5CTfXhqW64I7jl1Xx%2FhHhNsUkwpeY%2B6gKDr9hd%2FehX2F%2BJP0%2BOpIxF5%2F2cp531hpx92cE1GazMKJSkuyOfYh49Fr1dSGpHDbTu2%2FipyCb939jH1OosnNI726QfGWLoq5sCzGj6XT1QubvvA2lrJICYE1si8C%2FAjmoTxnLKoiCcUWv7WV72COkK18KUgDoVzGY0Prt%2BXrTo532Dh9SpBxKMWx9uYFtDObRbGwl3xQjS%2FVMK6TOwjbFerg0usYFZieNI61XgOJPyREyU9A2QymxVjcFHc2peT2XSXHpe7JPLRA4w5pjmzgY6pgGT8m0BhZoTIffgcLY1u7IS5%2BcRljNWrj4OYfm7D3scyvwuB3zd%2FvNoTYnl0uasMQTI3OYqbeNV7E3x1qZB70wkbTfjWoMvNqqZWlFomJsCJyoOfVZ9m8vW0zZQ1ywBf0y4Qpy5yo8hys9FRPgM3F96cQJcpa4ge%2BqNROeizL0OnXw2mACigp0%2FCwiytYBUzAlsGVQb3NoicwOwVUPKQZ7n6qz8uZ6O&X-Amz-Signature=b41e491d2dcaa7a754f247e6e1f817ce63defdf4ab14e02963a25fd4f5b2f4b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VAKSVE2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T010313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDN1RlClrOeTyGE6WPZjxrDm0ZMawlE5q7Dx3Yiol6jDwIgFfACOyYYS%2BX3opWVvCE%2F213YAFWuLVJGKe8LKOpGC9Eq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDLvvI%2FpsuM%2BxY9PY4CrcA40yT1TzqNwGAz%2BZnhffxlaPtgVJsGEJCvVC8%2FPeziyLnDfjp81kGxIzAILeZexI%2BPRQATwp324Vy%2FOmrq2fIUs0E1Q1PMkbs3CpMvzwBuNA1%2FLFTdQ0An1Kh2rvenMKT7OTP0tuhm6i0wpOtvpiXxWEQCjM6ELJY3MzwUnXUkNCFdDKTuqZmKfHvNbGWsozHRQ7v0yTBvsZPwxURvMP%2FMiCdgOJGuaivy91jLPKxi9a49GZtkmHv9%2B0DfNpOXbizSVEO0AxKGkplAg4AHEwB2wi6MrMFmbCU88S7rpguHRp9PRjJEqCwiw57263SQPD86XVEsNoe8Fhuq8zRENAmxwR7f8%2F6tMW4UINDmPzRZBfxsrIiEIjk301%2FExV4DJig%2FyLTiR9sepCPY763omGzDxgjzEZdUeMajK2%2FqXyiGE3NbZjDJzaURdrfh9GcrA0BPPywnqYAEbbLrQIKPcGnNrmiU8LihCmwe9blQ37Hit80ac6hAeNfPXvC7ER70fhkA5aDj0MDJtjPz2NuWUqIxPXdAVw5LMC5peBCQxgBVAC%2FTRrCfXEwQx88uydW9kzDyrnZR0WYDryG2ATtxpwxaHwyXiLC9LcCkHCLCG2GOSxjHOQjYn5oXpL5xxdMMKX5s4GOqUBu6T%2F85BWQjs9vK4s1IGLQQN5ym5w1KaYIWUtZu8l%2FQQx1pYpRuKsZkL8ul3riD9p7R4H70kd1shK2UE8mPV%2BZf%2BOBxiaUj8gHEakSkKurAK04eUXnFqC6S4vaZHOABTTKlBQdfNl4IANoQdWlos6%2B9Dyj04D%2FPF2ilwkkWRDC8vrud4mGktxRHwpH%2BH%2BJcJQHZcLX20b3LwFSMd9TRe1ni3VG3oQ&X-Amz-Signature=7559fe2b633eb514f4f00bb9b229c84c09cb695bd84e94f64f3ea5ca126619ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

