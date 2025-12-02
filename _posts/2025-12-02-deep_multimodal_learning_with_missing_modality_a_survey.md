---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJJVBA3A%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCnTTiddw2jDs8MrWWrkav25yu41sPc5KEUphH%2BwORh7AIhAP%2Fr5halT7KWkpqyiYkdwWhyxfp2vh7Pp8aRzKZavIuoKv8DCBUQABoMNjM3NDIzMTgzODA1IgxO5WU1os0h175785Uq3APyl1D7B%2BN%2BXKYvIQy70XSnzzD%2BRR%2FJl1Q8JaljhfsPgUwhO2y%2BUXI6fdZlrwUd8uP%2FawmhqbfP4Ymmzs%2B9pEFGcByDJysI8PZ%2FvbFFAhbBGS61XfamQghspleVWvd%2BYws6ZYzmy0cN19PbLfNZyxoh6QwVGO1YEy8vf5gTvd7wnppbML6ZsdpPOy%2FxemDymcnfYD4Igz1nXiN3Wco8wAD11YuJLm4T3Lk6k%2FiMshiHfuRf7JNySqZAO0Vosm3jfnXyO1EDk%2Fu0yMEpRaspCbiZJnIfqsjolO%2FgUjRgH6cbh9eotINAzhuc%2BtkrRd%2B1mwAlIxBStBSj4voGAlS%2FZNBdcBQoZzBvqFL%2Bjayvo0A5JGh57%2FfIokYlBJXrMIjsjWS5ewIYCQUQOTwPj9wGFTgj5elSasuSpz%2B11O0SmsBBmxuRA7AgYpsJXUTMgLlwB1Ute94Eb1I3GvH77QLwhHEJFnx6gxzqprg19tvPcJpB9UGIXALr%2FpMB0ZZp7huxJHuRiPrJslt%2BHjcJ6CdX4nbujtLL9OawYD73VqsEDzJGuDw12WpNcFtaFm%2BrY78c48zE70crkDuVHbpc8ulerSsBO%2FuuqKMmSXdgFptYeEjyznZLIYkWIM1a%2F%2B1lkzCSrrvJBjqkAZClDD9eSIxGYKeLixxZ%2FzrwPFcKmUAmpN23QHPnyDj9lgY6CLYrK7tUybVeqgrNK%2FeawBVsIrIG%2FO6%2FPKRLo1s05SOaz7pAaIhWctF1xXsZuOWiKCPAlGtjR5lL2xaa0jLVBkJ6rRRwQK8CWk5CE9MaIkOzTy5Ka7csuQx%2BKQy1%2BFniqt3Hz2MlsAKIFD%2ByIgJwaT21EhOYm7dW1xv40ssgeu9d&X-Amz-Signature=4af393465030ade49a0345d8742c1f5f842430d3c2d7161b7e25a946ee3dbc01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJJVBA3A%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCnTTiddw2jDs8MrWWrkav25yu41sPc5KEUphH%2BwORh7AIhAP%2Fr5halT7KWkpqyiYkdwWhyxfp2vh7Pp8aRzKZavIuoKv8DCBUQABoMNjM3NDIzMTgzODA1IgxO5WU1os0h175785Uq3APyl1D7B%2BN%2BXKYvIQy70XSnzzD%2BRR%2FJl1Q8JaljhfsPgUwhO2y%2BUXI6fdZlrwUd8uP%2FawmhqbfP4Ymmzs%2B9pEFGcByDJysI8PZ%2FvbFFAhbBGS61XfamQghspleVWvd%2BYws6ZYzmy0cN19PbLfNZyxoh6QwVGO1YEy8vf5gTvd7wnppbML6ZsdpPOy%2FxemDymcnfYD4Igz1nXiN3Wco8wAD11YuJLm4T3Lk6k%2FiMshiHfuRf7JNySqZAO0Vosm3jfnXyO1EDk%2Fu0yMEpRaspCbiZJnIfqsjolO%2FgUjRgH6cbh9eotINAzhuc%2BtkrRd%2B1mwAlIxBStBSj4voGAlS%2FZNBdcBQoZzBvqFL%2Bjayvo0A5JGh57%2FfIokYlBJXrMIjsjWS5ewIYCQUQOTwPj9wGFTgj5elSasuSpz%2B11O0SmsBBmxuRA7AgYpsJXUTMgLlwB1Ute94Eb1I3GvH77QLwhHEJFnx6gxzqprg19tvPcJpB9UGIXALr%2FpMB0ZZp7huxJHuRiPrJslt%2BHjcJ6CdX4nbujtLL9OawYD73VqsEDzJGuDw12WpNcFtaFm%2BrY78c48zE70crkDuVHbpc8ulerSsBO%2FuuqKMmSXdgFptYeEjyznZLIYkWIM1a%2F%2B1lkzCSrrvJBjqkAZClDD9eSIxGYKeLixxZ%2FzrwPFcKmUAmpN23QHPnyDj9lgY6CLYrK7tUybVeqgrNK%2FeawBVsIrIG%2FO6%2FPKRLo1s05SOaz7pAaIhWctF1xXsZuOWiKCPAlGtjR5lL2xaa0jLVBkJ6rRRwQK8CWk5CE9MaIkOzTy5Ka7csuQx%2BKQy1%2BFniqt3Hz2MlsAKIFD%2ByIgJwaT21EhOYm7dW1xv40ssgeu9d&X-Amz-Signature=4af393465030ade49a0345d8742c1f5f842430d3c2d7161b7e25a946ee3dbc01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRJEITCD%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCe%2Bv1luqlOLacfjUUX4%2Bb1aY9CavRoFjqJN5EZP%2BIFKgIhANDDlcv2D2OZw%2FyMeRqbbli1KibgjDZXPuigHyQh7V2YKv8DCBUQABoMNjM3NDIzMTgzODA1Igytpdy6jge0mTduTBoq3AMDS46%2Bu7imfVGGnLUwo1qOLRA%2Bdml2QBBUX%2FuYnEQN85jli1JP3JROTJWhYLMjmfBUD%2FW%2Buhzrk3fYzEKcC8mNBaSsDApecWkvgJ6VJgV3klVRBUFrrwlJaVSSmDTIBN7vQf1nqM6D1y%2BICkcaaXFtoKyiF0eP%2BdvuNZbdE%2FU3ewf39nAGhI4ThGdfFDA7%2Fpb2tHwZi3qIwM8p1Ayxw%2BE7GI93IpRW1TmjlPoisqEA3YkTX5odoWmtZ0Ry59tujTaEBhfUUTJA6kEOouiGuTr2t64orbGD0zyz7KnXoyBVCax4VZrVF%2Biu8MMJ7RgC%2BroOhxcVFBZBTvWRAqiCAIpuZePbcg0%2FZ%2BXrbOUu266iGl7AJq7qnANSI6QVNBwaE9Ae%2FNyXuU%2BDT3G28GuLVuD1PXxYXvfw8r9gotYmURd2cPb9aYLLbfbLlH36GzarIz7g5sO9hXpC0GzWVQH7mC%2B4uZR6KinekyQQmyhE15PinrROTLx0COjPXvMwEIuGrwBAqqWEFniJqaQnV%2B1KYBUovEbMaI90rv8WZ4FnENHZm8b%2B1ePqHtwbgRsCD1Zsh1g5w7Wt5JvLLeGQiTrODv0pMxzqnTJviIo1Ll6idQqWNClBobkCIqZES5bRGzDMrbvJBjqkARdzwm0X3HHSoka5yBCAyLwTBOyjrUOf2dfjniR2Jr9Uekfn%2FuXFYBUC9qNzCNVq2Ng%2BXZcfP5PBHP9y6RHzll9%2B7SbIjwxa5ZHujazPHTJ00XMfuPCCxQBw5EjoJzHhTyoPcO13EviplY28dVgU4dEF5XhLqAQ0w9E0izAXQ0FC%2BOqN%2Bfb%2FsXIE0H8fLxDJsabih7quoaID517E8%2B4fM4tBrBbH&X-Amz-Signature=48f36961f844567a4094edaea69c62279364f4138096e820c02c0c5376dc415b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRJEITCD%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCe%2Bv1luqlOLacfjUUX4%2Bb1aY9CavRoFjqJN5EZP%2BIFKgIhANDDlcv2D2OZw%2FyMeRqbbli1KibgjDZXPuigHyQh7V2YKv8DCBUQABoMNjM3NDIzMTgzODA1Igytpdy6jge0mTduTBoq3AMDS46%2Bu7imfVGGnLUwo1qOLRA%2Bdml2QBBUX%2FuYnEQN85jli1JP3JROTJWhYLMjmfBUD%2FW%2Buhzrk3fYzEKcC8mNBaSsDApecWkvgJ6VJgV3klVRBUFrrwlJaVSSmDTIBN7vQf1nqM6D1y%2BICkcaaXFtoKyiF0eP%2BdvuNZbdE%2FU3ewf39nAGhI4ThGdfFDA7%2Fpb2tHwZi3qIwM8p1Ayxw%2BE7GI93IpRW1TmjlPoisqEA3YkTX5odoWmtZ0Ry59tujTaEBhfUUTJA6kEOouiGuTr2t64orbGD0zyz7KnXoyBVCax4VZrVF%2Biu8MMJ7RgC%2BroOhxcVFBZBTvWRAqiCAIpuZePbcg0%2FZ%2BXrbOUu266iGl7AJq7qnANSI6QVNBwaE9Ae%2FNyXuU%2BDT3G28GuLVuD1PXxYXvfw8r9gotYmURd2cPb9aYLLbfbLlH36GzarIz7g5sO9hXpC0GzWVQH7mC%2B4uZR6KinekyQQmyhE15PinrROTLx0COjPXvMwEIuGrwBAqqWEFniJqaQnV%2B1KYBUovEbMaI90rv8WZ4FnENHZm8b%2B1ePqHtwbgRsCD1Zsh1g5w7Wt5JvLLeGQiTrODv0pMxzqnTJviIo1Ll6idQqWNClBobkCIqZES5bRGzDMrbvJBjqkARdzwm0X3HHSoka5yBCAyLwTBOyjrUOf2dfjniR2Jr9Uekfn%2FuXFYBUC9qNzCNVq2Ng%2BXZcfP5PBHP9y6RHzll9%2B7SbIjwxa5ZHujazPHTJ00XMfuPCCxQBw5EjoJzHhTyoPcO13EviplY28dVgU4dEF5XhLqAQ0w9E0izAXQ0FC%2BOqN%2Bfb%2FsXIE0H8fLxDJsabih7quoaID517E8%2B4fM4tBrBbH&X-Amz-Signature=48f36961f844567a4094edaea69c62279364f4138096e820c02c0c5376dc415b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAMYCTGW%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQD03ZEoyzOjcCLXXJwh4I7WuFtcdA9Obehk%2FKn8Lel5cwIhAPbcdVoaAuCzWGXC%2B1gO8kgRtD9P3erI8j5QEPZEdVKPKv8DCBUQABoMNjM3NDIzMTgzODA1IgxgrCNz%2FSxsxOPRZfoq3APrYEB9XXuC3aM9CuA53KZ5WYRGhKT%2BVEPWXq2s67sydSH97r%2BVEi3eete0QkhNyU81Ff2gW2TKyb%2F753Fhb2DJOgeejdV%2Bad85gYJ2ypxh6d%2Bg2kdgb9MQ9lW63TFwWxgZvPnz27oQtMEHh3doSHC110l0eyvy3cHlMju15JTan6kGq7DVKWmVf3tR5Ora5R%2BfiAaEDhFs2m2ouVDJ0QaFyvSkSMpIHA%2FEIa3X9eism5Vi%2BcSmilB%2Bt6zDKfq8P2%2BfOKEOGNHI6dzb%2Fvsf%2FigySLLZJy5n4uZIeE2I00g8Vp9cCX7ue5QJYsLPh5xL84vgRhoSst9bS69379eVaJOYOV2Hp058nOyGKYhYShnW%2FzPToOsbjkIfMA%2BrcpJrEjdpJTFWIlNdYNxpkfi0c4XLVn604PkRJ853KjP%2FqjatOjju6%2FAAgeAFWO0XF1U%2Fi%2FvlI6y0WFACS8PE6ayPdRi%2FgHyAsZ41S%2BVcPx%2FXRJT7Ynb%2BHvwSw4jDcD2qToEP9BZYHsWbicCcU%2FAEvjL1iSS4Uyl9rlrHeXjkni3o%2FNSWrS5C7R7HEKSm%2BD6qfkweBaSTYf%2Fm%2BhyXeno4XCCKV8HvFoNM3FBUuv1Ns%2FLW2Jy6Lr5MrC1diBY6aE7glzC1rbvJBjqkAapqovxvoUEUXgv7iHquchrGcCKq3rLsSoLbPUJolTvCX3I6p3RYrlMR%2FKDme%2FzGymNzzb98z11RghLkzJ%2BozQECZmYZJ18G3FV32AsemL%2B2VLaSBaCU5HecVksUC0Ifru6OW%2BhzRquEbHgdwLA1Us06R5L4W682YpQlB9f5S%2FAcTRF5%2BruV224kKXEvsArQ0VI4ZKVntMggkYJSHeOA1SGXjRlr&X-Amz-Signature=18b7a28b994aeeb4e4a6aa4a6e4811eea0541cd507a0d90526c63d6d6ed0a602&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XABCNDTQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDNbwcguPWlx%2BvTpnjktDVqYkYQ%2BbiaHVbcAL29B%2BG3PQIgb%2BNQonPUprxze1SGW2yEfwaOm9kEmlvUFCoG4Qi9vmUq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDPmDxR20HS18CFw5iyrcA6rgpfVp8ZDPxOv2Hmkf7VkikAzCFLe6DGO9oNAcPRUPq9pxBklTAU7%2FzBDCCtFR71I%2FLPzk9BDgVpQ%2FBCUM0nwwoIOreRSSEpgXPMVJdr4Sw5M8wqcBzK%2BfSeiW8cHBOpSn8mBya5RfRMNXzPKS3dBydgP2d31erh0meSkMPiXW1hXiFpwHM7ly89zqer6N%2BhzOGHONRD5DvoYUeLmSZRk8O9Yy%2BHk4%2BfptolOyu7JwjbM21pd56NotqTpDu%2FhfNINfrdqOc0Vo200hbijf8m%2BYRGn9nqc%2F02YzTthADjXw6LBvR%2FZYDMjlTYnQY%2FJnwBIxPLxxR8Tbl5PsAe%2BSYYhXap3VQLITaM6wWBNxlWF8imXVKxLC3yLVicZFX6DhKrBP9QfzpzRUyX38Q%2F5vguJRiU1nifA3%2Fp7uDG8Rk%2BQYI7H8DwRjysha8Hm6iVGG5zAPb%2FBJCrrLzWSZQFdJZAXY%2FzwWebi85k4sL0%2FMj5x1LNhZw%2BfhfA5hvbbn8y29Rk67K6yJaaWmRQXoijLkY0FCDYVOmsaAUb%2FCPKHVkRCGx34tS0kTuW1z3DrE9hQecot3g7mYWheKaWDBjO%2BQSnZza1N%2BvmEtlrHIMqGvQE9FtLem3X1HsUiJZdl9MJmtu8kGOqUBU%2B6gOzBLAl5GmLdC8blqNkYbo%2BgLVO30g6iqZr%2BmUXjDVOkpE07val4%2BFL24pyPwP%2Fia720JxwVrqxsGF6eeoZ0rGp96DSYRfa%2FgLirRAXGDhm2UXQV5eMKZJ60rjiTB7T7xZluTw2EpyDbDnfAnaUOyikhLxIzH%2FN%2FOjTXy1tcq7KhuG%2FQBWxFsiJVVWYIXqBxdURUn1nkE%2FdfQ6z61WVbmP3Og&X-Amz-Signature=f42bafb0492431b093eef19fa48148dc402b2e92f4c8bc31d2528758f2199b3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XABCNDTQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T121750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDNbwcguPWlx%2BvTpnjktDVqYkYQ%2BbiaHVbcAL29B%2BG3PQIgb%2BNQonPUprxze1SGW2yEfwaOm9kEmlvUFCoG4Qi9vmUq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDPmDxR20HS18CFw5iyrcA6rgpfVp8ZDPxOv2Hmkf7VkikAzCFLe6DGO9oNAcPRUPq9pxBklTAU7%2FzBDCCtFR71I%2FLPzk9BDgVpQ%2FBCUM0nwwoIOreRSSEpgXPMVJdr4Sw5M8wqcBzK%2BfSeiW8cHBOpSn8mBya5RfRMNXzPKS3dBydgP2d31erh0meSkMPiXW1hXiFpwHM7ly89zqer6N%2BhzOGHONRD5DvoYUeLmSZRk8O9Yy%2BHk4%2BfptolOyu7JwjbM21pd56NotqTpDu%2FhfNINfrdqOc0Vo200hbijf8m%2BYRGn9nqc%2F02YzTthADjXw6LBvR%2FZYDMjlTYnQY%2FJnwBIxPLxxR8Tbl5PsAe%2BSYYhXap3VQLITaM6wWBNxlWF8imXVKxLC3yLVicZFX6DhKrBP9QfzpzRUyX38Q%2F5vguJRiU1nifA3%2Fp7uDG8Rk%2BQYI7H8DwRjysha8Hm6iVGG5zAPb%2FBJCrrLzWSZQFdJZAXY%2FzwWebi85k4sL0%2FMj5x1LNhZw%2BfhfA5hvbbn8y29Rk67K6yJaaWmRQXoijLkY0FCDYVOmsaAUb%2FCPKHVkRCGx34tS0kTuW1z3DrE9hQecot3g7mYWheKaWDBjO%2BQSnZza1N%2BvmEtlrHIMqGvQE9FtLem3X1HsUiJZdl9MJmtu8kGOqUBU%2B6gOzBLAl5GmLdC8blqNkYbo%2BgLVO30g6iqZr%2BmUXjDVOkpE07val4%2BFL24pyPwP%2Fia720JxwVrqxsGF6eeoZ0rGp96DSYRfa%2FgLirRAXGDhm2UXQV5eMKZJ60rjiTB7T7xZluTw2EpyDbDnfAnaUOyikhLxIzH%2FN%2FOjTXy1tcq7KhuG%2FQBWxFsiJVVWYIXqBxdURUn1nkE%2FdfQ6z61WVbmP3Og&X-Amz-Signature=f42bafb0492431b093eef19fa48148dc402b2e92f4c8bc31d2528758f2199b3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

